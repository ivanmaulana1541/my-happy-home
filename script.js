document.addEventListener("DOMContentLoaded", () => {

  // =====================
  // ELEMENTS
  // =====================
  const starEl = document.getElementById("star-count");
  const navButtons = document.querySelectorAll(".nav button");
  const rooms = document.querySelectorAll(".room");

  const bed = document.querySelector(".bed");
  const wardrobe = document.querySelector(".wardrobe");
  const foods = document.querySelectorAll(".food");

  const btnQuest = document.getElementById("btn-quest");
  const questPanel = document.getElementById("quest-panel");

  const qWake = document.getElementById("q-wakeup");
  const qEat = document.getElementById("q-eat");
  const qSchool = document.getElementById("q-school");

  // =====================
  // STATE
  // =====================
  let stars = 0;
  let dressOn = false;

  const quest = {
    wakeUp: false,
    eat: false,
    school: false
  };

  // =====================
  // UTIL
  // =====================
  function addStar(n = 1) {
    stars += n;
    starEl.textContent = stars;
  }

  function switchRoom(name) {
    rooms.forEach(r => r.classList.remove("active"));
    document.querySelector(`.${name}`)?.classList.add("active");
  }

  function getChild() {
    return document.querySelector(".room.active .person img");
  }

  function jump() {
    const child = getChild();
    if (!child) return;
    child.classList.add("jump");
    setTimeout(() => child.classList.remove("jump"), 300);
  }

  // =====================
  // QUEST UI + ANIMATION
  // =====================
  function sparkle(el) {
    const star = document.createElement("span");
    star.textContent = "✨";
    star.style.position = "absolute";
    star.style.right = "-10px";
    star.style.top = "0";
    star.style.opacity = "1";
    star.style.transition = "all 0.6s ease";
    el.appendChild(star);

    setTimeout(() => {
      star.style.top = "-20px";
      star.style.opacity = "0";
    }, 50);

    setTimeout(() => star.remove(), 700);
  }

  function markDone(el) {
    if (!el.classList.contains("done")) {
      el.classList.add("done");
      sparkle(el);
    }
  }

  function updateQuestUI() {
    if (quest.wakeUp) markDone(qWake);
    if (quest.eat) markDone(qEat);
    if (quest.school) markDone(qSchool);
  }

  // =====================
  // QUEST PANEL TOGGLE
  // =====================
  btnQuest.addEventListener("click", () => {
    questPanel.classList.toggle("hidden");
  });

  // =====================
  // NAVIGATION
  // =====================
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.area;

      // Cegah sekolah kalau quest belum siap
      if (target === "school" && !quest.wakeUp) return;
      if (target === "school" && !quest.eat) return;

      switchRoom(target);

      // Masuk sekolah = quest selesai
      if (target === "school" && !quest.school) {
        quest.school = true;
        addStar(2);
        updateQuestUI();
      }
    });
  });

  // =====================
  // 🛏️ BANGUN TIDUR
  // =====================
  bed?.addEventListener("click", () => {
    switchRoom("bedroom");
    setTimeout(() => {
      quest.wakeUp = true;
      addStar(1);
      jump();
      updateQuestUI();
    }, 100);
  });

  // =====================
  // 👗 GANTI BAJU (OPSIONAL)
  // =====================
  wardrobe?.addEventListener("click", () => {
    switchRoom("bedroom");
    setTimeout(() => {
      const child = getChild();
      dressOn = !dressOn;
      child.src = dressOn
        ? "./assets/child-dress.png"
        : "./assets/child.png";
      addStar(1);
      jump();
    }, 100);
  });

  // =====================
  // 🍎 MAKAN
  // =====================
  foods.forEach(food => {
    food.addEventListener("click", () => {
      if (!quest.wakeUp) return;

      switchRoom("kitchen");
      setTimeout(() => {
        quest.eat = true;
        addStar(1);
        jump();
        updateQuestUI();
      }, 100);
    });
  });

});
