document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // STATE
  // ===============================
  let stars = 0;
  let isSleeping = false;
  let outfitIndex = 0;

  const outfits = ["👧", "👧🏻", "👧🏽"]; // variasi baju / look

  // ===============================
  // ELEMENTS
  // ===============================
  const starCountEl = document.getElementById("star-count");
  const bedEl = document.querySelector(".bed");
  const wardrobeEl = document.querySelector(".wardrobe");
  const girlEl = document.querySelector(".girl");

  // ===============================
  // FUNCTIONS
  // ===============================
  function updateStars() {
    starCountEl.textContent = stars;
  }

  function sleepAction() {
    if (isSleeping) return;

    isSleeping = true;
    stars++;
    updateStars();

    girlEl.textContent = "😴";
    girlEl.style.transform = "scale(0.9)";

    setTimeout(() => {
      girlEl.textContent = outfits[outfitIndex];
      girlEl.style.transform = "scale(1)";
      isSleeping = false;
    }, 2000);
  }

  function changeClothes() {
    outfitIndex = (outfitIndex + 1) % outfits.length;
    girlEl.textContent = outfits[outfitIndex];

    stars++;
    updateStars();

    // cute feedback
    girlEl.style.transform = "scale(1.1)";
    setTimeout(() => {
      girlEl.style.transform = "scale(1)";
    }, 300);
  }

  // ===============================
  // EVENTS
  // ===============================
  bedEl.addEventListener("pointerdown", sleepAction);
  wardrobeEl.addEventListener("pointerdown", changeClothes);

  // ===============================
  // INIT
  // ===============================
  updateStars();
  girlEl.textContent = outfits[outfitIndex];

  console.log("Dress-up system ready 👗");
});
