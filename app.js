import {timelineImages, timelineAdditions, timelineConnections, kingdomsEvents, kingdomsConnections, kingdomsArtwork, kingdomsTextConnections, divisionNarrative, additionalHistory, divisionUpdates, spiritualContinuityEvents, divisionConnections, divisionArtwork, spiritualEvents, spiritualConflicts} from './timeline-data.js?v=acervo-completo';
import {genesisEvents, genesisHistoricalEvents, genesisConnections} from './genesis-timeline-data.js?v=genesis-linha-do-tempo';
import {exodoEvents, exodoHistoricalEvents, exodoConnections} from './exodo-timeline-data.js';
import {pentateuchEvents, pentateuchHistoricalEvents, pentateuchConnections, pentateuchScriptureCredit} from './pentateuch-timeline-data.js';
import {joshuaEvents, joshuaHistoricalEvents, joshuaConnections} from './joshua-timeline-data.js';
import {judgesEvents, judgesHistoricalEvents, judgesConnections} from './judges-timeline-data.js';
import {monarchyEvents, monarchyParallelEvents, monarchyHistoricalEvents, monarchyConnections} from './monarchy-timeline-data.js';
import {booksMarkup,books,bookURL,booksBase} from './books.js';
import {setupMembership, membershipShell, loadMembership} from './membership.js';
let cleanupMembership = () => {};
import {setupGoldenLight} from './golden-light.js';
let cleanupGoldenLight = () => {};
import {sections,icon} from './sections.js';
history.scrollRestoration='manual';
const main=document.querySelector('main');
const homeMarkup=main.innerHTML;
const dialog=document.querySelector('#notice');
const escapeHTML=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const slugTitle=slug=>slug.split('-').map(word=>word.charAt(0).toUpperCase()+word.slice(1)).join(' ');
function notice(title,text){document.querySelector('#notice-title').textContent=title;document.querySelector('#notice-text').textContent=text;dialog.showModal()}
function current(){const parts=location.pathname.split('/').filter(Boolean);return{slug:parts[0],section:sections[parts[0]],parts};}
function collectionLink(slug,card){return `/${slug}/${card[0]}`}
function studyLink(slug,s){return `/${slug}/estudos/${s.study[0]}`}
function searchForm(slug){return `<form id="search-form" role="search" action="/${slug}/busca"><svg aria-hidden="true"><use href="#icon-search"/></svg><input id="search" name="q" required aria-label="Buscar em ${escapeHTML(sections[slug].name)}" placeholder="${slug==='atualidade'?'Busque por temas, estudos, personagens ou passagens...':'Busque por livros, personagens, temas ou estudos...'}"><button>Buscar</button></form>`}
function footer(slug,s){return `<footer class="section-footer"><div class="footer-grid"><div><a class="footer-brand" href="/">${icon('cross')} evangelho<span>.wiki</span></a><p>${s.footer}</p></div><blockquote>${s.quote}<cite>${s.verse}</cite></blockquote><div><h2>NAVEGAÇÃO</h2><a href="/">Início</a>${Object.entries(sections).map(([key,value])=>`<a href="/${key}">${value.name}</a>`).join('')}<a href="/${slug}/estudos">Estudos</a></div><div><h2>${slug==='atualidade'?'TEMAS PRINCIPAIS':'EXPLORAR'}</h2>${s.cards.map(c=>`<a href="${collectionLink(slug,c)}">${c[1]}</a>`).join('')}</div><div><h2>RECURSOS</h2><a href="/${slug}/recursos/dicionario-biblico">Dicionário Bíblico</a><a href="/${slug}/recursos/mapas-biblicos">Mapas Bíblicos</a><a href="/linha-do-tempo">Linha do Tempo</a><a href="/${slug}/recursos/perguntas-e-respostas">Perguntas e Respostas</a></div><div><h2>INSTITUCIONAL</h2><a href="/sobre">Sobre o evangelho.wiki</a><a href="/${slug}/institucional/contato">Contato</a><a href="/${slug}/institucional/termos-de-uso">Termos de Uso</a><a href="/${slug}/institucional/politica-de-privacidade">Política de Privacidade</a></div><div><h2 class="social-title">SIGA-NOS</h2><div class="socials">${['Facebook','Instagram','YouTube','E-mail'].map((name,i)=>`<button data-unavailable="${name}" aria-label="${name} — indisponível">${['f','◎','▷','✉'][i]}</button>`).join('')}</div></div></div><p class="copyright">✦<br>© ${new Date().getFullYear()} evangelho.wiki. Todos os direitos reservados.</p></footer>`}
function sectionMarkup(slug,s,parts){if(slug==='antigo-testamento'&&parts[1]==='livros-da-biblia'){const markup=booksMarkup(parts);if(markup)return `<div class="section-page">${markup}${footer(slug,s)}</div>`;}const selected=parts[1];const studySelected=selected==='estudos'&&parts.length>2;return `<div class="section-page ${slug}" style="--section-glow:${s.tone}"><section class="section-hero" aria-labelledby="section-title"><div class="section-art" aria-hidden="true"></div><div class="section-intro"><div class="crown" aria-hidden="true">♛</div><h1 id="section-title">${s.title}</h1><p class="section-description">${s.description}</p>${searchForm(slug)}<div class="section-actions"><a class="blue-button" href="/${slug}#colecoes">${icon('book')}${s.explore}<span>›</span></a><a class="outline-button" href="/${slug}#destaque">☆ <span>Estudos em Destaque</span> ›</a></div></div></section><div class="section-body"><section id="colecoes" class="collection-grid" tabindex="-1" aria-label="Coleções de ${s.name}">${s.cards.map(c=>`<a class="collection-card ${selected===c[0]?'selected':''}" style="--card-color:${c[4]}" href="${collectionLink(slug,c)}" ${selected===c[0]?'aria-current="page"':''}><span class="collection-icon">${icon(c[3])}</span><div><h2>${c[1]}</h2><p>${c[2]}</p></div><span class="card-arrow" aria-hidden="true">›</span></a>`).join('')}</section><section id="destaque" tabindex="-1" class="featured-study ${studySelected?'selected':''}" aria-labelledby="study-title"><div class="featured-art" aria-hidden="true"></div><div class="study-copy"><p class="eyebrow">ESTUDO EM DESTAQUE <span>──✦</span></p><h2 id="study-title">${s.study[1]}</h2><p class="study-description">${s.study[2]}</p><div class="study-actions"><a class="blue-button" href="${studyLink(slug,s)}" ${studySelected?'aria-current="page"':''}>Ler Estudo Completo <span>›</span></a><a class="all-studies" href="/${slug}/estudos">Ver todos os estudos <span>›</span></a></div></div><div class="study-topics">${s.topics.map(t=>`<a href="${studyLink(slug,s)}#${t[0]}" class="${studySelected&&location.hash==='#'+t[0]?'selected':''}">${icon(t[2])}<span>${t[1]}</span></a>`).join('')}</div></section>${parts.length>1?contentMarkup(slug,s,parts):''}</div>${footer(slug,s)}</div>`}
function unavailablePanel(title,description,returnURL,returnText,tone,eyebrow='CONTEÚDO EM PREPARAÇÃO'){return `<section id="conteudo" class="content-panel" tabindex="-1" aria-labelledby="content-title" style="--content-glow:${tone}"><p class="eyebrow">${eyebrow}</p><h2 id="content-title">${escapeHTML(title)}</h2>${description?`<p>${escapeHTML(description)}</p>`:''}<div class="empty-state"><span aria-hidden="true">${icon('book')}</span><div><h3>Conteúdo ainda indisponível</h3><p>Esta área ainda não possui conteúdo publicado. Você pode continuar explorando as outras coleções.</p></div></div><a class="blue-button" href="${returnURL}">← ${returnText}</a></section>`}
function contentMarkup(slug,s,parts){if(parts[1]==='busca')return searchResults(slug);if(parts[1]==='estudos'&&parts.length===2)return `<section id="conteudo" class="content-panel" tabindex="-1" aria-labelledby="content-title" style="--content-glow:${s.tone}"><p class="eyebrow">CATÁLOGO DE ESTUDOS · ${s.name}</p><h2 id="content-title">Estudos de ${s.name}</h2><nav class="catalog-filters" aria-label="Filtrar estudos por seção">${Object.entries(sections).map(([k,v])=>`<a href="/${k}/estudos" ${k===slug?'aria-current="page"':''}>${v.name}</a>`).join('')}</nav><a class="catalog-entry" href="${studyLink(slug,s)}"><h3>${s.study[1]}</h3><p>${s.study[2]}</p><span>Estudo completo ainda indisponível ›</span></a><a href="/${slug}" class="back-link">← Voltar ao menu de ${s.name}</a></section>`;
const card=s.cards.find(c=>c[0]===parts[1]);if(card&&parts.length===2)return unavailablePanel(card[1],card[2],`/${slug}`,`Voltar ao menu de ${s.name}`,card[4],`COLEÇÃO · ${s.name.toUpperCase()}`);
if(parts[1]==='estudos'&&parts[2]===s.study[0]&&parts.length===3){const topic=s.topics.find(t=>'#'+t[0]===location.hash);return unavailablePanel(topic?topic[1]:s.study[1],topic?`Parte do estudo “${s.study[1]}”. Este tópico ainda não foi publicado.`:s.study[2],`/${slug}#destaque`,`Voltar ao estudo em destaque`,s.tone,'ESTUDO · '+s.name.toUpperCase())}
return unavailablePanel(slugTitle(parts.at(-1)),'Ainda não há conteúdo cadastrado para este destino.',`/${slug}`,`Voltar ao menu de ${s.name}`,s.tone);}
function indexEntries(slug){return [...(!slug||slug==='antigo-testamento'?books.map(b=>({title:b.name,description:b.theme,url:bookURL(b),section:'Antigo Testamento',type:'Livro'})):[]),...Object.entries(sections).filter(([key])=>!slug||key===slug).flatMap(([key,s])=>[...s.cards.map(c=>({title:c[1],description:c[2],url:collectionLink(key,c),section:s.name,type:'Coleção'})),{title:s.study[1],description:s.study[2],url:studyLink(key,s),section:s.name,type:'Estudo'}])];}
const normalize=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function searchResults(slug){const term=new URLSearchParams(location.search).get('q')?.trim()||'';const words=normalize(term).split(/\s+/).filter(Boolean);const found=words.length?indexEntries(slug).filter(e=>words.every(word=>normalize(e.title+' '+e.description+' '+e.section).includes(word))):[];return `<section id="conteudo" class="content-panel" tabindex="-1" aria-labelledby="content-title"><p class="eyebrow">BUSCA · ${slug?sections[slug].name:'TODAS AS SEÇÕES'}</p><h2 id="content-title">${term?'Resultados para “'+escapeHTML(term)+'”':'Digite um termo para buscar'}</h2><p>A busca consulta os títulos e descrições cadastrados. Os livros do Antigo Testamento já possuem estudos; outras coleções estão em preparação.</p><p role="status">${found.length} resultado${found.length!==1?'s':''} encontrado${found.length!==1?'s':''}.</p><div class="search-results">${found.map(e=>`<a class="catalog-entry" href="${e.url}"><small>${e.type} · ${e.section}</small><h3>${e.title}</h3><p>${e.description}</p><span>Abrir resultado ›</span></a>`).join('')}</div><a class="back-link" href="${slug?'/'+slug:'/'}">← Voltar ${slug?'ao menu de '+sections[slug].name:'ao início'}</a></section>`}

const historyId=order=>`cena-${String(order).replace('.', '-')}`;
const historyConnections=[...timelineConnections,...kingdomsConnections,...genesisConnections,...exodoConnections,...pentateuchConnections,...joshuaConnections,...judgesConnections,...monarchyConnections,...divisionConnections];

function historyContext(event, hasImage){
  if(!event.context&&!event.imageCredit)return '';
  const related=kingdomsTextConnections.get(event.order)||[];
  const [photographer, photoURL, photoLicense]=event.imageCredit||[];
  const contextImages=event.contextImages||(event.contextImage?[event.contextImage]:[]);
  const rows=[
    ['Local',event.location],
    ['Período e certeza',event.certainty?[event.date,event.certainty].filter(Boolean).join(' · '):event.period||event.date],
    ['Tipo de apresentação',{thematic:'Posição temática',undated:'Data discutida',period:'Resumo de período'}[event.chronology]],
    ['Imagem',hasImage?(photographer||event.artisticContext||'Reconstrução artística.'):null],
  ];
  return `<details class="history-context">
    <summary>Contexto</summary>
    <div class="history-context-body" tabindex="0" role="region" aria-label="Contexto e fontes">
      <dl>${rows.filter(([,value])=>value).map(([term,value])=>`<dt>${term}</dt><dd>${escapeHTML(value)}</dd>`).join('')}</dl>
      ${event.context?`<p>${escapeHTML(event.context)}</p>`:''}
      ${event.route?`<h3>Itinerário esquemático</h3><ol class="history-route">${event.route.map(stop=>`<li>${escapeHTML(stop)}</li>`).join('')}</ol>`:''}
      ${event.cycle?`<h3>Padrão recorrente do relato</h3><ol class="history-route">${event.cycle.map(step=>`<li>${escapeHTML(step)}</li>`).join('')}</ol>`:''}
      ${event.riverMap?`<h3>Mapa esquemático · sem escala</h3><div class="history-river-map">
        <div><strong>Oeste</strong><ul>${event.riverMap.west.map(place=>`<li>${escapeHTML(place)}</li>`).join('')}</ul></div>
        <span>Jordão</span>
        <div><strong>Leste</strong><ul>${event.riverMap.east.map(place=>`<li>${escapeHTML(place)}</li>`).join('')}</ul></div>
      </div>`:''}
      ${event.regions?`<h3>Reinos depois da divisão · sem escala</h3><ul class="history-region-map">${event.regions.map(region=>`<li>${escapeHTML(region)}</li>`).join('')}</ul>`:''}
      ${contextImages.map(({path,caption})=>`<figure class="history-context-image">
        <img src="${escapeHTML(path)}" alt="${escapeHTML(caption)}" loading="lazy" decoding="async">
        <figcaption>${escapeHTML(caption)}${event.side==='biblical'?' · Reconstrução artística.':''}</figcaption>
      </figure>`).join('')}
      ${photoURL?`<p><a href="${escapeHTML(photoURL)}" target="_blank" rel="noopener noreferrer">Foto original</a>${photoLicense?` · <a href="${escapeHTML(photoLicense)}" target="_blank" rel="noopener noreferrer">Licença da foto</a>`:''}</p>`:''}
      ${related.length?`<h3>Conexões bíblicas</h3><ul>${related.map(([type,reference])=>`<li><strong>${escapeHTML(type)}</strong> · ${escapeHTML(reference)}</li>`).join('')}</ul>`:''}
      ${event.sources?.length?`<h3>Fontes históricas</h3><ul>${event.sources.map(([label,url])=>`<li><a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)}</a></li>`).join('')}</ul>`:''}
    </div>
  </details>`;
}

function historyScripture(passages){
  if(!passages?.length)return '';
  const {label,project,license}=pentateuchScriptureCredit;
  return `<details class="history-scripture">
    <summary>Versículos selecionados</summary>
    ${passages.map(([passage,verses])=>`<blockquote aria-label="${escapeHTML(passage)}">
      <strong>${escapeHTML(passage)}</strong>
      ${verses.map(([number,verse])=>`<p><sup>${number}</sup> ${escapeHTML(verse)}</p>`).join('')}
    </blockquote>`).join('')}
    <small>${escapeHTML(label)} <a href="${project}" target="_blank" rel="noopener noreferrer">Projeto Bíblia Livre</a> · <a href="${license}" target="_blank" rel="noopener noreferrer">CC BY 3.0 BR</a></small>
  </details>`;
}

function historyCard(event, eventsByOrder){
  const id=historyId(event.order);
  const edges=historyConnections.filter(([from,to])=>from===event.order||to===event.order);
  if(event.relatedScene && !edges.some(([from,to])=>from===event.relatedScene||to===event.relatedScene)){
    edges.push([event.order,event.relatedScene,'Cena relacionada']);
  }
  const cardLinks=edges.map(([from,to,label,description])=>{
    const target=eventsByOrder.get(from===event.order?to:from);
    return `<li><a data-history-link href="#${historyId(target.order)}">${escapeHTML(target.title)}</a>
      <span>${escapeHTML(target.credit||target.source)} · ${escapeHTML(label)}</span>
      ${description?`<p>${escapeHTML(description)}</p>`:''}</li>`;
  });
  const references=(event.concordance||[]).map(([passage,description])=>
    `<li><strong>${escapeHTML(passage)}</strong><p>${escapeHTML(description)}</p></li>`
  );
  const links=[...references,...cardLinks];
  const reference=event.source.startsWith('https:')
    ? `<a href="${escapeHTML(event.source)}" target="_blank" rel="noopener noreferrer">${escapeHTML(event.credit||'Metropolitan Museum of Art')} ↗</a>`
    : `<strong>${escapeHTML(event.source)}</strong>`;
  const date=event.chronology==='undated'||event.chronology==='narrative'||/(?:\d|século|séc\.)/i.test(event.date||'')?event.date:'';
  const hasArtwork=Boolean(event.image||event.artwork);
  const inCardDate=event.dateInCard&&event.date;
  const spiritualLabel=event.side==='biblical'&&(spiritualConflicts.has(event.order)
    ? 'Conflito espiritual'
    : spiritualEvents.has(event.order) ? 'Manifestação espiritual' : '');
  const comments=[event.subtitle,event.description,event.imageNote].filter(Boolean);
  const narrative=event.chronology==='narrative';
  const titleTag=narrative?'h3':'h2';
  return `<article id="${id}" class="history-event ${event.side}" tabindex="-1" aria-labelledby="${id}-title">
    <div class="history-event-card${hasArtwork?'':' history-text-card'}${event.genesis?' history-genesis-card':''}${event.imageCredit?' history-documentary-card':''}${spiritualLabel?' history-spiritual-card':''}${inCardDate?' history-inline-date':''}">
      <div class="history-connector">${date&&!inCardDate?`<span class="history-date">${escapeHTML(date)}</span>`:''}</div>
      ${event.section||inCardDate?`<div class="history-editorial-heading"><span class="history-classification">${escapeHTML([event.chronology==='undated'?event.date:event.section,inCardDate].filter(Boolean).join(' · '))}${event.chronology==='thematic'?' · posição temática':''}</span><h2 id="${id}-title">${escapeHTML(event.title)}</h2></div>`:`<span class="history-area">${event.side==='historical'?'História da Humanidade':'Evento bíblico'}</span><${titleTag} id="${id}-title">${escapeHTML(event.title)}</${titleTag}>`}
      ${comments.length?`<div class="history-comments"${event.genesis?'':' role="region" aria-label="Comentários" tabindex="0"'}>
        ${comments.map(comment=>`<p>${escapeHTML(comment)}</p>`).join('')}
      </div>`:''}
      ${hasArtwork?`<div class="history-artwork${event.fullArtwork?' history-artwork-full':''}${event.imageCaption?' history-artwork-captioned':''}">
        ${event.image?`<img src="${escapeHTML(event.image)}" alt="${event.imageCredit?'':escapeHTML(event.title)}" width="${event.imageWidth||1000}" height="${event.imageHeight||500}" loading="lazy" decoding="async">`:'<span class="history-artwork-pending">Ilustração em preparação</span>'}
        ${event.imageCaption?`<p class="history-artwork-caption">${escapeHTML(event.imageCaption)}</p>`:''}
      </div>`:''}
      <div class="history-reference">
        ${spiritualLabel?`<span class="history-spiritual-label">${spiritualLabel}</span>`:''}
        <small>${reference}</small>
        <a class="history-return" data-history-return hidden>Voltar à passagem de origem</a>
      </div>
      ${historyContext(event,Boolean(event.image))}
      ${links.length?`<details class="history-links"><summary><span class="history-links-label">Concordância Bíblica</span> (${links.length})</summary><ul>${links.join('')}</ul></details>`:''}
      ${historyScripture(event.scripture)}
    </div>
  </article>`;
}

function timelineMarkup(){
  const events=[...timelineImages.map(scene=>({...scene,imageHeight:563})),...timelineAdditions].map(scene=>({
    side:'biblical',...scene,
  }));
  events.push(
    {order:69,side:'historical',date:'1595 a.C.',title:'A antiga Babilônia',description:'Uma incursão hitita alcança Babilônia, marcando o fim do período paleobabilônico.',source:'https://www.metmuseum.org/ko/essays/babylon',image:'/assets/linha-do-tempo/antiga-babilonia.webp',imageWidth:1000,imageHeight:563,imageNote:'Reconstrução ilustrativa'}
  );
  const byOrder=new Map(events.map(event=>[event.order,event]));
  for(const event of kingdomsEvents){
    const previous=byOrder.get(event.order);
    const image=event.artwork
      ? kingdomsArtwork.has(event.artwork)?{image:`/assets/linha-do-tempo/${event.artwork}.webp`,imageWidth:1000,imageHeight:500}:{image:null}
      : {};
    byOrder.set(event.order,{side:'biblical',...previous,...event,...image});
  }
  for(const event of [...genesisEvents,...exodoEvents,...pentateuchEvents,...joshuaEvents,...judgesEvents,...monarchyEvents,...monarchyParallelEvents]){
    byOrder.set(event.order,{
      ...byOrder.get(event.order),
      side:'biblical', chronology:'narrative', date:'Data não estabelecida', genesis:true,
      ...event,
    });
  }
  for(const event of [...genesisHistoricalEvents,...exodoHistoricalEvents,...pentateuchHistoricalEvents,...joshuaHistoricalEvents,...judgesHistoricalEvents,...monarchyHistoricalEvents]){
    byOrder.set(event.order,{side:'historical',genesis:true,...event});
  }
  for(const event of [...divisionNarrative,...spiritualContinuityEvents,...additionalHistory]){
    byOrder.set(event.order,{side:'biblical',...event});
  }
  for(const [order,update] of divisionUpdates){
    byOrder.set(order,{...byOrder.get(order),...update});
  }
  for(const [order,artwork] of divisionArtwork){
    Object.assign(byOrder.get(order),artwork);
  }
  byOrder.get(21).sequence=13.2;
  const ordered=[...byOrder.values()].filter(event=>event.chronology!=='undated').sort((a,b)=>(a.sequence??a.order)-(b.sequence??b.order));
  const undated=kingdomsEvents.filter(event=>event.chronology==='undated').map(event=>byOrder.get(event.order));
  const undatedSection=`<section id="cronologia-incerta" class="history-undated" aria-labelledby="history-undated-title">
    <h2 id="history-undated-title">Data discutida</h2>
    <p>O livro de Joel não menciona um rei. Uma data no período persa é possível. As mensagens ficam fora da sequência datada.</p>
    <div class="history-undated-events">${undated.map(event=>historyCard(event,byOrder)).join('')}</div>
  </section>`;
  return `<div class="history-page" id="conteudo" tabindex="-1">
    <div class="history-heading"><p class="eyebrow">UMA JORNADA ATRAVÉS DAS ERAS</p><h1>Linha do Tempo</h1><p>As Escrituras e a história da humanidade ao longo do tempo.</p></div>
    <div class="history-overview">
      <div class="history-intro"><span>HISTÓRIA DA HUMANIDADE</span><span>EVENTOS BÍBLICOS</span></div>
    </div>
    <div class="history-track"><div class="history-active-line" aria-hidden="true" hidden></div>${ordered.map(event=>`${event.order===236?undatedSection:''}${event.heading?`<h2 class="history-era-heading">${escapeHTML(event.heading)}</h2>`:''}${historyCard(event,byOrder)}`).join('')}</div>
    <p class="history-end">Mais acontecimentos serão adicionados a esta jornada.</p><a class="history-back" href="/">← Voltar ao início</a>
  </div>`;
}

function updateHistoryLine(){
  const track=main.querySelector('.history-track');
  const line=track?.querySelector('.history-active-line');
  if(!line?.dataset.from)return;
  line.hidden=true;
  if(matchMedia('(max-width: 760px), (max-width: 950px) and (pointer: coarse)').matches)return;
  const nodes=[line.dataset.from,line.dataset.to].map(id=>document.getElementById(id)?.querySelector('.history-event-card'));
  if(nodes.some(node=>!node))return;
  const [a,b]=nodes.map(node=>node.getBoundingClientRect());
  const sameColumn=nodes[0].parentElement.classList.contains('biblical')===nodes[1].parentElement.classList.contains('biblical');
  const [start,end]=sameColumn
    ? [[a.right+7,a.top+27],[b.right+7,b.top+27]]
    : [[a.left<b.left?a.right:a.left,a.top+27],[a.left<b.left?b.left:b.right,b.top+27]];
  const visibleTop=parseFloat(getComputedStyle(nodes[0].parentElement).scrollMarginTop);
  if([start,end].some(([,y])=>y<visibleTop||y>innerHeight))return;
  const rect=track.getBoundingClientRect();
  const dx=end[0]-start[0],dy=end[1]-start[1];
  Object.assign(line.style,{left:`${start[0]-rect.left}px`,top:`${start[1]-rect.top}px`,width:`${Math.hypot(dx,dy)}px`,transform:`rotate(${Math.atan2(dy,dx)}rad)`});
  line.hidden=false;
}

let cleanupHistory=()=>{};

function setupHistory(){
  const overview=main.querySelector('.history-overview');
  const header=document.querySelector('body > header');
  const page=overview.parentElement;
  const updateOffsets=()=>{
    page.style.setProperty('--history-header-height',`${header.offsetHeight}px`);
    page.style.setProperty('--history-overview-height',`${overview.offsetHeight}px`);
  };
  const observer=new ResizeObserver(updateOffsets);
  observer.observe(header);
  observer.observe(overview);
  updateOffsets();
  cleanupHistory=()=>observer.disconnect();
  const track=main.querySelector('.history-track');
  track.addEventListener('keydown',event=>{
    const context=event.target.closest('.history-context[open]');
    if(event.key==='Escape'&&context){
      context.open=false;
      context.querySelector('summary').focus();
    }
  });
  for(const card of track.querySelectorAll('.history-event-card')){
    const details=card.querySelector('.history-links');
    if(!details)continue;
    const summary=details.querySelector('summary');
    const label=summary.querySelector('.history-links-label');
    let preview=false;
    label.addEventListener('pointerenter',event=>{
      if(event.pointerType!=='mouse'||details.open||!matchMedia('(min-width: 1280px) and (hover: hover)').matches)return;
      preview=true;
      details.open=true;
    });
    card.addEventListener('pointerover',event=>{
      if(event.pointerType==='mouse'&&preview&&!details.contains(event.target)){
        details.open=false;
        preview=false;
      }
    });
    card.addEventListener('pointerleave',()=>{
      if(preview&&!details.contains(document.activeElement))details.open=false;
      preview=false;
    });
    summary.addEventListener('click',event=>{
      if(preview)event.preventDefault();
      preview=false;
    });
    details.addEventListener('keydown',event=>{
      if(event.key==='Escape'){
        details.open=false;
        summary.focus();
      }
    });
  }
  track.addEventListener('click',event=>{
    const link=event.target.closest('[data-history-link],[data-history-return]');
    if(!link||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    const from=link.closest('.history-event');
    const to=document.getElementById(link.hash.slice(1));
    if(!to)return;
    const returning=link.hasAttribute('data-history-return');
    track.querySelectorAll('[data-history-return]').forEach(element=>{element.hidden=true;});
    if(!returning){
      const back=to.querySelector('[data-history-return]');
      back.href='#'+from.id;
      back.hidden=false;
    }
    const line=track.querySelector('.history-active-line');
    line.dataset.from=from.id;
    line.dataset.to=to.id;
    track.querySelector('.history-selected')?.classList.remove('history-selected');
    to.classList.add('history-selected');
    const details=link.closest('details');
    if(details)details.open=false;
    event.preventDefault();
    history.replaceState({...history.state,scrollY:window.scrollY},'');
    history.pushState(null,'',link.hash);
    const {top}=to.getBoundingClientRect();
    to.focus({preventScroll:true});
    if(top<parseFloat(getComputedStyle(to).scrollMarginTop)||top>innerHeight-120){
      to.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    }
    updateHistoryLine();
  });
}

window.addEventListener('scroll',updateHistoryLine,{passive:true});
window.addEventListener('resize',updateHistoryLine);
function render({focus=false}={}){cleanupHistory();cleanupGoldenLight();cleanupMembership();const {slug,section,parts}=current();document.body.classList.toggle('section-view',Boolean(section));document.body.classList.toggle('history-view',slug==='linha-do-tempo');document.body.classList.toggle('books-view',slug==='antigo-testamento'&&parts[1]==='livros-da-biblia');document.body.classList.toggle('utility-view',Boolean(slug&&!section));document.body.classList.toggle('member-view',slug==='associados'||slug==='administracao');document.documentElement.style.setProperty('--active-color',section?.tone||'#e8b880');document.querySelectorAll('header nav a').forEach(link=>{const active=link.pathname===(section?'/'+slug:slug?'/'+slug:'/');link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current')});if(slug==='linha-do-tempo'){main.innerHTML=timelineMarkup();setupHistory();document.title='Linha do Tempo — Evangelho.wiki';}else if(slug==='associados'||slug==='administracao'){main.innerHTML=membershipShell(slug==='administracao');document.title=(slug==='administracao'?'Administração':'Associados')+' — Evangelho.wiki';cleanupMembership=loadMembership(document.querySelector('#member-content'),location.pathname);}else if(section){main.innerHTML=sectionMarkup(slug,section,parts);document.title=`${parts.length>1?(parts[1]==='estudos'?'Estudos':parts[1]==='busca'?'Busca':section.cards.find(c=>c[0]===parts[1])?.[1]||'Conteúdo')+' · ':''}${section.name} — Evangelho.wiki`;}else if(!slug||slug==='index.html'){main.innerHTML=homeMarkup;document.title='Evangelho.wiki — Uma jornada pelas Escrituras';}else{main.innerHTML=`<div class="utility-page">${slug==='busca'?searchResults():unavailablePanel(slugTitle(slug),'Esta área ainda não possui informações cadastradas.','/','Voltar ao início','#e8b880')}</div>`;document.title=`${slugTitle(slug)} — Evangelho.wiki`;}
if(document.querySelector('.book-study-heading'))document.title=`${document.querySelector('#content-title').textContent} · Livros do Antigo Testamento — Evangelho.wiki`;
cleanupGoldenLight = setupGoldenLight(document.querySelector('.hero'));
if(focus&&document.querySelector('#member-title'))document.querySelector('#member-title').focus({preventScroll:true});
const search=document.querySelector('#search');if(search)search.value=new URLSearchParams(location.search).get('q')||'';
const navigation=document.querySelector('header nav');const activeLink=navigation.querySelector('[aria-current]');if(activeLink&&navigation.scrollWidth>navigation.clientWidth){navigation.scrollLeft+=activeLink.getBoundingClientRect().left-navigation.getBoundingClientRect().left-navigation.clientWidth/2+activeLink.offsetWidth/2;}
if(focus){const target=document.querySelector(location.hash&&document.getElementById(location.hash.slice(1))?'#'+CSS.escape(location.hash.slice(1)):parts.length>1||slug&&!section?'#conteudo':section?'#section-title':'#hero-title');if(target){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});if(target.id==='section-title'||target.id==='hero-title')window.scrollTo({top:0,behavior:'instant'});else target.scrollIntoView({block:'start',behavior:'instant'})}}}
function navigate(url){
 history.replaceState({...history.state,scrollY:window.scrollY},'');
 if(location.pathname===booksBase){try{sessionStorage.setItem('books-position',String(window.scrollY));}catch{}}
 history.pushState(null,'',url);render({focus:true});
}
document.addEventListener('click',event=>{const unavailable=event.target.closest('[data-unavailable]');if(unavailable){notice(unavailable.dataset.unavailable,'Este recurso ainda não está disponível no projeto.');return}const link=event.target.closest('a[href]');if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.target||link.hasAttribute('download'))return;const url=new URL(link.href,location.href);if(url.origin!==location.origin)return;event.preventDefault();if(url.pathname===location.pathname&&url.search===location.search&&url.hash&&document.getElementById(url.hash.slice(1))){history.pushState(null,'',url);const target=document.getElementById(url.hash.slice(1));target.setAttribute('tabindex','-1');target.focus({preventScroll:true});target.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}else {const restore=link.hasAttribute('data-books-return');navigate(url);if(restore){try{const y=sessionStorage.getItem('books-position');if(y!==null)window.scrollTo({top:Number(y),behavior:'instant'});}catch{}}}});
document.addEventListener('submit',event=>{if(event.target.id!=='search-form')return;event.preventDefault();const term=new FormData(event.target).get('q')?.trim();if(!term)return;const {slug,section}=current();navigate(`${section?'/'+slug:''}/busca?q=${encodeURIComponent(term)}`)});
document.querySelector('#focus-search').addEventListener('click',()=>{let search=document.querySelector('#search');if(!search){const {slug,section}=current();navigate(section?'/'+slug:'/');search=document.querySelector('#search')}search?.focus();search?.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})});
document.querySelector('#close-notice').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
document.querySelector('#theme').addEventListener('click',()=>notice('Tema','As páginas usam os temas apresentados nas referências. A troca de tema ainda não está integrada.'));
window.addEventListener('popstate',()=>{render({focus:true});if(Number.isFinite(history.state?.scrollY))window.scrollTo({top:history.state.scrollY,behavior:'instant'});});
window.addEventListener('hashchange',()=>{if(!document.body.classList.contains('books-view'))render({focus:true});});

setupMembership({navigate});
render({focus:current().parts.length>1||Boolean(location.hash)});
