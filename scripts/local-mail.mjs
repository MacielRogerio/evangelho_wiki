import {DatabaseSync} from 'node:sqlite';
import path from 'node:path';
if(process.env.NODE_ENV==='production'||(process.env.MAIL_MODE&&process.env.MAIL_MODE!=='local'))throw new Error('A caixa de teste está disponível apenas no modo local.');
const db=new DatabaseSync(path.resolve(process.env.DATA_DIR||'.private','members.sqlite'),{readOnly:true});
const rows=db.prepare('SELECT recipient,subject,text,link,created_at FROM mail ORDER BY created_at DESC LIMIT 20').all();
for(const row of rows){console.log(`\nPara: ${row.recipient}\n${row.subject}\n${row.text}${row.link?'\n'+row.link:''}`);}
if(!rows.length)console.log('Nenhum e-mail local. Solicite cadastro ou entrada pelo botão Entrar.');
db.close();
