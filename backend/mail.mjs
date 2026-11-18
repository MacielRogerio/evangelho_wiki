export function mailDelivery(store, config) {
  let busy=false;
  return async () => {
    if (busy || config.mailMode!=='resend') return;
    busy=true;
    try {
      const now=Date.now();
      store.db.prepare("UPDATE mail SET status='expired',text='',link=NULL WHERE status='queued' AND expires_at<?").run(now);
      const rows=store.db.prepare("SELECT * FROM mail WHERE status='queued' AND next_attempt<=? ORDER BY created_at LIMIT 10").all(now);
      for (const row of rows) {
        try {
          const response=await fetch('https://api.resend.com/emails',{
            method:'POST',signal:AbortSignal.timeout(15_000),
            headers:{'Authorization':`Bearer ${config.mailKey}`,'Content-Type':'application/json','Idempotency-Key':row.id},
            body:JSON.stringify({from:config.mailFrom,to:[row.recipient],subject:row.subject,text:row.text+(row.link?'\n\n'+row.link+'\n\nEste link expira em 20 minutos e só pode ser usado uma vez.':'')})
          });
          if(!response.ok) throw new Error(`Provedor de e-mail: HTTP ${response.status}`);
          store.db.prepare("UPDATE mail SET status='sent',text='',link=NULL,error=NULL WHERE id=?").run(row.id);
        } catch (error) {
          store.db.prepare('UPDATE mail SET attempts=attempts+1,next_attempt=?,error=? WHERE id=?')
            .run(Date.now()+Math.min(30*60_000,30_000*2**Math.min(row.attempts,6)),error.message,row.id);
          console.error('Entrega de e-mail pendente; nova tentativa automática.');
        }
      }
    } finally {busy=false;}
  };
}
