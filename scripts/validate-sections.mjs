import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {sections} from '../sections.js';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/home/rogerio-maciel/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/home/rogerio-maciel/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome',headless:true});
const base=process.env.TEST_URL||'http://localhost:5174';
const page=await browser.newPage({viewport:{width:1536,height:864},deviceScaleFactor:1});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
let checks=0;
const check=(value,message)=>{assert(value,message);checks++};
async function ready(){await page.locator('main h1, #content-title').first().waitFor();await page.evaluate(()=>document.fonts.ready);await page.evaluate(()=>Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))));}
try{
for(const [slug,s] of Object.entries(sections)){
 for(const source of [`header nav a[href="/${slug}"]`,`.portal[href="/${slug}"]`]){
  await page.goto(base);await ready();await page.locator(source).click();await page.locator('#section-title').waitFor();check(new URL(page.url()).pathname==='/'+slug,'Entrada '+source);check(await page.locator(`header nav a[href="/${slug}"]`).getAttribute('aria-current')==='page','Cabeçalho ativo');
 }
 await page.goto(`${base}/${slug}`);await ready();await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.evaluate(()=>new Promise(requestAnimationFrame));await page.screenshot({path:`artifacts/${slug}-1536x864.png`});check(await page.locator('.section-actions').evaluate(e=>e.getBoundingClientRect().bottom<=e.closest('.section-hero').getBoundingClientRect().bottom),'Botões completos no hero');check(await page.locator('.copyright').evaluate(e=>e.getBoundingClientRect().bottom<=864),'Rodapé completo em 864 px');
 check(await page.locator('.collection-card').count()===6,'Seis cartões');
 check((await page.locator('.collection-card h2').allTextContents()).join('|')===s.cards.map(c=>c[1]).join('|'),'Ordem dos cartões');
 await page.locator('.section-actions a').first().click();check(await page.locator('#colecoes').evaluate(e=>e===document.activeElement),'Explorar foca cartões');
 await page.locator('.section-actions a').nth(1).click();check(await page.locator('#destaque').evaluate(e=>e===document.activeElement),'Destaque foca bloco');
 for(const card of s.cards){
  if(slug==='antigo-testamento'&&card[0]==='livros-da-biblia'){await page.goto(`${base}/${slug}`);await page.locator('.collection-card').first().click();check(await page.locator('#content-title').textContent()==='Livros do Antigo Testamento','Catálogo de livros');check(await page.locator('.book-entry').count()===39,'39 livros');await page.reload();check(await page.locator('.book-entry').count()===39,'Catálogo após recarga');continue;}
  await page.goto(`${base}/${slug}`);await page.locator(`.collection-card[href="/${slug}/${card[0]}"]`).click();check(await page.locator('#content-title').textContent()===card[1],'Conteúdo do cartão '+card[1]);check(await page.locator('.collection-card.selected').getAttribute('href')===`/${slug}/${card[0]}`,'Origem selecionada');check(await page.locator('.empty-state').isVisible(),'Indisponibilidade');await page.reload();await ready();check(await page.locator('#content-title').textContent()===card[1],'Recarga '+card[1]);
 }
 await page.goto(`${base}/${slug}`);await page.locator('.study-actions .blue-button').click();check(await page.locator('#content-title').textContent()===s.study[1],'Estudo correto');check(await page.locator('.featured-study.selected').count()===1,'Destaque selecionado');
 for(const topic of s.topics){await page.goto(`${base}/${slug}`);await page.locator(`.study-topics a[href$="#${topic[0]}"]`).click();check(await page.locator('#content-title').textContent()===topic[1],'Tópico '+topic[0]);check(await page.locator('.study-topics .selected').count()===1,'Tópico selecionado');await page.reload();await ready();check(await page.locator('#content-title').textContent()===topic[1],'Tópico após recarga');}
 await page.goto(`${base}/${slug}`);await page.locator('.all-studies').click();check(await page.locator('.catalog-filters [aria-current]').textContent()===s.name,'Filtro catálogo');await page.locator('.catalog-entry').click();check(await page.locator('#content-title').textContent()===s.study[1],'Catálogo para estudo');await page.goBack();check(await page.locator('.catalog-filters').count()===1,'Voltar para catálogo');await page.goForward();check(await page.locator('#content-title').textContent()===s.study[1],'Avançar para estudo');
 await page.goto(`${base}/${slug}`);await page.locator('#focus-search').click();check(await page.locator('#search').evaluate(e=>e===document.activeElement),'Foco da lupa');await page.locator('#search').fill(s.cards[0][1]);await page.locator('#search').press('Enter');check(new URL(page.url()).pathname===`/${slug}/busca`,'Busca contextual');check(await page.locator('.search-results .catalog-entry').count()>=1,'Resultado de busca');await page.reload();await ready();check(await page.locator('#content-title').textContent()==='Resultados para “'+s.cards[0][1]+'”','Busca após recarga');
 await page.locator('header nav a[href="/"]').click();check(new URL(page.url()).pathname==='/','Início');await page.goBack();check(new URL(page.url()).pathname===`/${slug}/busca`,'Voltar restaura contexto');await page.locator('header .brand').click();check(new URL(page.url()).pathname==='/','Logotipo');
 await page.setViewportSize({width:390,height:844});await page.goto(`${base}/${slug}`);await ready();await page.screenshot({path:`artifacts/${slug}-mobile.png`,fullPage:true});check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Sem overflow móvel '+slug);check(await page.locator('header nav [aria-current]').evaluate(e=>{const r=e.getBoundingClientRect(),n=e.parentElement.getBoundingClientRect();return r.left>=n.left&&r.right<=n.right}),'Item ativo visível no menu móvel');await page.locator('.collection-card').last().click();check(await page.locator('#content-title').textContent()===s.cards.at(-1)[1],'Cartão móvel');check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Sem overflow conteúdo móvel');await page.setViewportSize({width:1536,height:864});
}
await page.goto(`${base}/atualidade`);await page.locator('#search').fill('tecnologia');await page.locator('#search-form button').click();check(await page.locator('.search-results h3').textContent()==='Atualidade','Busca por botão e descrição');await page.locator('#focus-search').click();await page.locator('#search').fill('<img src=x onerror=alert(1)>');await page.locator('#search').press('Enter');check(await page.locator('#content-title img').count()===0,'Escape de busca');
await page.goto(`${base}/novo-testamento`);await page.locator('.collection-card').first().focus();await page.keyboard.press('Enter');check(await page.locator('#content-title').textContent()==='Evangelhos','Ativação por teclado');await page.emulateMedia({reducedMotion:'reduce'});check(await page.locator('.collection-card').first().evaluate(e=>getComputedStyle(e).transitionDuration)==='0s','Movimento reduzido');
await page.goto(`${base}/linha-do-tempo`);
const timelineImages = await page.locator('.history-event').evaluateAll(cards => cards.map(card => ({
  id:card.id,
  url:card.querySelector('.history-artwork img')?.src,
})));
check(timelineImages.length > 0, 'Linha do tempo carregada');
const missingImages = timelineImages.filter(({url}) => !url).map(({id}) => id);
check(missingImages.length === 0, 'Cartões sem imagem: '+missingImages.join(', '));
const brokenImages = await page.evaluate(async images => {
  const broken = [];
  for (let offset = 0; offset < images.length; offset += 12) {
    await Promise.all(images.slice(offset, offset + 12).map(async ({id,url}) => {
      const image = new Image();
      image.src = url;
      try { await image.decode(); } catch { broken.push(id); }
    }));
  }
  return broken;
}, timelineImages);
check(brokenImages.length === 0, 'Imagens da linha do tempo indisponíveis: '+brokenImages.join(', '));
check(errors.length===0,'Sem erros JavaScript: '+errors.join('; '));
console.log(`PASS: ${checks} verificações; seis entradas, dezoito cartões, três estudos, nove tópicos, catálogos, busca, recarga, histórico, teclado, celular e imagens da linha do tempo.`);
}finally{await browser.close()}
