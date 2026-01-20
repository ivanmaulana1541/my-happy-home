document.addEventListener("DOMContentLoaded", () => {

  const rooms = document.querySelectorAll(".room");
  const navButtons = document.querySelectorAll(".nav button");
  const wardrobe = document.querySelector(".wardrobe");
  const food = document.querySelector(".food");
  const feedbackEl = document.getElementById("feedback");
  const questItems = document.querySelectorAll("#quest-list li");
  const childImg = document.getElementById("child-img");

  /* =====================
     FEEDBACK
  ===================== */
  let feedbackTimeout = null;

  function showFeedback(text) {
    feedbackEl.textContent = text;
    feedbackEl.classList.remove("hidden");

    if (feedbackTimeout) clearTimeout(feedbackTimeout);
    feedbackTimeout = setTimeout(() => {
      feedbackEl.classList.add("hidden");
    }, 2000);
  }

  /* =====================
     ROOM SWITCH
  ===================== */
  function switchRoom(name) {
    rooms.forEach(r => r.classList.remove("active"));
    document.querySelector(`.${name}`)?.classList.add("active");
  }

  /* =====================
     SYABIL STATE (STEP 1 A)
  ===================== */
  const syabil = {
    outfit: "home",
    hasChangedClothes: false,
    hasEaten: false,
    hasGoneSchool: false,
    hasReturnedHome: false
  };

  /* =====================
     INTERACTIONS
  ===================== */

  // GANTI BAJU SEKOLAH
  wardrobe.addEventListener("click", () => {
    const inBedroom = document.querySelector(".room.bedroom.active");
    if (!inBedroom) {
      showFeedback("Syabil harus di kamar untuk ganti baju 👕");
      return;
    }

    syabil.outfit = "school";
    syabil.hasChangedClothes = true;
    childImg.src = "./assets/child-dress.png";
    questItems[0].textContent = "✅ Ganti baju sekolah";
    showFeedback("Syabil sudah pakai baju sekolah 🎒");
  });

  // MAKAN
  food.addEventListener("click", () => {
    syabil.hasEaten = true;
    questItems[1].textContent = "✅ Makan pagi";
    showFeedback("Syabil sudah makan 🍽️");
  });

  /* =====================
     NAV (BELUM DIKUNCI)
  ===================== */
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      switchRoom(btn.dataset.area);
    });
  });

});
