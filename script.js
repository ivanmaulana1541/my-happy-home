document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     ELEMENTS
  ===================== */
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

  /* =====================
     STATE
  ===================== */
  let stars = 0;
  let dressOn = false;

  const quest = {
    child: {
      wakeUp: false,
      eat: false,
      school: false
    },
    father: {
      eat: false,
      office: false
    }
  };

  /* =====================
     UTIL
  ===================== */
  function addStar(n = 1) {
    stars += n;
    starEl.textContent = stars;
  }

  function switchRoom(name) {
    rooms.forEach(r => r.classList.remove("active"));
    document.querySelector(`.${name}`)?.classList.add("active");
  }

  function getChild() {
    return document.querySelector(".room.active .person.child img");
  }

  function jumpChild() {
    const child = getChild();
    if (!child) return;
    child.classList.add("jump");
    setTimeout(() => child.classList.remove("jump"), 300);
  }

  function markDone(el) {
    if (!el.classList.contains("done")) {
      el.classList.add("done");
    }
  }

  /* =====================
     QUEST PANEL
  ===================== */
  btnQuest.addEventListener("click", () => {
    questPanel.classList.toggle("hidden");
  });

  /* =====================
     NAVIGATION
  ===================== */
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.area;

      // 🔒 Gate: Father ke Office harus makan dulu
      if (target === "office" && !quest.father.eat) return;

      // 🔒 Child ke School harus bangun & makan
      if (target === "school" && (!quest.child.wakeUp || !quest.child.eat)) return;

      switchRoom(target);

      // ✅ Masuk sekolah (Child)
      if (target === "school" && !quest.child.school) {
        quest.child.school = true;
        addStar(2);
        markDone(qSchool);
      }

      // ✅ Masuk kantor (Father)
      if (target === "office" && !quest.father.office) {
        quest.father.office = true;
        addStar(2);
      }
    });
  });

  /* =====================
     🛏️ CHILD: BANGUN TIDUR
  ===================== */
  bed?.addEventListener("click", () => {
    switchRoom("bedroom");
    setTimeout(() => {
      quest.child.wakeUp = true;
      addStar(1);
      markDone(qWake);
      jumpChild();
    }, 100);
  });

  /* =====================
     👗 CHILD: GANTI BAJU
  ===================== */
  wardrobe?.addEventListener("click", () => {
    switchRoom("bedroom");
    setTimeout(() => {
      const child = getChild();
      dressOn = !dressOn;
      child.src = dressOn
        ? "./assets/child-dress.png"
        : "./assets/child.png";
      addStar(1);
      jumpChild();
    }, 100);
  });

  /* =====================
     🍎 MAKAN (CHILD & FATHER)
  ===================== */
  foods.forEach(food => {
    food.addEventListener("click", () => {
      switchRoom("kitchen");
      setTimeout(() => {

        // Child makan
        if (!quest.child.eat) {
          quest.child.eat = true;
          addStar(1);
          markDone(qEat);
          jumpChild();
        }

        // Father makan
        if (!quest.father.eat) {
          quest.father.eat = true;
          addStar(1);
        }

      }, 100);
    });
  });

});
