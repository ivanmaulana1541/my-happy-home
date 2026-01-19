document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // GAME STATE
  // ===============================
  let stars = 0;
  let isSleeping = false;

  // ===============================
  // ELEMENTS
  // ===============================
  const starCountEl = document.getElementById("star-count");
  const bedEl = document.querySelector(".bed");
  const girlEl = document.querySelector(".girl");

  console.log("Elements:", { bedEl, girlEl, starCountEl });

  // ===============================
  // FUNCTIONS
  // ===============================
  function updateStars() {
    starCountEl.textContent = stars;
  }

  function sleepAction() {
    console.log("Bed clicked 🛏️");

    if (isSleeping) return;

    isSleeping = true;
    stars += 1;
    updateStars();

    // Girl sleeps
    girlEl.textContent = "😴";
    girlEl.style.transform = "scale(0.9)";

    setTimeout(() => {
      girlEl.textContent = "👧";
      girlEl.style.transform = "scale(1)";
      isSleeping = false;
    }, 2000);
  }

  // ===============================
  // EVENTS (POINTER = MOUSE + TOUCH)
  // ===============================
  bedEl.addEventListener("pointerdown", sleepAction);

  // ===============================
  // INIT
  // ===============================
  updateStars();
  console.log("Sleep system ready ⭐");
});
