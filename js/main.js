
let currentLang = localStorage.getItem('tempera_lang') || null;
function detectBrowserLang(){
  try{
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if(urlLang && TRANSLATIONS[urlLang]) return urlLang;
    if(currentLang) return currentLang;
    const nav = (navigator.language || navigator.userLanguage || 'id').toLowerCase();
    if(nav.startsWith('ms') || nav.includes('my')) return 'ms';
    if(nav.startsWith('en')) return 'en';
    return 'id';
  }catch(e){ return 'id'; }
}
currentLang = detectBrowserLang();

function applyLanguage(lang){currentLang=lang;localStorage.setItem('tempera_lang',lang);const dict=TRANSLATIONS[lang];document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.getAttribute('data-i18n');if(dict[k])el.innerText=dict[k];});const flagMap={id:'🇮🇩',en:'🇬🇧',ms:'🇲🇾'};const labelMap={id:'ID',en:'EN',ms:'MY'};const flagEl=document.getElementById('currentLangFlag'); const langEl=document.getElementById('currentLang'); if(flagEl) flagEl.innerText=flagMap[lang]; if(langEl) langEl.innerText=labelMap[lang];document.querySelectorAll('#langMenu [data-lang]').forEach(b=>{const c=b.querySelector('.check');if(b.dataset.lang===lang){b.style.background='var(--bg-section-alt)';if(c)c.classList.remove('hidden')}else{b.style.background='transparent';if(c)c.classList.add('hidden')}});document.documentElement.lang=lang;}
function changeLanguage(lang){applyLanguage(lang);document.getElementById('langMenu').classList.add('hidden');}
function toggleMobileMenu(e){if(e)e.stopPropagation();const m=document.getElementById('mobileMenu');if(m)m.classList.toggle('hidden');}
function closeMobileMenu(){document.getElementById('mobileMenu')?.classList.add('hidden');}
function handlePesanSekarang(e){if(e)e.preventDefault();document.getElementById('pesan').scrollIntoView({behavior:'smooth'});}
window.addEventListener('click',()=>{document.getElementById('langMenu')?.classList.add('hidden');document.getElementById('themeMenu')?.classList.add('hidden');document.getElementById('mobileMenu')?.classList.add('hidden');});
window.addEventListener('DOMContentLoaded',()=>{
  // LOCK tema classic luxury permanen, jangan auto ganti
  setTheme('classic',false);
  userManuallyChangedTheme = false;
  introPhase = false;
  applyLanguage(currentLang); renderArmada(); calculateLive();
  const today=new Date().toISOString().split('T')[0]; const el=document.getElementById('formTanggal'); if(el){el.min=today; el.value=today;}
  const yearEl=document.getElementById('footerYear'); if(yearEl) yearEl.innerText=new Date().getFullYear();
  toggleAccordion('lembang'); fetchWeather(); setInterval(fetchWeather,600000);
});

function openWaLightbox(src){const lb=document.getElementById('waLightbox');const img=document.getElementById('waLightboxImg');if(lb&&img){img.src=src;lb.classList.remove('hidden');document.body.style.overflow='hidden';}}
function closeWaLightbox(){const lb=document.getElementById('waLightbox');if(lb){lb.classList.add('hidden');document.body.style.overflow='';}}
