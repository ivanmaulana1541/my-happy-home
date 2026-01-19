document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "my-happy-home-save";

  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
    stars: 0,
    outfitIndex: 0
  };

  let stars = savedData.stars;
  let outfitIndex = savedData.outfitIndex;
  let isSleeping = false;

  // 👧 outfit hanya untuk ANAK
  const childOutfits = ["👧", "👧🏻", "👧🏽"];

  const starCountEl = document.getElementById("star-count");

  const bedroom = document.querySelector(".bedroom");
  const kitchen = document.querySelector(".kitchen");

  const bedEl = document.querySelector(".bed");
  const wardrobeEl = document.querySelector(".wardrobe");
  const foodEls = document.querySelectorAll(".food");

  const btnBedroom = document.getElementById("btn-bedroom");
  const btnKitchen = document.getElementById("btn-kitchen");

  const bedroomChild = document.querySelector(".bedroom .child");

  const fatherEl = document.querySelector(".father");
  const motherEl = document.querySelector(".mother");
  const kitchenChild = document.querySelector(".kitchen .child");

  function saveGame() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ stars, outfitIndex })
    );
  }

  function updateStars() {
    starCountEl.textContent = stars;
  }

  function showRoom(room) {
    bedroom.classList.remove("active");
    kitchen.classList.remove("active");
    room.classList.add("active");
  }

  function updateChild() {
    const outfit = childOutfits[outfitIndex];
    bedroomChild.textContent = outfit;
    kitchenChild.textContent = outfit;
  }

  function sleepAction() {
    if (isSleeping) return;

    isSleeping = true;
    stars++;
    updateStars();
    saveGame();

    bedroomChild.textContent = "😴";

    setTimeout(() => {
      updateChild();
      isSleeping = false;
    }, 2000);
  }

  function changeClothes() {
    outfitIndex = (outfitIndex + 1) % childOutfits.length;
    updateChild();
    stars++;
    updateStars();
    saveGame();
  }

  function eatFood() {
    stars++;
    updateStars();
    saveGame();

    fatherEl.textContent = "😋";
    motherEl.textContent = "😋";
    kitchenChild.textContent = "😋";

    setTimeout(() => {
      fatherEl.textContent = "👨";
      motherEl.textContent = "👩";
      updateChild();
    }, 1000);
  }

  bedEl.addEventListener("pointerdown", sleepAction);
  wardrobeEl.addEventListener("pointerdown", changeClothes);
  foodEls.forEach(food => food.addEventListener("pointerdown", eatFood));

  btnBedroom.addEventListener("click", () => showRoom(bedroom));
  btnKitchen.addEventListener("click", () => showRoom(kitchen));

  updateStars();
  updateChild();
  showRoom(bedroom);

  console.log("Family roles fixed 👨‍👩‍👧");
});
