document.addEventListener("DOMContentLoaded", () => {

  const starCountEl = document.getElementById("star-count");
  const navButtons = document.querySelectorAll(".nav button");
  const rooms = document.querySelectorAll(".room");

  const bed = document.querySelector(".bed");
  const wardrobe = document.querySelector(".wardrobe");
  const foods = document.querySelectorAll(".food");

  let stars = 0;
  let dressOn = false;
  let isMovingArea = false;

  // =====================
  // HELPERS
  // =====================
  function getActiveChild() {
    return document.querySelector(".room.active .person img");
  }

  function addStar() {
    stars++;
    starCountEl.textContent = stars;
  }

  function jump(child) {
    if (!child) return;
    child.classList.add("jump");
    setTimeout(() => child.classList.remove("jump"), 300);
  }

  // =====================
  // SWITCH ROOM (INSTANT)
  // =====================
  function switchRoom(name) {
    rooms.forEach(r => r.classList.remove("active"));
    document.querySelector(`.${name}`)?.classList.add("active");
  }

  // =====================
  // NAVIGATION (FIX)
  // =====================
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.area;
      if (!target) return;
      switchRoom(target);
    });
  });

  // =====================
  // BED
  // =====================
  bed?.addEventListener("click", () => {
    const child = getActiveChild();
    addStar();
    jump(child);
  });

  // =====================
  // WARDROBE
  // =====================
  wardrobe?.addEventListener("click", () => {
    const child = getActiveChild();
    if (!child) return;

    dressOn = !dressOn;
    child.src = dressOn
      ? "./assets/child-dress.png"
      : "./assets/child.png";

    addStar();
    jump(child);
  });

  // =====================
  // FOOD
  // =====================
  foods.forEach(food => {
    food.addEventListener("click", () => {
      const child = getActiveChild();
      addStar();
      jump(child);
    });
  });

});
