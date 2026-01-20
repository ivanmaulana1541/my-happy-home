document.addEventListener("DOMContentLoaded", () => {

  const rooms = document.querySelectorAll(".room");
  const navButtons = document.querySelectorAll(".nav button");
  const wardrobe = document.querySelector(".wardrobe");
  const food = document.querySelector(".food");
  const door = document.querySelector(".door");
  const feedbackEl = document.getElementById("feedback");

  const childImg = document.getElementById("child-img");
  const fatherImg = document.getElementById("father-img");
  const motherImg = document.getElementById("mother-img");

  function showFeedback(text) {
    feedbackEl.textContent = text;
    feedbackEl.classList.remove("hidden");
    setTimeout(() => feedbackEl.classList.add("hidden"), 2000);
  }

  function switchRoom(name) {
    rooms.forEach(r => r.classList.remove("active"));
    document.querySelector(`.${name}`).classList.add("active");
  }

  const syabil = { school:false, dufan:false };
  const papa   = { office:false, dufan:false };
  const mama   = { yoga:false, market:false, dufan:false };

  wardrobe.addEventListener("click", () => {
    syabil.dufan = true;
    papa.dufan = true;
    mama.dufan = true;
    showFeedback("Semua siap ke Dufan 🎢");
  });

  food.addEventListener("click", () => {
    showFeedback("Keluarga sudah makan 🍽️");
  });

  door.addEventListener("click", () => {
    showFeedback("Keluarga berkumpul di rumah 🏠");
  });

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const t = btn.dataset.area;

      if (t === "yogaroom") {
        mama.yoga = true;
        showFeedback("Mama yoga 🧘");
      }

      if (t === "office") {
        papa.office = true;
        showFeedback("Papa kerja 💼");
      }

      if (t === "market") {
        if (!mama.yoga) {
          showFeedback("Mama harus yoga dulu 🧘");
          return;
        }
        mama.market = true;
      }

      if (t === "dufanroom") {
        if (!(syabil.dufan && papa.dufan && mama.dufan)) {
          showFeedback("Semua harus siap dulu 🎒");
          return;
        }
        showFeedback("Yeay! Dufan! 🎉");
      }

      switchRoom(t);
    });
  });

});
