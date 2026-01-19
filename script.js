document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "my-happy-home-save";

  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
    stars: 0
  };

  let stars = savedData.stars;

  const starCountEl = document.getElementById("star-count");

  const bedroom = document.querySelector(".bedroom");
  const kitchen = document.querySelector(".kitchen");

  const bedEl = document.querySelector(".bed");
  const wardrobeEl = document.querySelector(".wardrobe");
  const foodEls = document.querySelectorAll(".food");

  const btnBedroom = document.getElementById("btn-bedroom");
  const btnKitchen = document.getElementById("btn-kitchen");

  const childImgs = document.querySelectorAll(".child img");
  const fatherImg = document.querySelector(".father img");
  const motherImg = document.querySelector(".mother img");

  function saveGame() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ stars })
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

  function sleepAction() {
    stars++;
    updateStars();
    saveGame();

    childImgs.forEach(img => img.style.transform = "scale(0.9)");
    setTimeout(() => {
      childImgs.forEach(img => img.style.transform = "scale(1)");
    }, 800);
  }

  function eatFood() {
    stars++;
    updateStars();
    saveGame();

    [fatherImg, motherImg, ...childImgs].forEach(img => {
      img.style.transform = "scale(1.1)";
    });

    setTimeout(() => {
      [fatherImg, motherImg, ...childImgs].forEach(img => {
        img.style.transform = "scale(1)";
      });
    }, 800);
  }

  bedEl.addEventListener("pointerdown", sleepAction);
  foodEls.forEach(food => food.addEventListener("pointerdown", eatFood));

  btnBedroom.addEventListener("click", () => showRoom(bedroom));
  btnKitchen.addEventListener("click", () => showRoom(kitchen));

  updateStars();
  showRoom(bedroom);

  console.log("Characters upgraded to full body 👨‍👩‍👧");
});
