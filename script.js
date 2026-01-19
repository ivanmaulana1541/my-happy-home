// ============================
// MY HAPPY HOME - SCRIPT
// ============================

document.addEventListener("DOMContentLoaded", () => {
  console.log("My Happy Home ready");

  // ELEMENTS
  const starCountEl = document.getElementById("star-count");
  const btnBedroom = document.getElementById("btn-bedroom");
  const btnKitchen = document.getElementById("btn-kitchen");

  const bedroom = document.querySelector(".bedroom");
  const kitchen = document.querySelector(".kitchen");

  const child = document.getElementById("child");
  const foods = document.querySelectorAll(".food");

  let stars = 0;

  // ============================
  // NAVIGATION
  // ============================
  btnBedroom.addEventListener("click", () => {
    bedroom.classList.add("active");
    kitchen.classList.remove("active");
  });

  btnKitchen.addEventListener("click", () => {
    kitchen.classList.add("active");
    bedroom.classList.remove("active");
  });

  // ============================
  // STAR SYSTEM
  // ============================
  function addStar(amount = 1) {
    stars += amount;
    starCountEl.textContent = stars;
  }

  // ============================
  // ANIMATION
  // ============================
  function jumpChild() {
    if (!child) return;
    child.classList.add("jump");
    setTimeout(() => {
      child.classList.remove("jump");
    }, 400);
  }

  // ============================
  // FOOD CLICK
  // ============================
  foods.forEach(food => {
    food.addEventListener("click", () => {
      addStar(1);
      jumpChild();
    });
  });
});
