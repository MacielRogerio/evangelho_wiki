const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const names={unverified:'Aguardando confirmação do e-mail',pending:'Aguardando aprovação',approved:'Aprovado',rejected:'Não aprovado',suspended:'Acesso suspenso'};
let navigateTo, member=null, dialog, authVersion=0;
async function api(url,{body,method='GET',signal,...options}={}) {
  const response=await fetch(url,{method,signal,credentials:'same-origin',...options,...(body!==undefined?{headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}:{})});
  const data=await response.json();
  if(!response.ok)throw new Error(data.message||'Não foi possível concluir. Tente novamente.');
  return data;
}
function header() {const button=document.querySelector('.login');button.textContent=member?'Minha área':'Entrar';button.setAttribute('aria-label',member?'Abrir minha área de associado':'Entrar ou solicitar cadastro');}
async function refreshMember(signal) {const version=++authVersion;const data=await api('/api/me',{signal});if(version===authVersion){member=data.member;header();}return data.member;}
function formMarkup(mode='subscribe') {
  if(mode==='subscribe') return `<button class="member-close" type="button" aria-label="Fechar">×</button><p class="member-eyebrow">COMUNIDADE EVANGELHO.WIKI</p><h2 id="membership-dialog-title">Acompanhe as novidades</h2><p>O Evangelho.wiki é atualizado constantemente com novos assuntos, temas e pesquisas. Cadastre seu e-mail para receber informações sobre o que mudou e orientações sobre onde encontrar e como acessar esses conteúdos no site.</p><p>Seu cadastro serve para acompanhar as novidades. Os avisos serão informativos, sem envio de links de acesso.</p><form class="member-form" data-auth="subscribe"><label for="member-email">Seu e-mail</label><input id="member-email" name="email" type="email" autocomplete="email" placeholder="voce@exemplo.com" maxlength="254" required><button class="member-primary" type="submit">Quero receber as novidades</button><p class="member-feedback" role="status" aria-live="polite"></p></form>`;
  const register=mode==='register';
  return `<button class="member-close" type="button" aria-label="Fechar">×</button><p class="member-eyebrow">COMUNIDADE EVANGELHO.WIKI</p><h2 id="membership-dialog-title">${register?'Solicitar cadastro':'Bem-vindo de volta'}</h2><p>${register?'Cadastre seu e-mail para receber avisos sobre as atualizações do Evangelho.wiki. Nosso site é atualizado constantemente com novos assuntos, temas e pesquisas.':'O e-mail cadastrado será usado para enviar avisos sobre as atualizações do Evangelho.wiki. Nosso site é atualizado constantemente com novos assuntos, temas e pesquisas. Para entrar, receba um link por e-mail, sem precisar criar uma senha.'}</p><form class="member-form" data-auth="${mode}"><label for="member-email">Seu e-mail</label><input id="member-email" name="email" type="email" autocomplete="email" placeholder="voce@exemplo.com" maxlength="254" required>${register?'<label for="member-interests">O que você gostaria de aprender? <small>(opcional)</small></label><textarea id="member-interests" name="interests" rows="4" maxlength="2000" placeholder="Quais temas, passagens ou personagens despertam sua curiosidade?"></textarea><small>Até 2.000 caracteres. Suas curiosidades ficam visíveis apenas para você e a administração. Usaremos seu e-mail para confirmar o cadastro, enviar informações sobre seu acesso e avisar sobre novos assuntos, temas e pesquisas publicados no site.</small>':''}<button class="member-primary" type="submit">${register?'Enviar solicitação':'Receber link de acesso'}</button><p class="member-feedback" role="status" aria-live="polite"></p></form><p class="member-switch">${register?'Já solicitou seu cadastro?':'Ainda não faz parte?'} <button type="button" data-auth-mode="${register?'login':'register'}">${register?'Entrar':'Solicitar cadastro'}</button></p>`;
}
export function setupMembership({navigate}) {
  navigateTo=navigate;
  dialog=document.createElement('dialog');dialog.className='member-dialog';dialog.setAttribute('aria-labelledby','membership-dialog-title');document.body.append(dialog);
  const open=(mode='subscribe')=>{dialog.innerHTML=formMarkup(mode);if(!dialog.open)dialog.showModal();dialog.querySelector('input').focus();};
  const login=document.querySelector('.login');
  login.addEventListener('click',()=>{if(member)navigateTo('/associados');else open();});
  document.addEventListener('click',event=>{
    if(event.target.closest('[data-open-auth]'))open(event.target.closest('[data-open-auth]').dataset.openAuth||'login');
    const mode=event.target.closest('[data-auth-mode]');if(mode)open(mode.dataset.authMode);
    if(event.target.closest('.member-close'))dialog.close();
  });
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('submit',async event=>{
    const form=event.target.closest('[data-auth]');if(!form)return;event.preventDefault();
    const button=form.querySelector('[type=submit]'),feedback=form.querySelector('[role=status]');button.disabled=true;feedback.textContent='Enviando…';
    try {
      const fields=Object.fromEntries(new FormData(form));
      const data=await api((form.dataset.auth==='subscribe'?'/api/newsletter/subscribe':'/api/auth/'+form.dataset.auth),{method:'POST',body:fields});
      // Do not replace a dialog the visitor closed or switched while awaiting delivery.
      if(!form.isConnected)return;
      if(form.dataset.auth==='subscribe') {
        dialog.innerHTML='<button class="member-close" type="button" aria-label="Fechar">×</button><h2 id="membership-dialog-title">Cadastro realizado</h2><p role="status">Seu e-mail foi cadastrado para receber informações sobre as atualizações do Evangelho.wiki e orientações para encontrar os novos conteúdos no site.</p><button type="button" class="member-primary member-close-action">Entendi</button>';
        dialog.querySelector('.member-close-action').onclick=()=>dialog.close();dialog.querySelector('.member-close-action').focus();return;
      }
      dialog.innerHTML=`<button class="member-close" type="button" aria-label="Fechar">×</button><p class="member-eyebrow">PRÓXIMO PASSO</p><h2 id="membership-dialog-title">Confira seu e-mail</h2><p role="status">${escape(data.message)}</p><p>O link vale por 20 minutos. Abra-o e pressione <strong>Confirmar e continuar</strong>. O acesso aos materiais depende da aprovação do cadastro.</p><button type="button" class="member-primary member-close-action">Entendi</button>`;
      dialog.querySelector('.member-close-action').onclick=()=>dialog.close();dialog.querySelector('.member-close-action').focus();
    }catch(error){feedback.textContent=error.message;button.disabled=false;}
  });
  void refreshMember().catch(()=>{});
}
export function membershipShell(admin=false) {
  return `<section class="member-page" aria-labelledby="member-title"><div class="member-page-heading"><p class="member-eyebrow">${admin?'ADMINISTRAÇÃO':'ÁREA DE ASSOCIADOS'}</p><h1 id="member-title" tabindex="-1">${admin?'Comunidade e materiais':'Aprender e compartilhar'}</h1><p>${admin?'Analise as solicitações e organize os materiais de ensino.':'Uma jornada de conhecimento, com espaço para suas perguntas.'}</p></div><div id="member-content" aria-live="polite"><p>Carregando…</p></div></section>`;
}
function materialMarkup(material,admin=false) {
  return `<article class="member-material"><span class="member-file-icon" aria-hidden="true">PDF</span><div><h3>${escape(material.title)}</h3><p>${escape(material.description)}</p><small>PDF · ${(material.bytes/1024/1024).toFixed(1)} MB${admin&&!material.active?' · Arquivado':''}</small></div>${admin?material.active?`<button class="member-secondary" data-archive="${material.id}">Arquivar</button>`:'':`<a class="member-primary" href="/api/materials/${material.id}/file" download>Baixar PDF</a>`}</article>`;
}
function memberStatus(m) {
  const text={unverified:'Confirme seu e-mail pelo link enviado para concluir a solicitação.',pending:'Seu e-mail foi confirmado. Seu cadastro está aguardando aprovação. Você receberá um e-mail quando o acesso for liberado.',approved:'Seu acesso está liberado. Explore os materiais de ensino disponíveis abaixo.',rejected:'Sua solicitação não foi aprovada neste momento.',suspended:'Seu acesso aos materiais foi suspenso pela administração.'};
  return `<div class="member-status ${m.status}"><span class="member-badge">${names[m.status]}</span><h2>${m.status==='pending'?'Sua solicitação está em análise':m.status==='approved'?'Bem-vindo à comunidade':'Sobre seu cadastro'}</h2><p>${text[m.status]}</p></div>`;
}
export function loadMembership(container,pathname) {
  const controller=new AbortController(),signal=controller.signal;
  let confirmToken='';
  if(pathname==='/associados/confirmar') {
    confirmToken=new URLSearchParams(location.hash.slice(1)).get('token')||'';
    if(confirmToken)history.replaceState(null,'',location.pathname); // Remove the credential from history immediately.
  }
  const valid=()=>!signal.aborted&&container.isConnected;
  const errorMarkup=message=>`<div class="member-status"><h2>Não foi possível concluir</h2><p role="alert">${escape(message)}</p><button class="member-primary" data-open-auth="login">Solicitar novo link</button></div>`;
  async function render() {
    try {
      const m=await refreshMember(signal);if(!valid())return;
      if(pathname==='/associados/confirmar') {
        container.innerHTML=confirmToken?'<div class="member-status"><h2>Confirme seu acesso</h2><p>Pressione o botão para confirmar seu e-mail e continuar para sua área.</p><button class="member-primary" data-confirm>Confirmar e continuar</button><p class="member-feedback" role="status"></p></div>':errorMarkup('O link está incompleto. Solicite um novo link por e-mail.');return;
      }
      if(!m) {container.innerHTML=`<div class="member-status"><h2>${pathname==='/administracao'?'Entre com seu e-mail de administrador':'Seu espaço de estudos'}</h2><p>Entre com seu e-mail para acompanhar seu cadastro e acessar os materiais aprovados para você.</p><div class="member-actions"><button class="member-primary" data-open-auth="login">Entrar</button><button class="member-secondary" data-open-auth="register">Solicitar cadastro</button></div></div>`;return;}
      if(pathname==='/administracao') {
        if(!m.admin){container.innerHTML='<div class="member-status"><h2>Acesso reservado</h2><p>Esta área está disponível apenas para a administração.</p><a class="member-primary" href="/associados">Voltar à minha área</a></div>';return;}
        const [people,files]=await Promise.all([api('/api/admin/members',{signal}),api('/api/admin/materials',{signal})]);if(!valid())return;
        container.innerHTML=`<div class="member-toolbar"><p>${escape(m.email)}</p><a class="member-secondary" href="/associados">Minha área</a><button class="member-secondary" data-logout>Sair</button><button class="member-secondary" data-refresh>Atualizar</button></div><h2>Solicitações e associados</h2><p>Cadastros mais recentes (até 200). A aprovação só fica disponível após a confirmação do e-mail.</p>${people.mailMode==='local'?'<p class="member-admin-note">Modo de teste: as mensagens ficam na caixa local e não são enviadas por e-mail.</p>':people.mailPending?`<p class="member-admin-note">${people.mailPending} mensagem(ns) aguardando envio. O servidor tenta novamente automaticamente.</p>`:''}<p class="member-feedback" role="status" id="admin-feedback"></p><div class="member-applications">${people.members.length?people.members.map(p=>`<article class="member-application"><div><h3>${escape(p.email)}</h3><span class="member-badge">${names[p.status]}</span><p class="member-interests">${escape(p.interests||'Nenhuma curiosidade informada.')}</p></div><div class="member-actions">${p.verified_at&&['pending','rejected','suspended'].includes(p.status)?`<button class="member-primary" data-person="${p.id}" data-decision="approve">${p.status==='suspended'?'Reativar':'Aprovar'}</button>`:''}${p.status==='pending'?`<button class="member-secondary" data-person="${p.id}" data-decision="reject">Recusar</button>`:''}${p.status==='approved'?`<button class="member-secondary" data-person="${p.id}" data-decision="suspend">Suspender</button>`:''}</div></article>`).join(''):'<div class="member-empty">Nenhuma solicitação recebida ainda.</div>'}</div><h2>Publicar material de ensino</h2><form class="member-form member-upload"><label for="material-title">Título</label><input id="material-title" name="title" maxlength="120" required><label for="material-description">Descrição <small>(opcional)</small></label><textarea id="material-description" name="description" maxlength="1000" rows="3"></textarea><label for="material-file">Arquivo PDF (até 10 MB)</label><input id="material-file" name="file" type="file" accept="application/pdf,.pdf" required><button class="member-primary" type="submit">Publicar para associados</button><p class="member-feedback" role="status"></p></form><h2>Biblioteca</h2><div class="member-materials">${files.materials.length?files.materials.map(f=>materialMarkup(f,true)).join(''):'<div class="member-empty">Nenhum material publicado.</div>'}</div>`;
      } else {
        const files=m.status==='approved'||m.admin?(await api('/api/materials',{signal})).materials:[];if(!valid())return;
        container.innerHTML=`<div class="member-toolbar"><p>${escape(m.email)}</p>${m.admin?'<a class="member-secondary" href="/administracao">Administrar cadastros e materiais</a>':''}<button class="member-secondary" data-logout>Sair</button><button class="member-secondary" data-refresh>Atualizar situação</button></div>${memberStatus(m)}${m.interests?`<section class="member-curiosities"><h2>Suas curiosidades</h2><p>${escape(m.interests)}</p></section>`:''}${m.status==='approved'||m.admin?`<h2>Materiais de ensino</h2><div class="member-materials">${files.length?files.map(f=>materialMarkup(f)).join(''):'<div class="member-empty">Os primeiros materiais serão publicados em breve.</div>'}</div>`:''}`;
      }
    }catch(error){if(valid())container.innerHTML=errorMarkup(error.message);}
  }
  container.addEventListener('click',async event=>{
    const target=event.target.closest('button');if(!target)return;
    if(target.hasAttribute('data-refresh')){await render();return;}
    if(target.hasAttribute('data-open-auth'))return;
    const feedback=container.querySelector('#admin-feedback')||container.querySelector('.member-feedback');
    try {
      if(target.hasAttribute('data-logout')){target.disabled=true;await api('/api/auth/logout',{method:'POST',body:{},signal});member=null;header();navigateTo('/associados');}
      if(target.hasAttribute('data-confirm')){target.disabled=true;const result=await api('/api/auth/confirm',{method:'POST',body:{token:confirmToken},signal});confirmToken='';member=result.member;header();navigateTo(member.admin?'/administracao':'/associados');}
      if(target.dataset.decision){target.disabled=true;await api(`/api/admin/members/${target.dataset.person}`,{method:'POST',body:{action:target.dataset.decision},signal});await render();}
      if(target.dataset.archive){target.disabled=true;await api(`/api/admin/materials/${target.dataset.archive}`,{method:'POST',body:{},signal});await render();}
    }catch(error){if(valid()&&feedback)feedback.textContent=error.message;target.disabled=false;}
  },{signal});
  container.addEventListener('submit',async event=>{
    const form=event.target.closest('.member-upload');if(!form)return;event.preventDefault();
    const button=form.querySelector('[type=submit]'),feedback=form.querySelector('[role=status]');
    const fields=new FormData(form),file=fields.get('file');
    if(!file?.size||file.size>10*1024*1024){feedback.textContent='Escolha um PDF de até 10 MB.';return;}
    button.disabled=true;feedback.textContent='Publicando…';
    try {
      const query=new URLSearchParams({title:fields.get('title'),description:fields.get('description')});
      const response=await fetch('/api/admin/materials?'+query,{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/pdf'},body:file,signal});
      const data=await response.json();
      if(!response.ok)throw new Error(data.message||'Não foi possível publicar.');
      if(valid())await render();
    }catch(error){if(valid())feedback.textContent=error.message;}
    finally{button.disabled=false;}

  },{signal});
  void render();
  return ()=>controller.abort();
}
