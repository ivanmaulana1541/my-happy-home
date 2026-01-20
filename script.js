document.addEventListener("DOMContentLoaded", () => {

  const rooms = document.querySelectorAll(".room");
  const navButtons = document.querySelectorAll(".nav button");
  const wardrobe = document.querySelector(".wardrobe");
  const food = document.querySelector(".food");
  const door = document.querySelector(".door");
  const feedbackEl = document.getElementById("feedback");
  const questItems = document.querySelectorAll("#quest-list li");
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

  /* SYABIL STATE */
  const syabil = {
    clothes: false,
    eaten: false,
    school: false,
    home: false
  };

  /* INTERACTIONS */
  wardrobe.addEventListener("click", () => {
    syabil.clothes = true;
    questItems[0].textContent = "✅ Ganti baju sekolah";
    childImg.src = "./assets/child-dress.png";
    showFeedback("Syabil siap sekolah 🎒");
  });

  food.addEventListener("click", () => {
    syabil.eaten = true;
    questItems[1].textContent = "✅ Makan pagi";
    showFeedback("Syabil kenyang 🍽️");
  });

  door.addEventListener("click", () => {
    syabil.home = true;
    questItems[3].textContent = "✅ Pulang ke rumah";
    showFeedback("Syabil sudah di rumah 🏠");
  });

  /* NAV LOCKING */
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.area;

      if (target === "kitchen" && !syabil.clothes) {
        showFeedback("Ganti baju dulu 👕");
        return;
      }

      if (target === "school" && !syabil.eaten) {
        showFeedback("Makan dulu 🍽️");
        return;
      }

      if (target === "home" && !syabil.school) {
        syabil.school = true;
        questItems[2].textContent = "✅ Berangkat sekolah";
      }

      if (target === "bedroom" && !syabil.home) {
        showFeedback("Masuk rumah dulu 🚪");
        return;
      }

      switchRoom(target);
    });
  });

});
