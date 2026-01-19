document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // STATE
  // ===============================
  let stars = 0;
  let outfitIndex = 0;
  let isSleeping = false;

  const outfits = ["👧", "👧🏻", "👧🏽"];

  // ===============================
  // ELEMENTS
  // ===============================
  const starCountEl = document.getElementById("star-count");

  const bedroom = document.querySelector(".bedroom");
  const kitchen = document.querySelector(".kitchen");

  const bedEl = document.querySelector(".bed");
  const wardrobeEl = document.querySelector(".wardrobe");
  const foodEls = document.querySelectorAll(".food");

  const girls = document.querySelectorAll(".girl");

  const btnBedroom = document.getElementById("btn-bedroom");
  const btnKitchen = document.getElementById("btn-kitchen");

  // ===============================
  // FUNCTIONS
  // ===============================
  function updateStars() {
    starCountEl.textContent = stars;
  }

  function showRoom(room) {
    bedroom.classList.remove("active");
    kitchen.classList.remove("active");
    room.classList.add("active");
  }

  function updateGirls() {
    girls.forEach(girl => {
      girl.textContent = outfits[outfitIndex];
    });
  }

  function sleepAction() {
    if (isSleeping) return;

    isSleeping = true;
    stars++;
    updateStars();

    girls.forEach(g => g.textContent = "😴");

    setTimeout(() => {
      updateGirls();
      isSleeping = false;
    }, 2000);
  }

  function changeClothes() {
    outfitIndex = (outfitIndex + 1) % outfits.length;
    updateGirls();
    stars++;
    updateStars();
  }

  function eatFood() {
    stars++;
    updateStars();

    girls.forEach(girl => {
      girl.textContent = "😋";
      girl.style.transform = "scale(1.1)";
    });

    setTimeout(() => {
      updateGirls();
      girls.forEach(g => g.style.transform = "scale(1)");
    }, 1000);
  }

  // ===============================
  // EVENTS
  // ===============================
  bedEl.addEventListener("pointerdown", sleepAction);
  wardrobeEl.addEventListener("pointerdown", changeClothes);

  foodEls.forEach(food => {
    food.addEventListener("pointerdown", eatFood);
  });

  btnBedroom.addEventListener("click", () => showRoom(bedroom));
  btnKitchen.addEventListener("click", () => showRoom(kitchen));

  // ===============================
  // INIT
  // ===============================
  updateStars();
  updateGirls();
  showRoom(bedroom);

  console.log("Kitchen system ready 🍽️");
});
