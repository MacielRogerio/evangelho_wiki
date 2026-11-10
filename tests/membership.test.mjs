import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {createApplication} from '../server.mjs';
import {membershipConfig} from '../backend/membership.mjs';
import {hash} from '../backend/store.mjs';
const origin='http://localhost';
async function fixture(t) {
  const directory=await mkdtemp(path.join(os.tmpdir(),'evangelho-members-'));
  const config={...membershipConfig({APP_ORIGIN:origin,ADMIN_EMAIL:'admin@example.com',DATA_DIR:directory}),mailMode:'local'};
  const app=createApplication({config});
  await new Promise(resolve=>app.server.listen(0,'127.0.0.1',resolve));
  const base=`http://127.0.0.1:${app.server.address().port}`;
  t.after(async()=>{await new Promise(r=>app.server.close(r));app.membership.close();await rm(directory,{recursive:true,force:true});});
  const db=app.membership.store.db;
  async function request(route,{body,method='GET',cookie,headers={}}={}) {
    const response=await fetch(base+route,{method,headers:{Origin:origin,...(cookie?{Cookie:cookie}:{}),...(body!==undefined?{'Content-Type':'application/json'}:{}),...headers},body:body===undefined?undefined:typeof body==='string'||Buffer.isBuffer(body)?body:JSON.stringify(body)});
    const data=response.headers.get('content-type')?.includes('json')?await response.json():await response.text();
    return {response,data,status:response.status,cookie:response.headers.get('set-cookie')?.split(';')[0]};
  }
  const token=email=>new URL(db.prepare('SELECT link FROM mail WHERE recipient=? AND link IS NOT NULL ORDER BY rowid DESC LIMIT 1').get(email).link).hash.slice(7);
  async function login(email) {
    await request('/api/auth/login',{method:'POST',body:{email}});
    const result=await request('/api/auth/confirm',{method:'POST',body:{token:token(email)}});
    assert.equal(result.status,200);return result.cookie;
  }
  return {directory,db,request,token,login};
}
test('Complete approval flow and private materials enforce permissions on every request',async t=>{
 const {request,db,token,login}=await fixture(t);
 assert.equal((await request('/api/materials')).status,401);
 assert.equal((await request('/api/admin/members')).status,403);
 const unknown=await request('/api/auth/login',{method:'POST',body:{email:'missing@example.com'}});
 const signup=await request('/api/auth/register',{method:'POST',body:{email:'Student@Example.com',interests:'<script>alert(1)</script> Quero estudar os evangelhos.'}});
 assert.equal(signup.status,202);assert.deepEqual(signup.data,unknown.data);
 let row=db.prepare('SELECT * FROM members WHERE email=?').get('student@example.com');
 assert.equal(row.status,'unverified');assert.equal(row.verified_at,null);
 const adminCookie=await login('admin@example.com');
 assert.match(adminCookie,/^ew_session=/);
 let action=await request('/api/admin/members/'+row.id,{method:'POST',body:{action:'approve'},cookie:adminCookie});
 assert.equal(action.status,409);
 const oldToken=token(row.email);
 const confirmation=await request('/api/auth/confirm',{method:'POST',body:{token:oldToken}});
 assert.equal(confirmation.status,200);assert.equal(confirmation.data.member.status,'pending');
 assert.equal(confirmation.data.member.admin,false);
 const pendingCookie=confirmation.cookie;
 assert.match(confirmation.response.headers.get('set-cookie'),/HttpOnly; SameSite=Lax/);
 assert.equal((await request('/api/auth/confirm',{method:'POST',body:{token:oldToken}})).status,400);
 assert.equal((await request('/api/materials',{cookie:pendingCookie})).status,403);
 assert.equal((await request('/api/admin/members',{cookie:pendingCookie})).status,403);
 const pdf=Buffer.from('%PDF-1.4\nTest fixture\n%%EOF');
 assert.equal((await request('/api/admin/materials?title=Estudo',{method:'POST',body:pdf,headers:{'Content-Type':'application/pdf'},cookie:pendingCookie})).status,403);
 let upload=await request('/api/admin/materials?title=Evangelhos&description=Introdu%C3%A7%C3%A3o',{method:'POST',body:pdf,headers:{'Content-Type':'application/pdf'},cookie:adminCookie});
 assert.equal(upload.status,201);const material=upload.data.id;
 assert.equal((await request('/api/materials/'+material+'/file',{cookie:pendingCookie})).status,403);
 assert.equal((await request('/.private/members.sqlite')).status,404);
 assert.equal((await request('/backend/membership.mjs')).status,404);
 assert.equal((await request('/.env')).status,404);
 assert.equal((await request('/package.json')).status,404);
 assert.equal((await request('/assets/%2e%2e%2fbackend%2fmembership.mjs')).status,404);
 assert.equal((await request('/associados')).status,200);
 assert.equal((await request('/administracao')).status,200);
 assert.equal((await request('/membership.js')).status,200);
 assert.equal((await request('/api/admin/members/'+row.id,{method:'POST',body:{action:'approve'},cookie:adminCookie})).status,200);
 assert.equal((await request('/api/materials',{cookie:pendingCookie})).data.materials.length,1);
 const access=await request('/api/materials/'+material+'/file',{cookie:pendingCookie});
 assert.equal(access.status,200);assert.match(access.response.headers.get('content-disposition'),/^attachment;/);
 assert.match(access.response.headers.get('cache-control'),/no-store/);
 assert.equal((await request('/api/admin/members/'+row.id,{method:'POST',body:{action:'suspend'},cookie:adminCookie})).status,200);
 assert.equal((await request('/api/materials/'+material+'/file',{cookie:pendingCookie})).status,401);
 const suspended=await login(row.email);
 assert.equal((await request('/api/materials/'+material+'/file',{cookie:suspended})).status,403);
 assert.equal((await request('/api/admin/members/'+row.id,{method:'POST',body:{action:'approve'},cookie:adminCookie})).status,200);
 const approved=await login(row.email);
 assert.equal((await request('/api/materials/'+material+'/file',{cookie:approved})).status,200);
 assert.equal((await request('/api/admin/materials/'+material,{method:'POST',body:{},cookie:adminCookie})).status,200);
 assert.equal((await request('/api/materials/'+material+'/file',{cookie:approved})).status,404);
 assert.equal((await request('/api/auth/logout',{method:'POST',body:{},cookie:approved})).status,200);
 assert.equal((await request('/api/me',{cookie:approved})).data.member,null);
 assert.equal(db.prepare('SELECT count(*) AS n FROM audit').get().n,3);
});
test('Expired links, origin validation, input limits and email rate limits',async t=>{
 const {request,db,token}=await fixture(t);
 assert.equal((await request('/api/auth/register',{method:'POST',body:{email:'bad'}})).status,400);
 assert.equal((await request('/api/auth/register',{method:'POST',body:{email:'ok@example.com',interests:'x'.repeat(2001)}})).status,400);
 assert.equal((await request('/api/auth/register',{method:'POST',body:{email:'ok@example.com'},headers:{Origin:'https://other.example'}})).status,403);
 assert.equal((await request('/api/auth/register',{method:'POST',body:{email:'ok@example.com'}})).status,202);
 const expired=token('ok@example.com');db.prepare('UPDATE tokens SET expires_at=? WHERE hash=?').run(Date.now()-1,hash(expired));
 assert.equal((await request('/api/auth/confirm',{method:'POST',body:{token:expired}})).status,400);
 for(let i=0;i<4;i++)assert.equal((await request('/api/auth/login',{method:'POST',body:{email:'ok@example.com'}})).status,202);
 assert.equal((await request('/api/auth/login',{method:'POST',body:{email:'ok@example.com'}})).status,429);
 assert.equal((await request('/api/auth/register',{method:'POST',body:'{'})).status,400);
 assert.equal((await request('/api/auth/register',{method:'POST',body:{email:'ok@example.com'},headers:{'Content-Type':'text/plain'}})).status,415);
});
test('Refusal does not grant access; records persist on disk',async t=>{
 const {request,db,token,login,directory}=await fixture(t);
 await request('/api/auth/register',{method:'POST',body:{email:'review@example.com',interests:'Profetas'}});
 const person=await request('/api/auth/confirm',{method:'POST',body:{token:token('review@example.com')}});
 const id=person.data.member.id,admin=await login('admin@example.com');
 assert.equal((await request('/api/admin/members/'+id,{method:'POST',body:{action:'reject'},cookie:admin})).status,200);
 const rejected=await login('review@example.com');
 assert.equal((await request('/api/me',{cookie:rejected})).data.member.status,'rejected');
 assert.equal((await request('/api/materials',{cookie:rejected})).status,403);
 const {DatabaseSync}=await import('node:sqlite');const reopened=new DatabaseSync(path.join(directory,'members.sqlite'),{readOnly:true});
 assert.equal(reopened.prepare('SELECT interests FROM members WHERE id=?').get(id).interests,'Profetas');reopened.close();
 assert.equal(db.prepare('SELECT status FROM members WHERE id=?').get(id).status,'rejected');
 const configured=createApplication({config:membershipConfig({APP_ORIGIN:origin,ADMIN_EMAIL:'review@example.com',DATA_DIR:directory})});
 assert.equal(configured.membership.store.db.prepare('SELECT status FROM members WHERE id=?').get(id).status,'approved');
 configured.membership.close();
});
test('Production configuration fails closed without verified sender configuration',()=>{
 assert.throws(()=>membershipConfig({NODE_ENV:'production'}),/Produção requer/);
 assert.throws(()=>membershipConfig({NODE_ENV:'production',APP_ORIGIN:'https://evangelho.example',ADMIN_EMAIL:'admin@example.com',MAIL_MODE:'resend'}),/RESEND_API_KEY/);
 const config=membershipConfig({NODE_ENV:'production',APP_ORIGIN:'https://evangelho.example',ADMIN_EMAIL:'admin@example.com',MAIL_MODE:'resend',RESEND_API_KEY:'test',MAIL_FROM:'Site <site@example.com>'});
 assert.equal(config.production,true);
});

test('Email outbox retries failures, preserves idempotency and discards expired links',async t=>{
 const {db,request}=await fixture(t);
 const {mailDelivery}=await import('../backend/mail.mjs');
 await request('/api/auth/register',{method:'POST',body:{email:'delivery@example.com'}});
 const row=db.prepare('SELECT * FROM mail').get();
 const savedFetch=globalThis.fetch;let calls=0;const ids=[];
 t.after(()=>{globalThis.fetch=savedFetch;});
 globalThis.fetch=async(url,options)=>{calls++;assert.equal(url,'https://api.resend.com/emails');ids.push(options.headers['Idempotency-Key']);return {ok:calls>1,status:calls>1?200:503};};
 const flush=mailDelivery({db},{mailMode:'resend',mailKey:'fake-test-key',mailFrom:'test@example.com'});
 await flush();assert.equal(db.prepare('SELECT status FROM mail WHERE id=?').get(row.id).status,'queued');
 db.prepare('UPDATE mail SET next_attempt=0').run();await flush();
 const sent=db.prepare('SELECT * FROM mail WHERE id=?').get(row.id);assert.equal(sent.status,'sent');assert.equal(sent.text,'');assert.equal(sent.link,null);assert.deepEqual(ids,[row.id,row.id]);
 db.prepare("UPDATE mail SET status='queued',expires_at=0,text='expired',link='expired',next_attempt=0 WHERE id=?").run(row.id);
 await flush();assert.equal(calls,2);assert.equal(db.prepare('SELECT status FROM mail WHERE id=?').get(row.id).status,'expired');
});

test('Newsletter saves a unique email without creating access tokens or sending mail',async t=>{
  const {request,db}=await fixture(t);
  const route='/api/newsletter/subscribe';
  assert.equal((await request(route,{method:'POST',body:{email:'invalid'}})).status,400);
  const initialMail=db.prepare('SELECT count(*) AS total FROM mail').get().total;
  for(const email of [' Reader@Example.com ','reader@example.com']) {
    assert.equal((await request(route,{method:'POST',body:{email}})).status,200);
  }
  assert.equal(db.prepare('SELECT count(*) AS total FROM newsletter_subscribers WHERE email=?').get('reader@example.com').total,1);
  assert.equal(db.prepare('SELECT count(*) AS total FROM tokens').get().total,0);
  assert.equal(db.prepare('SELECT count(*) AS total FROM mail').get().total,initialMail);
  assert.equal(db.prepare('SELECT count(*) AS total FROM members WHERE email=?').get('reader@example.com').total,0);
});
