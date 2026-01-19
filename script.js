document.addEventListener("DOMContentLoaded", () => {

  const starCountEl = document.getElementById("star-count");
  const navButtons = document.querySelectorAll(".nav button");
  const rooms = document.querySelectorAll(".room");

  const bed = document.querySelector(".bed");
  const wardrobe = document.querySelector(".wardrobe");
  const foods = document.querySelectorAll(".food");

  let stars = 0;
  let dressOn = false;

  // =====================
  // HELPERS
  // =====================
  function getActiveRoom() {
    return document.querySelector(".room.active");
  }

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

  // =====================
  // JALAN KE TARGET
  // =====================
  function walkTo(targetEl, callback) {
    const child = getActiveChild();
    if (!child || !targetEl) return;

    const childRect = child.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();

    const distance =
      targetRect.left - childRect.left - 40;

    child.style.transition = "transform 0.6s linear";
    child.style.transform = `translateX(${distance}px)`;

    setTimeout(() => {
      child.style.transition = "";
      child.style.transform = "";
      callback && callback(child);
    }, 650);
  }

  // =====================
  // NAVIGATION
  // =====================
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const area = btn.dataset.area;
      rooms.forEach(r => r.classList.remove("active"));
      document.querySelector(`.${area}`).classList.add("active");
    });
  });

  // =====================
  // BED → JALAN → LOMPAT
  // =====================
  bed?.addEventListener("click", () => {
    walkTo(bed, (child) => {
      addStar();
      jump(child);
    });
  });

  // =====================
  // WARDROBE → JALAN → GANTI BAJU
  // =====================
  wardrobe?.addEventListener("click", () => {
    walkTo(wardrobe, (child) => {
      addStar();
      child.src = dressOn
        ? "./assets/child.png"
        : "./assets/child-dress.png";
      dressOn = !dressOn;
      jump(child);
    });
  });

  // =====================
  // FOOD → JALAN → MAKAN
  // =====================
  foods.forEach(food => {
    food.addEventListener("click", () => {
      walkTo(food, (child) => {
        addStar();
        jump(child);
      });
    });
  });

});
