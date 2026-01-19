document.addEventListener("DOMContentLoaded", () => {
  let stars = 0;
  let isSleeping = false;

  const starCountEl = document.getElementById("star-count");
  const bedEl = document.querySelector(".bed");
  const girlEl = document.querySelector(".girl");

  console.log("Script loaded ✅");
  console.log("Bed element:", bedEl);

  function updateStars() {
    starCountEl.textContent = stars;
  }

  function sleepAction() {
    console.log("Bed clicked 🛏️");

    if (isSleeping) return;

    isSleeping = true;
    stars += 1;
    updateStars();

    girlEl.textContent = "😴";

    setTimeout(() => {
      girlEl.textContent = "👧";
      isSleeping = false;
    }, 2000);
  }

  if (bedEl) {
    bedEl.addEventListener("pointerdown", sleepAction);
  } else {
    console.error("❌ Bed element not found");
  }

  updateStars();
});
