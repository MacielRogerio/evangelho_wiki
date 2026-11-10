import {randomUUID} from 'node:crypto';
import {mkdir, writeFile, readFile, unlink} from 'node:fs/promises';
import path from 'node:path';
import {hash,secret,openStore} from './store.mjs';
import {mailDelivery} from './mail.mjs';
export function membershipConfig(env=process.env) {
  const production=env.NODE_ENV==='production';
  const port=Number(env.PORT)||5173;
  const origin=new URL(env.APP_ORIGIN||`http://localhost:${port}`).origin;
  const adminEmail=(env.ADMIN_EMAIL||'').trim().toLowerCase();
  const mailMode=env.MAIL_MODE||'local';
  if(!['local','resend'].includes(mailMode)) throw new Error('MAIL_MODE deve ser local ou resend.');
  if(production && (!adminEmail || !origin.startsWith('https://') || mailMode!=='resend')) throw new Error('Produção requer ADMIN_EMAIL, APP_ORIGIN HTTPS e MAIL_MODE=resend.');
  if(mailMode==='resend' && (!env.RESEND_API_KEY||!env.MAIL_FROM)) throw new Error('Configure RESEND_API_KEY e MAIL_FROM.');
  if(adminEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail)) throw new Error('ADMIN_EMAIL inválido.');
  return {production,port,origin,adminEmail,mailMode,mailKey:env.RESEND_API_KEY,mailFrom:env.MAIL_FROM,directory:path.resolve(env.DATA_DIR||'.private')};
}
const publicMember=(member,config)=>member?{id:member.id,email:member.email,interests:member.interests,status:member.status,verified:Boolean(member.verified_at),admin:member.email===config.adminEmail}:null;
export function createMembership(config) {
  const store=openStore(config.directory), db=store.db;
  if(config.adminEmail) {
    db.prepare("INSERT INTO members VALUES (?,?,?,'approved',NULL,?,?) ON CONFLICT(email) DO UPDATE SET status='approved',updated_at=excluded.updated_at").run(randomUUID(),config.adminEmail,'',Date.now(),Date.now());
  }
  const flushMail=mailDelivery(store,config);
  const timer=setInterval(()=>void flushMail(),30_000);timer.unref();
  void flushMail();
  const fail=(status,message)=>Object.assign(new Error(message),{status});
  const send=(res,status,data)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(data));};
  async function body(req,limit=16_384) {
    let size=0; const chunks=[];
    for await (const chunk of req) {size+=chunk.length;if(size>limit) throw fail(413,'Arquivo ou formulário maior que o permitido.');chunks.push(chunk);}
    return Buffer.concat(chunks);
  }
  async function json(req) {
    if(!req.headers['content-type']?.startsWith('application/json')) throw fail(415,'Envie o formulário em JSON.');
    try {const value=JSON.parse((await body(req)).toString());if(!value||typeof value!=='object'||Array.isArray(value)) throw Error();return value;}
    catch(e){if(e.status)throw e;throw fail(400,'Formulário inválido.');}
  }
  function user(req) {
    const cookie=(req.headers.cookie||'').split(';').map(p=>p.trim()).find(p=>p.startsWith('ew_session='))?.slice(11);
    if(!cookie) return null;
    return db.prepare('SELECT m.* FROM sessions s JOIN members m ON m.id=s.member_id WHERE s.hash=? AND s.expires_at>?').get(hash(cookie),Date.now())||null;
  }
  function admin(req) {const member=user(req);if(!member?.verified_at||member.email!==config.adminEmail)throw fail(403,'Acesso reservado à administração.');return member;}
  function approved(req) {const member=user(req);if(!member?.verified_at)throw fail(401,'Entre para acessar os materiais.');if(member.status!=='approved'&&member.email!==config.adminEmail)throw fail(403,'Seu cadastro ainda não possui acesso aos materiais.');return member;}
  function cookie(res,token,maxAge) {res.setHeader('Set-Cookie',`ew_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${config.production?'; Secure':''}`);}
  function queueAccess(member) {
    const link=store.token(member.id,config.origin);
    store.mail(member.email,member.verified_at?'Seu link de acesso — Evangelho.wiki':'Confirme seu e-mail — Evangelho.wiki',member.verified_at?'Use o link abaixo para entrar na sua área.':'Confirme seu e-mail para enviar sua solicitação à aprovação. Depois de abrir o link, pressione Confirmar e continuar.',link);
  }
  const generic={message:'Se o endereço estiver apto, você receberá um e-mail com as próximas instruções. Confira também a caixa de spam.'};
  async function handle(req,res,url) {
    if(!url.pathname.startsWith('/api/')) return false;
    try {
      res.setHeader('Cache-Control','no-store');
      if(req.method!=='GET' && req.headers.origin!==config.origin) throw fail(403,'Origem da solicitação inválida.');
      const route=url.pathname;
      if(req.method==='POST'&&route==='/api/newsletter/subscribe') {
        const data=await json(req);
        const email=typeof data.email==='string'?data.email.trim().toLowerCase():'';
        if(email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw fail(400,'Informe um e-mail válido.');
        if(store.limited('newsletter:'+req.socket.remoteAddress,30))throw fail(429,'Muitas solicitações. Tente novamente mais tarde.');
        db.prepare('INSERT INTO newsletter_subscribers (email,created_at) VALUES (?,?) ON CONFLICT(email) DO NOTHING').run(email,Date.now());
        send(res,200,{message:'E-mail cadastrado para receber novidades.'});return true;
      }
      if(req.method==='GET'&&route==='/api/me') {send(res,200,{member:publicMember(user(req),config)});return true;}
      if(req.method==='POST'&&['/api/auth/register','/api/auth/login'].includes(route)) {
        const data=await json(req);
        const email=typeof data.email==='string'?data.email.trim().toLowerCase():'';
        if(email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw fail(400,'Informe um e-mail válido.');
        const interests=typeof data.interests==='string'?data.interests.trim():'';
        if(interests.length>2000)throw fail(400,'Escreva até 2.000 caracteres sobre suas curiosidades.');
        const ip=req.socket.remoteAddress||'local';
        if(store.limited('auth-ip:'+ip,30)||store.limited('auth-email:'+email,5))throw fail(429,'Muitas solicitações. Aguarde uma hora e tente novamente.');
        store.transaction(()=>{
          let member=db.prepare('SELECT * FROM members WHERE email=?').get(email);
          if(!member&&route.endsWith('/register')) {
            const now=Date.now();
            db.prepare("INSERT INTO members VALUES (?,?,?,'unverified',NULL,?,?)").run(randomUUID(),email,interests,now,now);
            member=db.prepare('SELECT * FROM members WHERE email=?').get(email);
          }
          if(member) queueAccess(member);
        });
        send(res,202,generic);void flushMail();return true;
      }
      if(req.method==='POST'&&route==='/api/auth/confirm') {
        const {token}=await json(req);
        if(typeof token!=='string'||!/^[A-Za-z0-9_-]{43}$/.test(token))throw fail(400,'Link inválido ou expirado. Solicite um novo link em Entrar.');
        if(store.limited('confirm:'+req.socket.remoteAddress,60))throw fail(429,'Muitas tentativas. Tente novamente mais tarde.');
        const session=secret();
        const member=store.transaction(()=>{
          const found=db.prepare('SELECT m.* FROM tokens t JOIN members m ON m.id=t.member_id WHERE t.hash=? AND t.expires_at>?').get(hash(token),Date.now());
          if(!found)throw fail(400,'Este link expirou ou já foi usado. Solicite um novo link em Entrar.');
          db.prepare('DELETE FROM tokens WHERE member_id=?').run(found.id);
          const first=!found.verified_at;
          if(first) {
            db.prepare('UPDATE members SET verified_at=?,status=?,updated_at=? WHERE id=?').run(Date.now(),found.email===config.adminEmail?'approved':'pending',Date.now(),found.id);
            if(found.email!==config.adminEmail&&config.adminEmail)store.mail(config.adminEmail,'Novo cadastro aguardando aprovação — Evangelho.wiki',`Há uma solicitação de ${found.email} aguardando sua análise. Acesse ${config.origin}/administracao para consultar as curiosidades e decidir.`);
          }
          const old=(req.headers.cookie||'').match(/(?:^|;\s*)ew_session=([^;]+)/)?.[1];
          if(old)db.prepare('DELETE FROM sessions WHERE hash=?').run(hash(old));
          db.prepare('DELETE FROM sessions WHERE expires_at<?').run(Date.now());
          db.prepare('INSERT INTO sessions VALUES (?,?,?)').run(hash(session),found.id,Date.now()+7*86400_000);
          return db.prepare('SELECT * FROM members WHERE id=?').get(found.id);
        });
        cookie(res,session,7*86400);send(res,200,{member:publicMember(member,config)});void flushMail();return true;
      }
      if(req.method==='POST'&&route==='/api/auth/logout') {
        const raw=(req.headers.cookie||'').match(/(?:^|;\s*)ew_session=([^;]+)/)?.[1];
        if(raw)db.prepare('DELETE FROM sessions WHERE hash=?').run(hash(raw));cookie(res,'',0);send(res,200,{ok:true});return true;
      }
      if(req.method==='GET'&&route==='/api/materials') {
        approved(req);send(res,200,{materials:db.prepare('SELECT id,title,description,bytes,created_at FROM materials WHERE active=1 ORDER BY created_at DESC').all()});return true;
      }
      const download=route.match(/^\/api\/materials\/([\w-]+)\/file$/);
      if(req.method==='GET'&&download) {
        approved(req);const material=db.prepare('SELECT * FROM materials WHERE id=? AND active=1').get(download[1]);
        if(!material)throw fail(404,'Material não encontrado.');
        const bytes=await readFile(path.join(config.directory,'materials',material.filename));
        res.writeHead(200,{'Content-Type':'application/pdf','Content-Disposition':`attachment; filename="estudo-${material.id}.pdf"`,'Content-Length':bytes.length,'Cache-Control':'private, no-store'});res.end(bytes);return true;
      }
      if(req.method==='GET'&&route==='/api/admin/members') {
        admin(req);send(res,200,{members:db.prepare('SELECT id,email,interests,status,verified_at,created_at FROM members WHERE email!=? ORDER BY created_at DESC LIMIT 200').all(config.adminEmail),mailPending:db.prepare("SELECT count(*) AS count FROM mail WHERE status='queued'").get().count,mailMode:config.mailMode});return true;
      }
      const decision=route.match(/^\/api\/admin\/members\/([\w-]+)$/);
      if(req.method==='POST'&&decision) {
        const actor=admin(req);const {action}=await json(req);
        if(!['approve','reject','suspend'].includes(action))throw fail(400,'Decisão inválida.');
        store.transaction(()=>{
          const member=db.prepare('SELECT * FROM members WHERE id=?').get(decision[1]);
          if(!member||member.email===config.adminEmail)throw fail(404,'Cadastro não encontrado.');
          if(!member.verified_at)throw fail(409,'A pessoa precisa confirmar o e-mail antes da análise.');
          const valid=action==='approve'?['pending','rejected','suspended']:action==='reject'?['pending']:['approved'];
          if(!valid.includes(member.status))throw fail(409,'O cadastro mudou. Atualize a lista antes de decidir.');
          const status={approve:'approved',reject:'rejected',suspend:'suspended'}[action];
          db.prepare('UPDATE members SET status=?,updated_at=? WHERE id=?').run(status,Date.now(),member.id);
          db.prepare('INSERT INTO audit VALUES (?,?,?,?,?)').run(randomUUID(),actor.email,member.id,action,Date.now());
          if(action==='approve')store.mail(member.email,'Seu cadastro foi aprovado — Evangelho.wiki','Seu acesso aos materiais de ensino está liberado. Use o link abaixo para entrar.',store.token(member.id,config.origin));
          else {
            db.prepare('DELETE FROM sessions WHERE member_id=?').run(member.id);
            db.prepare('DELETE FROM tokens WHERE member_id=?').run(member.id);
            store.mail(member.email,action==='reject'?'Sobre sua solicitação — Evangelho.wiki':'Seu acesso foi suspenso — Evangelho.wiki',action==='reject'?'Sua solicitação não foi aprovada neste momento.':'Seu acesso aos materiais foi suspenso pela administração.');
          }
        });
        send(res,200,{ok:true});void flushMail();return true;
      }
      if(req.method==='POST'&&route==='/api/admin/materials') {
        admin(req);
        const title=(url.searchParams.get('title')||'').trim(),description=(url.searchParams.get('description')||'').trim();
        if(!title||title.length>120||description.length>1000)throw fail(400,'Informe título de até 120 caracteres e descrição de até 1.000.');
        if(req.headers['content-type']!=='application/pdf')throw fail(415,'Escolha um arquivo PDF.');
        const bytes=await body(req,10*1024*1024);
        if(bytes.subarray(0,5).toString()!=='%PDF-')throw fail(400,'O arquivo precisa ser um PDF válido.');
        const id=randomUUID(),filename=id+'.pdf';
        await mkdir(path.join(config.directory,'materials'),{recursive:true,mode:0o700});
        const file=path.join(config.directory,'materials',filename);
        await writeFile(file,bytes,{mode:0o600,flag:'wx'});
        try {db.prepare('INSERT INTO materials VALUES (?,?,?,?,?,1,?)').run(id,title,description,filename,bytes.length,Date.now());}
        catch(e){await unlink(file);throw e;}
        send(res,201,{id});return true;
      }
      if(req.method==='GET'&&route==='/api/admin/materials') {
        admin(req);send(res,200,{materials:db.prepare('SELECT id,title,description,bytes,active FROM materials ORDER BY created_at DESC').all()});return true;
      }
      const archive=route.match(/^\/api\/admin\/materials\/([\w-]+)$/);
      if(req.method==='POST'&&archive) {admin(req);await json(req);db.prepare('UPDATE materials SET active=0 WHERE id=?').run(archive[1]);send(res,200,{ok:true});return true;}
      throw fail(404,'Recurso não encontrado.');
    } catch(error) {
      if(!error.status)console.error('Falha no cadastro:',error.code||error.name);
      if(!res.headersSent)send(res,error.status||500,{message:error.status?error.message:'Não foi possível concluir. Tente novamente.'});
      else res.end();
    }
    return true;
  }
  return {handle,store,close(){clearInterval(timer);db.close();}};
}
