let userManuallyChangedTheme=false;let introPhase=true;
function isNightNow(){return false;}
function themeByTime(){return 'classic';}
function setTheme(themeKey,forceBlack){
  const theme=THEMES[themeKey]||THEMES.classic;
  document.documentElement.setAttribute('data-theme',themeKey);
  localStorage.setItem('tempera_theme',themeKey);
  const iconEl=document.getElementById('currentThemeIcon');
  const nameEl=document.getElementById('currentThemeName');
  if(iconEl)iconEl.innerText=theme.icon;
  if(nameEl)nameEl.innerText=theme.name;
  document.querySelectorAll('.theme-option').forEach(btn=>{
    if(btn.dataset.themeBtn===themeKey){btn.style.background='var(--bg-section-alt)';btn.style.borderColor='var(--border-color)';}
    else{btn.style.background='transparent';btn.style.borderColor='transparent';}
  });
  if(forceBlack===true)document.documentElement.classList.add('is-night');
  else if(forceBlack===false)document.documentElement.classList.remove('is-night');
  else{if(isNightNow())document.documentElement.classList.add('is-night');else document.documentElement.classList.remove('is-night');}
  const file=LOGO_MAP[themeKey]||LOGO_MAP.classic;
  const ml=document.getElementById('mainLogo'); if(ml) ml.src=file;
  const fl=document.getElementById('footerLogo'); if(fl) fl.src=file;
  document.getElementById('themeMenu')?.classList.add('hidden');
  if(window.lastWeatherIsDay!==undefined){applyWeatherThemeAdaptive(window.lastWeatherIsDay,window.lastWeatherCode||0);}
}
function setThemeManual(k){userManuallyChangedTheme=true;introPhase=false;setTheme(k,null);}
function toggleThemeMenu(e){e.stopPropagation();document.getElementById('themeMenu').classList.toggle('hidden');document.getElementById('langMenu').classList.add('hidden');}
function toggleDropdown(e){e.stopPropagation();document.getElementById('langMenu').classList.toggle('hidden');document.getElementById('themeMenu').classList.add('hidden');}
