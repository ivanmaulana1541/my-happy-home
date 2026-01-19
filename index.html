document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     ELEMENTS
  ===================== */
  const rooms = document.querySelectorAll(".room");
  const navButtons = document.querySelectorAll(".nav button");
  const mapLocations = document.querySelectorAll(".map-location");

  const starEl = document.getElementById("star-count");
  const btnQuest = document.getElementById("btn-quest");
  const questPanel = document.getElementById("quest-panel");

  const qWake = document.getElementById("q-wakeup");
  const qEat = document.getElementById("q-eat");
  const qSchool = document.getElementById("q-school");

  const bed = document.querySelector(".bed");
  const wardrobe = document.querySelector(".wardrobe");
  const foods = document.querySelectorAll(".food");

  /* =====================
     STATE
  ===================== */
  let stars = 0;
  let dressOn = false;

  const quest = {
    syabilWake: false,
    syabilEat: false,
    syabilSchool: false,
    papaEat: false,
    mamaEat: false
  };

  /* =====================
     BASIC UTIL
  ===================== */
  function switchRoom(name) {
    rooms.forEach(r => r.classList.remove("active"));
    document.querySelector(`.${name}`)?.classList.add("active");
  }

  function addStar(n = 1) {
    stars += n;
    starEl.textContent = stars;
  }

  function getChild() {
    return document.querySelector(".room.active .child img");
  }

  function jump() {
    const child = getChild();
    if (!child) return;
    child.classList.add("jump");
    setTimeout(() => child.classList.remove("jump"), 300);
  }

  /* =====================
     QUEST PANEL
  ===================== */
  btnQuest?.addEventListener("click", () => {
    questPanel.classList.toggle("hidden");
  });

  function updateQuestUI() {
    if (quest.syabilWake) qWake?.classList.add("done");
    if (quest.syabilEat) qEat?.classList.add("done");
    if (quest.syabilSchool) qSchool?.classList.add("done");
  }

  /* =====================
     GAME ACTIONS
  ===================== */

  bed?.addEventListener("click", () => {
    quest.syabilWake = true;
    addStar();
    jump();
    updateQuestUI();
    updateMapState();
  });

  foods.forEach(food => {
    food.addEventListener("click", () => {
      if (!quest.syabilWake) return;
      quest.syabilEat = true;
      quest.papaEat = true;
      quest.mamaEat = true;
      addStar();
      jump();
      updateQuestUI();
      updateMapState();
    });
  });

  wardrobe?.addEventListener("click", () => {
    const child = getChild();
    if (!child) return;
    dressOn = !dressOn;
    child.src = dressOn ? "./assets/child-dress.png" : "./assets/child.png";
    addStar();
  });

  /* =====================
     MAP LOCK + HIGHLIGHT
  ===================== */
  function updateMapState() {
    mapLocations.forEach(loc => {
      const target = loc.dataset.target;
      loc.classList.remove("locked", "active-quest");

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

    // Highlight priority
    if (!quest.syabilEat) {
      document.querySelector(".map-location.school")?.classList.add("active-quest");
    } else if (!quest.papaEat) {
      document.querySelector(".map-location.office")?.classList.add("active-quest");
    } else if (!quest.mamaEat) {
      document.querySelector(".map-location.market")?.classList.add("active-quest");
    }
  }

  /* =====================
     MAP CLICK
  ===================== */
  mapLocations.forEach(loc => {
    loc.addEventListener("click", () => {
      if (loc.classList.contains("locked")) return;
      switchRoom(loc.dataset.target);
    });
  });

  /* =====================
     NAV
  ===================== */
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      switchRoom(btn.dataset.area);
    });
  });

  /* =====================
     INIT
  ===================== */
  updateQuestUI();
  updateMapState();

});
