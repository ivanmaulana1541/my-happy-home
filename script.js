document.addEventListener("DOMContentLoaded", () => {

  const starCountEl = document.getElementById("star-count");

  const btnRumah = document.getElementById("btn-rumah");
  const btnSekolah = document.getElementById("btn-sekolah");

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
  // JALAN KE OBJEK
  // =====================
  function walkTo(targetEl, callback) {
    const child = getActiveChild();
    if (!child || !targetEl) return;

    const childRect = child.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();

    const distance = targetRect.left - childRect.left - 40;

    child.style.transition = "transform 0.6s linear";
    child.style.transform = `translateX(${distance}px)`;

    setTimeout(() => {
      child.style.transition = "";
      child.style.transform = "";
      callback && callback(child);
    }, 650);
  }

  // =====================
  // PINDAH AREA (ANIMASI)
  // =====================
  function moveArea(targetRoomClass) {
    if (isMovingArea) return;
    isMovingArea = true;

    const currentRoom = getActiveRoom();
    const child = getActiveChild();
    if (!child) return;

    // keluar ke kanan
    child.style.transition = "transform 0.7s linear";
    child.style.transform = "translateX(600px)";

    setTimeout(() => {
      rooms.forEach(r => r.classList.remove("active"));
      const targetRoom = document.querySelector(`.${targetRoomClass}`);
      targetRoom.classList.add("active");

      const newChild = targetRoom.querySelector(".person img");

      // masuk dari kiri
      newChild.style.transition = "none";
      newChild.style.transform = "translateX(-600px)";

      requestAnimationFrame(() => {
        newChild.style.transition = "transform 0.7s linear";
        newChild.style.transform = "translateX(0)";
      });

      setTimeout(() => {
        newChild.style.transition = "";
        newChild.style.transform = "";
        isMovingArea = false;
      }, 750);

    }, 750);
  }

  // =====================
  // NAV AREA
  // =====================
  btnRumah?.addEventListener("click", () => {
    moveArea("home");
  });

  btnSekolah?.addEventListener("click", () => {
    moveArea("school");
  });

  // =====================
  // BED
  // =====================
  bed?.addEventListener("click", () => {
    walkTo(bed, (child) => {
      addStar();
      jump(child);
    });
  });

  // =====================
  // WARDROBE
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
  // FOOD
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
