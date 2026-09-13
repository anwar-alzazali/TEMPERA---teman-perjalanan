/* driver.js - Tempera Driver Logic - Anti Hapus Branding + Tracking + Gampang Ganti Foto */
const DRIVER_DATA = {
  id: 'budi',
  name: 'Budi Trans Bandung',
  wa: '6281234567890',
  harga: 650000,
  foto: 'assets/avanza-black-gold.jpg', // default dari induk
  deskripsi: 'Driver asli Bandung 10 tahun, hafal jalan tikus Lembang & Ciwidey. Mobil bersih, no rokok.',
  expired: null // null = aktif, isi tanggal kalau mau auto-cut
};

// ARMADA dari web induk - dipinjam dulu, bisa diganti driver nanti
const ARMADA_INDUK = [
  {id:'avanza', name:'Avanza / Xenia New', img:'assets/avanza-black-gold.jpg', cap:'5 Nyaman', price:650000, badge:'Paling Laris'},
  {id:'innova', name:'Innova Reborn', img:'assets/innova-black-gold.jpg', cap:'6 Nyaman', price:950000, badge:'Best Seller'},
  {id:'hiace', name:'Hiace Premio', img:'assets/hiace-black-gold.jpg', cap:'11 Nyaman', price:1600000, badge:'Premium'},
  {id:'calya', name:'Calya Sigra', img:'assets/calya-black-gold.jpg', cap:'4 Nyaman', price:550000, badge:'Ekonomis'}
];

let currentLang = 'id';
const TRANSLATIONS_MINI = {
  id:{book_title:'Booking {name}', book_sub:'Form super simple - langsung WA driver', label_tgl:'Tanggal Jalan *', label_tujuan:'Mau Kemana? *', label_jemput:'Jemput Dimana?', btn_wa:'Chat WA {name}', footer_powered:'Powered by'},
  ms:{book_title:'Tempahan {name}', book_sub:'Borang ringkas - terus WA driver', label_tgl:'Tarikh Jalan *', label_tujuan:'Mahu Ke Mana? *', label_jemput:'Jemput Di Mana?', btn_wa:'Chat WA {name}', footer_powered:'Dikuasakan oleh'},
  en:{book_title:'Book {name}', book_sub:'Simple form - direct WA driver', label_tgl:'Travel Date *', label_tujuan:'Where to? *', label_jemput:'Pickup at?', btn_wa:'Chat WA {name}', footer_powered:'Powered by'}
};

function detectLang(){
  const nav = (navigator.language||'id').toLowerCase();
  if(nav.startsWith('ms')||nav.includes('my')) return 'ms';
  if(nav.startsWith('en')) return 'en';
  return 'id';
}

function applyLang(){
  const dict = TRANSLATIONS_MINI[currentLang];
  document.querySelectorAll('[data-i18n-mini]').forEach(el=>{
    let key = el.getAttribute('data-i18n-mini');
    let txt = dict[key]||key;
    txt = txt.replace('{name}', DRIVER_DATA.name);
    el.innerText = txt;
  });
}

function loadDriverFromStorage(){
  try{
    const saved = localStorage.getItem('tempera_driver_'+DRIVER_DATA.id);
    if(saved){
      const data = JSON.parse(saved);
      Object.assign(DRIVER_DATA, data);
      console.log('Load driver dari localStorage', DRIVER_DATA);
    }
  }catch(e){}
}

function renderDriver(){
  document.getElementById('driverName').innerText = DRIVER_DATA.name;
  document.getElementById('driverName2').innerText = DRIVER_DATA.name;
  document.getElementById('driverDesc').innerText = DRIVER_DATA.deskripsi;
  document.getElementById('driverPrice').innerText = `Rp ${Number(DRIVER_DATA.harga).toLocaleString('id-ID')} / hari`;
  document.getElementById('driverFoto').src = DRIVER_DATA.foto;
  document.getElementById('driverFotoThumb').src = DRIVER_DATA.foto;
  document.getElementById('driverWA').innerText = DRIVER_DATA.wa;
  // render armada
  const grid = document.getElementById('armadaGrid');
  grid.innerHTML = ARMADA_INDUK.map(a=>`
    <div class="theme-card rounded-[20px] overflow-hidden p-3">
      <img src="../${a.img}" onerror="this.src='https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400'" class="armada-img" alt="${a.name}">
      <div class="p-3">
        <span class="text-[9px] bg-amber-100 text-amber-700 px-2 py-1 rounded-full">${a.badge}</span>
        <h4 class="font-bold text-sm mt-2">${a.name}</h4>
        <p class="text-[11px] text-gray-400">${a.cap} • Rp ${a.price.toLocaleString('id-ID')}/hari</p>
        <p class="text-[9px] text-gray-500 mt-1">📸 Foto dari induk Tempera (bisa diganti driver)</p>
      </div>
    </div>
  `).join('');
}

function injectTemperaBranding(){
  const footer = document.getElementById('tempera-footer');
  if(!footer) return;
  const lang = currentLang;
  const powered = TRANSLATIONS_MINI[lang].footer_powered;
  footer.innerHTML = `
    <div class="text-center py-4 px-4 bg-[#0F0F0F] border-t border-white/10">
      <p class="text-[11px] text-zinc-400">${powered} <a href="../index.html" class="font-bold text-[#E5B80B]">TEMPERA</a> - Jaringan Teman Perjalanan Aman Bandung</p>
      <p class="text-[9px] text-zinc-600 mt-1">Driver ${DRIVER_DATA.name} adalah Partner Resmi Tempera • ID: ${DRIVER_DATA.id} • <span id="trackingInfo"></span></p>
      <span data-tempera-id="official-branding" style="display:none">tempera-lock-${DRIVER_DATA.id}</span>
    </div>
  `;
  // update tracking info
  const clicks = localStorage.getItem('tempera_clicks_'+DRIVER_DATA.id) || 0;
  const el = document.getElementById('trackingInfo');
  if(el) el.innerText = `${clicks} klik WA bulan ini`;
}

// Anti-hapus - cek tiap 3 detik
function startBrandingGuard(){
  injectTemperaBranding();
  setInterval(()=>{
    if(!document.querySelector('[data-tempera-id="official-branding"]')){
      console.warn('Branding dihapus, balikin!');
      injectTemperaBranding();
    }
  },3000);
}

function trackWAClick(){
  let clicks = parseInt(localStorage.getItem('tempera_clicks_'+DRIVER_DATA.id)||'0')+1;
  localStorage.setItem('tempera_clicks_'+DRIVER_DATA.id, clicks);
  // simulasi kirim ke Supabase (nanti ganti fetch)
  console.log(`Tracking: ${DRIVER_DATA.id} klik WA ke ${clicks}`);
  // Simpan log order (untuk cek Budi paling laku)
  let logs = JSON.parse(localStorage.getItem('tempera_logs')||'[]');
  logs.push({driver:DRIVER_DATA.id, time:new Date().toISOString(), tgl:document.getElementById('formTanggal')?.value||'', tujuan:document.getElementById('formTujuan')?.value||''});
  localStorage.setItem('tempera_logs', JSON.stringify(logs));
  injectTemperaBranding();
}

function handleBooking(e){
  e.preventDefault();
  trackWAClick();
  const tgl = document.getElementById('formTanggal').value;
  const tujuan = document.getElementById('formTujuan').value;
  const jemput = document.getElementById('formJemput').value;
  if(!tgl||!tujuan){ alert('Isi tanggal & tujuan dulu ya'); return; }
  const msg = `Halo ${DRIVER_DATA.name}, saya dari ${location.href} mau booking:%0A📅 Tanggal: ${tgl}%0A📍 Tujuan: ${tujuan}%0A🏠 Jemput: ${jemput}%0A%0AInfo harga: ${DRIVER_DATA.harga}/hari%0AArmada: ${ARMADA_INDUK[0].name}`;
  const waLink = `https://wa.me/${DRIVER_DATA.wa}?text=${msg}`;
  window.open(waLink,'_blank');
}

// Gampang ganti foto - kayak ganti profil WA
function handleFotoChange(input){
  if(input.files && input.files[0]){
    const reader = new FileReader();
    reader.onload = function(ev){
      DRIVER_DATA.foto = ev.target.result; // base64, nanti upload ke Supabase Storage
      localStorage.setItem('tempera_driver_'+DRIVER_DATA.id, JSON.stringify(DRIVER_DATA));
      renderDriver();
      injectTemperaBranding();
      alert('Foto keganti! (kesimpen di HP, nanti kalau sudah konek Supabase kesimpen permanen)');
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function handleEditDriver(){
  const nama = prompt('Nama Web Kamu:', DRIVER_DATA.name);
  if(nama) DRIVER_DATA.name = nama;
  const wa = prompt('No WA (62...):', DRIVER_DATA.wa);
  if(wa) DRIVER_DATA.wa = wa;
  const harga = prompt('Harga per hari (angka):', DRIVER_DATA.harga);
  if(harga) DRIVER_DATA.harga = parseInt(harga);
  localStorage.setItem('tempera_driver_'+DRIVER_DATA.id, JSON.stringify(DRIVER_DATA));
  renderDriver();
  injectTemperaBranding();
}

document.addEventListener('DOMContentLoaded',()=>{
  currentLang = detectLang();
  loadDriverFromStorage();
  renderDriver();
  applyLang();
  startBrandingGuard();
  const today = new Date().toISOString().split('T')[0];
  const el = document.getElementById('formTanggal');
  if(el){ el.min = today; el.value = today; }
  document.getElementById('footerYear').innerText = new Date().getFullYear();
  // show logs for admin testing
  const logs = JSON.parse(localStorage.getItem('tempera_logs')||'[]');
  const myLogs = logs.filter(l=>l.driver===DRIVER_DATA.id);
  document.getElementById('adminLogs').innerText = `Log WA bulan ini: ${myLogs.length} klik - Data tracking untuk cek siapa paling laku (Budi vs Asep)`;
});
