document.addEventListener("DOMContentLoaded", () => {
  // 1. FITUR TOGGLE TEMA (DARK / LIGHT MODE)
  const themeToggleBtn = document.getElementById("theme-toggle");
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark");
      
      // Ubah ikon bulan / matahari
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

  // 2. FITUR FORM PEMESANAN & KALKULATOR
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

  // 3. FITUR CUACA BANDUNG LIVE
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
    } catch (err) {}
  }

  fetchWeather();
  calculateTotal();
});
