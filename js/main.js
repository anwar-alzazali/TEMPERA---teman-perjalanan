document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. DATA ARMADA & RENDER DINAMIS
  // ==========================================
  const ARMADA_DATA = [
    { id: 'calya', name: 'Toyota Calya / Sigra', badge: 'Ekonomis • 4 Nyaman', image: 'calya.jpg', capacityNum: 4, capacityMax: 6, baggage: '2 koper kabin kecil', price: 550000 },
    { id: 'avanza', name: 'Toyota Avanza / Xenia New', badge: 'Paling Laris • 5 Nyaman', image: 'avanza.jpg', capacityNum: 5, capacityMax: 6, baggage: '1 besar + 2 kecil', price: 650000 },
    { id: 'xpander', name: 'Mitsubishi Xpander', badge: 'MPV Nyaman • 6 Nyaman', image: 'xpander.jpg', capacityNum: 6, capacityMax: 7, baggage: '1 besar + 2 kecil', price: 800000 },
    { id: 'innova', name: 'Toyota Innova Reborn', badge: 'Best Seller • 6 Nyaman', image: 'innova.jpg', capacityNum: 6, capacityMax: 7, baggage: '2 besar + 2 kecil', price: 950000 },
    { id: 'hiace', name: 'Toyota Hiace Premio', badge: 'Premium • 11 Nyaman', image: 'hiace.jpg', capacityNum: 11, capacityMax: 14, baggage: '8-10 koper besar', price: 1600000 }
  ];

  function renderArmada() {
    const cardsContainer = document.getElementById('armada-cards');
    const tableBody = document.getElementById('armada-harga-body');

    if (cardsContainer) {
      cardsContainer.innerHTML = ARMADA_DATA.map(car => `
        <div class="bg-white dark:bg-slate-800 rounded-xl shadow border border-gray-100 dark:border-slate-700 p-4 flex flex-col justify-between transition-colors">
          <div>
            <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">${car.badge}</span>
            <h3 class="font-bold text-gray-800 dark:text-gray-100 mt-2">${car.name}</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1"><i class="fa-solid fa-user-group text-indigo-500 mr-1"></i> Max ${car.capacityMax} Orang</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5"><i class="fa-solid fa-suitcase text-indigo-500 mr-1"></i> ${car.baggage}</p>
          </div>
          <div class="mt-4 pt-3 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between">
            <span class="text-xs text-gray-500 dark:text-gray-400">Mulai dari</span>
            <span class="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">Rp ${car.price.toLocaleString('id-ID')}</span>
          </div>
        </div>
      `).join('');
    }

    if (tableBody) {
      tableBody.innerHTML = ARMADA_DATA.map(car => `
        <tr class="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition">
          <td class="py-3 px-4 font-semibold text-gray-800 dark:text-gray-200">${car.name}</td>
          <td class="py-3 px-4 text-center dark:text-gray-300">${car.capacityNum} / ${car.capacityMax} Orang</td>
          <td class="py-3 px-4 text-gray-600 dark:text-gray-400">${car.baggage}</td>
          <td class="py-3 px-4 text-right font-bold text-indigo-600 dark:text-indigo-400">Rp ${car.price.toLocaleString('id-ID')}</td>
        </tr>
      `).join('');
    }
  }

  // ==========================================
  // 2. FITUR TOGGLE TEMA (DARK / LIGHT MODE)
  // ==========================================
  const themeToggleBtn = document.getElementById("theme-toggle");
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark");
      
      const icon = themeToggleBtn.querySelector("i");
      if (icon) {
        if (document.documentElement.classList.contains("dark")) {
          icon.className = "fa-solid fa-sun text-yellow-400";
        } else {
          icon.className = "fa-solid fa-moon text-yellow-400";
        }
      }
    });
  }

  // ==========================================
  // 3. FITUR FORM PEMESANAN & KALKULATOR
  // ==========================================
  const destinationSelect = document.getElementById("destination");
  const vehicleTypeSelect = document.getElementById("vehicleType");
  const passengersInput = document.getElementById("passengers");
  const totalPriceEl = document.getElementById("totalPrice");
  const bookingForm = document.getElementById("bookingForm");

  const baseRates = { regular: 80000, private: 350000, hiace: 900000 };
  const areaSurcharges = { "Bandung Kota": 0, "Lembang": 25000, "Ciwidey": 50000, "Pangalengan": 50000 };

  function calculateTotal() {
    if (!vehicleTypeSelect || !totalPriceEl) return;
    const vehicle = vehicleTypeSelect.value;
    const dest = destinationSelect ? destinationSelect.value : "Bandung Kota";
    const passengers = parseInt(passengersInput ? passengersInput.value : 1) || 1;

    let base = baseRates[vehicle] || 80000;
    let surcharge = areaSurcharges[dest] || 0;
    let total = (vehicle === "regular") ? (base + surcharge) * passengers : base + surcharge;

    totalPriceEl.textContent = `Rp ${total.toLocaleString("id-ID")}`;
  }

  if (destinationSelect) destinationSelect.addEventListener("change", calculateTotal);
  if (vehicleTypeSelect) vehicleTypeSelect.addEventListener("change", calculateTotal);
  if (passengersInput) passengersInput.addEventListener("input", calculateTotal);

  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const pickup = document.getElementById("pickup") ? document.getElementById("pickup").value : "-";
      const destination = destinationSelect.value;
      const passengers = passengersInput.value;
      const vehicle = vehicleTypeSelect.options[vehicleTypeSelect.selectedIndex].text;
      const total = totalPriceEl.textContent;

      const phoneNumber = "085174352575";
      const text = `Halo, saya ingin memesan travel TEMPERA:\n\n` +
        `*Jemput:* ${pickup}\n` +
        `*Tujuan:* ${destination}\n` +
        `*Armada:* ${vehicle}\n` +
        `*Penumpang:* ${passengers} Orang\n` +
        `*Total Biaya:* ${total}\n\nMohon konfirmasinya!`;

      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, "_blank");
    });
  }

  // ==========================================
  // 4. FITUR CUACA BANDUNG LIVE
  // ==========================================
  async function fetchWeather() {
    try {
      const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-6.9175&longitude=107.6191&current_weather=true");
      const data = await res.json();
      if (data.current_weather) {
        const tempEl = document.getElementById("weather-temp");
        const descEl = document.getElementById("weather-desc");
        if (tempEl) tempEl.textContent = `${Math.round(data.current_weather.temperature)}°C`;
        if (descEl) descEl.textContent = "Bandung Hari Ini";
      }
    } catch (err) {
      console.error("Gagal mengambil data cuaca:", err);
    }
  }

  // Inisialisasi awal saat dokumen selesai dimuat
  renderArmada();
  fetchWeather();
  calculateTotal();
});
