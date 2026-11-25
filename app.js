const translations={ar:{eyebrow:'أدوات تستحق مكانًا على جهازك',title:'صندوق التطبيقات',lead:'مجموعة مختارة من التطبيقات للعمل والإبداع وكل ما بينهما. اكتشف ما يناسبك وحمّله من مصدره الرسمي.',browse:'استكشف المجموعة',collection:'كل الأدوات',search:'ابحث عن تطبيق...',platform:'النظام',allPlatforms:'كل الأنظمة',empty:'ما لقينا تطبيقات تطابق بحثك.',footer:'روابط مباشرة إلى المصادر الرسمية.',download:'التحميل',details:'التفاصيل',website:'الموقع الرسمي',all:'الكل',utility:'أدوات',creative:'إبداع',media:'وسائط',productivity:'إنتاجية',games:'ألعاب',ai:'ذكاء اصطناعي',communication:'تواصل',development:'تطوير',count:'تطبيق',close:'إغلاق'},en:{eyebrow:'Good tools deserve a place on your device',title:'The app toolbox',lead:'A collection of apps for work, creativity, and everything in between. Find what fits and download it from the official source.',browse:'Explore the collection',collection:'All tools',search:'Search for an app...',platform:'Platform',allPlatforms:'All platforms',empty:'No apps match your search.',footer:'Links lead to official sources.',download:'Download',details:'Details',website:'Official website',all:'All',utility:'Utilities',creative:'Creative',media:'Media',productivity:'Productivity',games:'Games',ai:'AI',communication:'Communication',development:'Development',count:'apps',close:'Close'}};
const iconSources = {
  'WhatsApp': 'https://cdn.simpleicons.org/whatsapp/25D366',
  'Ubisoft Connect': 'https://cdn.jsdelivr.net/gh/AdmiringWorm/chocolatey-packages@c83e5c78e07916aca67a4eabb48fc5b81f17cef7/automatic/ubisoft-connect/icons/128x128.png',
  'EA app': 'https://cdn.simpleicons.org/ea/FF474C',
  'Epic Games Store': 'https://cdn.simpleicons.org/epicgames/FFFFFF',
  'DaVinci Resolve': 'assets/davinci-resolve.png',
  'Everything': 'https://cdn.jsdelivr.net/gh/chocolatey-community/chocolatey-packages@cf277846cf6b5436461ebd5f21b00efd67ee9910/icons/everything.png',
  'Revo Uninstaller': 'https://cdn.jsdelivr.net/gh/asheroto/ChocolateyPackages@master/revo-uninstaller/icon.png',
  'HandBrake': 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons@main/svg/handbrake.svg',
  'Screenbox': 'https://raw.githubusercontent.com/huynhsontung/Screenbox/main/Screenbox/Assets/Square150x150Logo.scale-400.png',
  'Obsidian': 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons@main/svg/obsidian.svg',
  'Stremio': 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons@main/svg/stremio.svg'
};
const noDescription = new Set(['WhatsApp','Telegram','Discord','ChatGPT','Claude','Google Antigravity','Gemini','Steam','Epic Games Store','GOG GALAXY','EA app','Ubisoft Connect','Battle.net','Xbox app']);
let language=localStorage.getItem('toolbox-language')==='en'?'en':'ar';let category='all';
const $=selector=>document.querySelector(selector);const categories=['all','utility','creative','media','productivity','games','ai','communication','development'];
function t(key){return translations[language][key]}
function render(){document.documentElement.lang=language;document.documentElement.dir=language==='ar'?'rtl':'ltr';document.querySelectorAll('[data-i18n]').forEach(el=>el.innerHTML=t(el.dataset.i18n));$('#language').textContent=language==='ar'?'English':'العربية';$('#language').lang=language==='ar'?'en':'ar';$('#search').placeholder=t('search');$('#search').setAttribute('aria-label',t('search'));$('#close').setAttribute('aria-label',t('close'));$('#categories').setAttribute('aria-label',language==='ar'?'التصنيفات':'Categories');$('#categories').innerHTML=categories.map(c=>`<button type="button" class="category" data-category="${c}" aria-pressed="${category===c}">${t(c)}</button>`).join('');const query=$('#search').value.trim().toLocaleLowerCase();const platform=$('#platform').value;const results=apps.filter(a=>(category==='all'||a.category===category)&&(platform==='all'||a.platforms.includes(platform))&&[a.name,a.ar,a.en,t(a.category)].some(v=>v.toLocaleLowerCase().includes(query)));$('#count').textContent=`${results.length} ${t('count')}`;$('#empty').hidden=results.length!==0;$('#apps').innerHTML=results.map(a=>`<article class="app-card" data-card="${a.name}"><div class="card-visual"><img class="app-icon" loading="lazy" src="${iconSources[a.name] || 'https://www.google.com/s2/favicons?domain=' + a.domain + '&sz=128'}" alt="" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span class="fallback-icon" hidden>${a.name[0]}</span></div><div class="card-body"><h3 class="card-title"><bdi dir="ltr">${a.name}</bdi></h3>${noDescription.has(a.name) ? '' : `<p class="card-description">${a[language]}</p>`}<div class="platforms">${a.platforms.map(p=>`<span>${p}</span>`).join('')}</div><div class="card-actions"><a class="download" href="${a.url}" target="_blank" rel="noopener noreferrer">${t('download')}</a>${a.page?`<a class="details-link" href="${a.page}">${t('details')}</a>`:`<button class="details-link" data-app="${a.name}" type="button">${t('details')}</button>`}</div></div></article>`).join('')}

function openDetails(a) {
  const lines = appDetails[a.name]?.[language === 'ar' ? 0 : 1] || [a[language]];
  $('#dialog-body').innerHTML = `<h2 class="dialog-title"><bdi dir="ltr">${a.name}</bdi></h2><ul class="feature-list">${lines.map(line => `<li>${line}</li>`).join('')}</ul><div class="platforms">${a.platforms.map(p => `<span>${p}</span>`).join('')}</div><div class="dialog-actions"><a class="download" target="_blank" rel="noopener noreferrer" href="${a.url}">${t('download')}</a><a target="_blank" rel="noopener noreferrer" href="${a.name === 'Screenbox' ? 'https://github.com/huynhsontung/Screenbox' : 'https://' + a.domain}">${t('website')}</a></div>`;
  $('#details').showModal();
}
$('#language').addEventListener('click',()=>{language=language==='ar'?'en':'ar';localStorage.setItem('toolbox-language',language);render()});
$('#search').addEventListener('input',render);
$('#platform').addEventListener('change',render);
$('#categories').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(b){category=b.dataset.category;render()}});
$('#apps').addEventListener('click',e=>{
  if(e.target.closest('a')) return;
  const card=e.target.closest('[data-card]');
  if(!card) return;
  const app=apps.find(a=>a.name===card.dataset.card);
  if(app.page) { window.location.href=app.page; return; }
  openDetails(app);
});
$('#close').addEventListener('click',()=>$('#details').close());
$('#details').addEventListener('click',e=>{
  if(e.target!==e.currentTarget) return;
  const r=e.currentTarget.getBoundingClientRect();
  if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) e.currentTarget.close();
});
render();
