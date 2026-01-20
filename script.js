document.addEventListener("DOMContentLoaded", () => {

  const rooms = document.querySelectorAll(".room");
  const navButtons = document.querySelectorAll(".nav button");
  const wardrobe = document.querySelector(".wardrobe");
  const food = document.querySelector(".food");
  const door = document.querySelector(".door");
  const feedbackEl = document.getElementById("feedback");
  const childImg = document.getElementById("child-img");

  /* FEEDBACK */
  let feedbackTimeout = null;
  function showFeedback(text) {
    feedbackEl.textContent = text;
    feedbackEl.classList.remove("hidden");
    if (feedbackTimeout) clearTimeout(feedbackTimeout);
    feedbackTimeout = setTimeout(() => {
      feedbackEl.classList.add("hidden");
    }, 2000);
  }

  /* ROOM SWITCH */
  function switchRoom(name) {
    rooms.forEach(r => r.classList.remove("active"));
    document.querySelector(`.${name}`).classList.add("active");
  }

  /* STATES */
  const syabil = { clothes:false, eaten:false, school:false };
  const papa   = { eaten:false, office:false };
  const mama   = { eaten:false, market:false };

  /* INTERACTIONS */
  wardrobe.addEventListener("click", () => {
    syabil.clothes = true;
    childImg.src = "./assets/child-dress.png";
    showFeedback("Syabil ganti baju sekolah 🎒");
  });

  food.addEventListener("click", () => {
    syabil.eaten = true;
    papa.eaten = true;
    mama.eaten = true;
    showFeedback("Semua sudah makan 🍽️");
  });

  door.addEventListener("click", () => {
    showFeedback("Keluarga sudah di rumah 🏠");
  });

  /* NAV LOCK */
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const t = btn.dataset.area;

      if (t === "kitchen" && !syabil.clothes) {
        showFeedback("Syabil belum ganti baju 👕");
        return;
      }

      if (t === "school" && !syabil.eaten) {
        showFeedback("Syabil belum makan 🍽️");
        return;
      }

      if (t === "office") {
        if (!papa.eaten) {
          showFeedback("Papa belum makan ☕");
          return;
        }
        papa.office = true;
      }

      if (t === "market") {
        if (!mama.eaten) {
          showFeedback("Mama belum makan 🛒");
          return;
        }
        mama.market = true;
      }

      switchRoom(t);
    });
  });

});
