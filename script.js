document.addEventListener("DOMContentLoaded", () => {

  const rooms = document.querySelectorAll(".room");
  const navButtons = document.querySelectorAll(".nav button");
  const mapLocations = document.querySelectorAll(".map-location");

  // =====================
  // STATE QUEST (SIMULASI)
  // nanti sambungkan ke quest asli kamu
  // =====================
  const quest = {
    syabilEat: false,
    papaEat: false,
    mamaEat: false
  };

  function switchRoom(name) {
    rooms.forEach(r => r.classList.remove("active"));
    document.querySelector(`.${name}`)?.classList.add("active");
  }

  // =====================
  // UPDATE LOCK MAP
  // =====================
  function updateMapLock() {
    mapLocations.forEach(loc => {
      const target = loc.dataset.target;
      loc.classList.remove("locked");

      if (target === "school" && !quest.syabilEat) {
        loc.classList.add("locked");
      }

      if (target === "office" && !quest.papaEat) {
        loc.classList.add("locked");
      }

      if (target === "market" && !quest.mamaEat) {
        loc.classList.add("locked");
      }
    });
  }

  // =====================
  // MAP CLICK
  // =====================
  mapLocations.forEach(loc => {
    loc.addEventListener("click", () => {
      if (loc.classList.contains("locked")) return;
      switchRoom(loc.dataset.target);
    });
  });

  // =====================
  // NAV BUTTON
  // =====================
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      switchRoom(btn.dataset.area);
    });
  });

  // =====================
  // INIT
  // =====================
  updateMapLock();

  // 🔧 TESTING CEPAT (BOLEH HAPUS NANTI)
  // buka satu-satu buat lihat efek lock
  // quest.syabilEat = true;
  // quest.papaEat = true;
  // quest.mamaEat = true;
  // updateMapLock();

});
