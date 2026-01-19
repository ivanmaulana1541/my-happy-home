document.addEventListener("DOMContentLoaded", () => {

  const starCountEl = document.getElementById("star-count");
  const navButtons = document.querySelectorAll(".nav button");
  const rooms = document.querySelectorAll(".room");

  const bed = document.querySelector(".bed");
  const wardrobe = document.querySelector(".wardrobe");
  const foods = document.querySelectorAll(".food");

  const walkLeftBtn = document.getElementById("walk-left");
  const walkRightBtn = document.getElementById("walk-right");

  let stars = 0;
  let dressOn = false;

  // ======================
  // HELPERS
  // ======================
  function getActiveChild() {
    return document.querySelector(".room.active .person img");
  }

  function addStar() {
    stars++;
    starCountEl.textContent = stars;
  }

  function jump(child) {
    child.classList.add("jump");
    setTimeout(() => child.classList.remove("jump"), 300);
  }

  // ======================
  // NAVIGATION
  // ======================
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const area = btn.dataset.area;
      rooms.forEach(r => r.classList.remove("active"));
      document.querySelector(`.${area}`).classList.add("active");
    });
  });

  // ======================
  // BED
  // ======================
  bed?.addEventListener("click", () => {
    const child = getActiveChild();
    if (!child) return;
    addStar();
    jump(child);
  });

  // ======================
  // DRESS
  // ======================
  wardrobe?.addEventListener("click", () => {
    const child = getActiveChild();
    if (!child) return;

    addStar();
    child.src = dressOn
      ? "./assets/child.png"
      : "./assets/child-dress.png";

    dressOn = !dressOn;
    jump(child);
  });

  // ======================
  // FOOD
  // ======================
  foods.forEach(food => {
    food.addEventListener("click", () => {
      const child = getActiveChild();
      if (!child) return;
      addStar();
      jump(child);
    });
  });

  // ======================
  // WALK
  // ======================
  walkLeftBtn.addEventListener("click", () => {
    const child = getActiveChild();
    if (!child) return;
    child.classList.remove("walk-right");
    child.classList.add("walk-left");
  });

  walkRightBtn.addEventListener("click", () => {
    const child = getActiveChild();
    if (!child) return;
    child.classList.remove("walk-left");
    child.classList.add("walk-right");
  });

});
