document.addEventListener("DOMContentLoaded", () => {

  const rooms = document.querySelectorAll(".room");
  const navButtons = document.querySelectorAll(".nav button");
  const mapLocations = document.querySelectorAll(".map-location");

  // =====================
  // STATE QUEST (CONTOH)
  // sambungkan nanti ke quest asli
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
  // UPDATE LOCK
  // =====================
  function updateMapLock() {
    mapLocations.forEach(loc => {
      loc.classList.remove("locked");

      const target = loc.dataset.target;
      if (target === "school" && !quest.syabilEat) loc.classList.add("locked");
      if (target === "office" && !quest.papaEat) loc.classList.add("locked");
      if (target === "market" && !quest.mamaEat) loc.classList.add("locked");
    });
  }

  // =====================
  // UPDATE QUEST HIGHLIGHT
  // =====================
  function updateQuestHighlight() {
    mapLocations.forEach(loc => loc.classList.remove("active-quest"));

    if (!quest.syabilEat) {
      document.querySelector('.map-location.school')?.classList.add("active-quest");
      return;
    }

    if (!quest.papaEat) {
      document.querySelector('.map-location.office')?.classList.add("active-quest");
      return;
    }

    if (!quest.mamaEat) {
      document.querySelector('.map-location.market')?.classList.add("active-quest");
    }
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
  updateQuestHighlight();

  // 🔧 TESTING MANUAL (BOLEH KOMEN/HAPUS)
  // quest.syabilEat = true;
  // updateMapLock(); updateQuestHighlight();

});
