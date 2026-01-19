document.addEventListener("DOMContentLoaded", () => {

  const starEl = document.getElementById("star-count");
  const navButtons = document.querySelectorAll(".nav button");
  const rooms = document.querySelectorAll(".room");

  const bed = document.querySelector(".bed");
  const wardrobe = document.querySelector(".wardrobe");
  const foods = document.querySelectorAll(".food");

  let stars = 0;
  let dressOn = false;

  // =====================
  // QUEST STATE
  // =====================
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

  function getActiveRoom() {
    return document.querySelector(".room.active");
  }

  function getChild(room = getActiveRoom()) {
    return room?.querySelector(".person img");
  }

  function jump(child) {
    if (!child) return;
    child.classList.add("jump");
    setTimeout(() => child.classList.remove("jump"), 300);
  }

  function switchRoom(name) {
    rooms.forEach(r => r.classList.remove("active"));
    document.querySelector(`.${name}`)?.classList.add("active");
  }

  // =====================
  // QUEST HELPER
  // =====================
  function showMessage(text) {
    alert(text); // sederhana & aman untuk anak
  }

  // =====================
  // NAVIGATION
  // =====================
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.area;
      const current = getActiveRoom()?.classList[1];

      // Cegah sekolah kalau belum siap
      if (target === "school" && !quest.wakeUp) {
        showMessage("Syabil harus bangun dulu 🛏️");
        return;
      }

      if (target === "school" && !quest.eat) {
        showMessage("Syabil harus makan dulu 🍎");
        return;
      }

      switchRoom(target);
    });
  });

  // =====================
  // 🛏️ BANGUN TIDUR
  // =====================
  bed?.addEventListener("click", () => {
    switchRoom("bedroom");

    setTimeout(() => {
      const child = getChild();
      quest.wakeUp = true;
      addStar(1);
      jump(child);
      showMessage("Syabil bangun tidur 😊");
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
      jump(child);
    }, 100);
  });

  // =====================
  // 🍎 MAKAN
  // =====================
  foods.forEach(food => {
    food.addEventListener("click", () => {
      if (!quest.wakeUp) {
        showMessage("Syabil harus bangun dulu 🛏️");
        return;
      }

      switchRoom("kitchen");

      setTimeout(() => {
        const child = getChild();
        quest.eat = true;
        addStar(1);
        jump(child);
        showMessage("Syabil sudah makan 🍎");
      }, 100);
    });
  });

  // =====================
  // 🏫 MASUK SEKOLAH
  // =====================
  navButtons.forEach(btn => {
    if (btn.dataset.area === "school") {
      btn.addEventListener("click", () => {
        if (quest.wakeUp && quest.eat && !quest.school) {
          quest.school = true;
          addStar(2);
          showMessage("Syabil siap sekolah! 🏫🎒");
        }
      });
    }
  });

});
