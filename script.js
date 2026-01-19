document.addEventListener("DOMContentLoaded", () => {

  const starEl = document.getElementById("star-count");
  const navButtons = document.querySelectorAll(".nav button");
  const rooms = document.querySelectorAll(".room");

  const bed = document.querySelector(".bed");
  const wardrobe = document.querySelector(".wardrobe");
  const foods = document.querySelectorAll(".food");

  let stars = 0;
  let dressOn = false;

  // =====================
  // UTIL
  // =====================
  function addStar() {
    stars++;
    starEl.textContent = stars;
  }

  function switchRoom(name) {
    rooms.forEach(r => r.classList.remove("active"));
    document.querySelector(`.${name}`)?.classList.add("active");
  }

  function getChild() {
    return document.querySelector(".room.active .person img");
  }

  function jump() {
    const child = getChild();
    if (!child) return;
    child.classList.add("jump");
    setTimeout(() => child.classList.remove("jump"), 300);
  }

  // =====================
  // NAV
  // =====================
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      switchRoom(btn.dataset.area);
    });
  });

  // =====================
  // BED (PAKSA KE BEDROOM)
  // =====================
  bed?.addEventListener("click", () => {
    switchRoom("bedroom");
    setTimeout(() => {
      addStar();
      jump();
    }, 100);
  });

  // =====================
  // DRESS (BEDROOM)
  // =====================
  wardrobe?.addEventListener("click", () => {
    switchRoom("bedroom");
    setTimeout(() => {
      const child = getChild();
      if (!child) return;

      dressOn = !dressOn;
      child.src = dressOn
        ? "./assets/child-dress.png"
        : "./assets/child.png";

      addStar();
      jump();
    }, 100);
  });

  // =====================
  // FOOD (PAKSA KE KITCHEN)
  // =====================
  foods.forEach(food => {
    food.addEventListener("click", () => {
      switchRoom("kitchen");
      setTimeout(() => {
        addStar();
        jump();
      }, 100);
    });
  });

});
