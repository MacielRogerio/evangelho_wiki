import http from 'node:http';
import {readFile,realpath} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {createMembership,membershipConfig} from './backend/membership.mjs';
export function createApplication({root=process.cwd(),config=membershipConfig()}={}) {
const membership=createMembership(config);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.ttf':'font/ttf','.mp4':'video/mp4'};
const publicFiles=new Set(['index.html','style.css','sections.css','app.js','sections.js','books.js','books-data.js','books.css','timeline-page.css','timeline-data.js','genesis-timeline-data.js','exodo-timeline-data.js','pentateuch-timeline-data.js','joshua-timeline-data.js','judges-timeline-data.js','monarchy-timeline-data.js','golden-light.js','membership.js','membership.css']);
const appRoute=/^\/(?:antigo-testamento|novo-testamento|atualidade|linha-do-tempo|busca|recursos|sobre|associados|administracao)(?:\/[^.]*)?\/?$/;
const server=http.createServer(async(req,res)=>{
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Referrer-Policy','no-referrer');
  res.setHeader('X-Frame-Options','DENY');
  try {
    const url=new URL(req.url,config.origin);
    if(await membership.handle(req,res,url))return;
    if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405).end();return;}
    const pathname=decodeURIComponent(url.pathname);
    const relative=pathname==='/'||appRoute.test(pathname)?'index.html':pathname.slice(1);
    if(!publicFiles.has(relative)&&!/^assets\/(?!.*(?:^|\/)\.)[^\\]+\.(?:webp|png|svg|ttf|txt)$/i.test(relative)&&!/^ImagensDiversas\/[^/\\]+\.mp4$/i.test(relative)) {
      res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'}).end('Página não disponível');return;
    }
    const file=await realpath(path.resolve(root,relative));
    const allowedBase=relative.startsWith('assets/')?path.join(root,'assets')+path.sep:relative.startsWith('ImagensDiversas/')?path.join(root,'ImagensDiversas')+path.sep:root+path.sep;
    if(!file.startsWith(allowedBase)||file.includes(path.sep+'.')) {res.writeHead(404).end();return;}
    const data=await readFile(file);
    res.setHeader('Content-Type',types[path.extname(file).toLowerCase()]||'application/octet-stream');
    if(relative==='index.html')res.setHeader('Cache-Control','no-store');
    if(req.method==='HEAD')res.end();else res.end(data);
  }catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'}).end('Página não disponível');}
});
return {server,membership};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href) {
const config=membershipConfig();
const {server,membership}=createApplication({config});
server.listen(config.port,'127.0.0.1',()=>{
  console.log(config.origin);
  if(config.mailMode==='local')console.log('E-mails de teste ficam somente na caixa local. Consulte com: npm run mail:local');
  if(!config.adminEmail)console.log('Configure ADMIN_EMAIL no .env para habilitar sua conta administrativa.');
});
server.on('error',error=>{console.error(error.message);membership.close();process.exitCode=1;});
for(const signal of ['SIGTERM','SIGINT']) process.on(signal,()=>server.close(()=>{membership.close();process.exit(0);}));

}
