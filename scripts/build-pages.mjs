import {cp, mkdir, readFile, rm, writeFile} from 'node:fs/promises';
import path from 'node:path';

const output=path.resolve(process.env.PAGES_OUTPUT || 'pages-dist');
const base=(process.env.PAGES_BASE_PATH || '/evangelho_wiki').replace(/\/$/,'');
if(!/^\/[A-Za-z0-9._~-]+$/.test(base)) throw new Error('PAGES_BASE_PATH deve ser um caminho de repositório, como /evangelho_wiki');
const source=process.cwd();
if(output===source || !output.startsWith(source+path.sep)) throw new Error('O diretório de saída deve estar dentro do projeto.');
await rm(output,{recursive:true,force:true});
await mkdir(output,{recursive:true});
await cp('assets',path.join(output,'assets'),{recursive:true});
const files=['index.html','style.css','sections.css','app.js','sections.js','books.js','books-data.js','books.css','timeline-data.js','timeline-page.css','golden-light.js','membership.css'];
for(const file of files){
 let content=await readFile(file,'utf8');
 // Rewrite root-relative URLs in HTML, CSS and JavaScript string literals.
 content=content.replace(/(["'`])\/(?!\/)(?=[A-Za-z$])/g,`$1${base}/`)
   .replace(/url\(\/(?!\/)/g,`url(${base}/`);
 if(file==='app.js'){
  content=content.replaceAll("'/'+", JSON.stringify(base+'/')+'+')
    .replaceAll(":'/'", ':'+JSON.stringify(base+'/'))
    .replaceAll(",'/'", ','+JSON.stringify(base+'/'));
  const before="const parts=location.pathname.split('/').filter(Boolean)";
  if(!content.includes(before)) throw new Error('Não foi possível adaptar o roteamento.');
  content=content.replace(before,`const parts=location.pathname.slice(${JSON.stringify(base)}.length).split('/').filter(Boolean)`);
 }
 if(file==='index.html'){
  content=content.replaceAll('href="/"',`href="${base}/"`);
  const restore=`<script>try{const p=sessionStorage.getItem('pages-redirect');if(p&&p.startsWith(${JSON.stringify(base+'/')})){sessionStorage.removeItem('pages-redirect');history.replaceState(null,'',p)}}catch{}</script>`;
  content=content.replace('</head>',restore+'</head>');
 }
 await writeFile(path.join(output,file),content);
}
// GitHub Pages has no application server: make the unavailable functionality explicit.
await writeFile(path.join(output,'membership.js'),`export function setupMembership(){document.querySelector('.login').addEventListener('click',()=>alert('O cadastro e a área de associados estão temporariamente indisponíveis.'))}\nexport function membershipShell(){return '<section class="utility-page"><div id="conteudo" class="content-panel" tabindex="-1"><h1 id="member-title">Área de associados</h1><p>O cadastro e a área de associados estão temporariamente indisponíveis.</p></div></section>'}\nexport function loadMembership(){return ()=>{}}\n`);
const home=base+'/';
await writeFile(path.join(output,'404.html'),`<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Abrindo página</title><p>Abrindo página… <a href="${home}">Voltar ao início</a></p><script>try{sessionStorage.setItem('pages-redirect',location.pathname+location.search+location.hash)}catch{}location.replace(${JSON.stringify(home)})</script></html>`);
await writeFile(path.join(output,'.nojekyll'),'');
console.log(`Site estático preparado em ${output} para ${home}`);
