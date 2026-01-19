document.addEventListener("DOMContentLoaded", () => {

  const starEl = document.getElementById("star-count");
  const navButtons = document.querySelectorAll(".nav button");
  const rooms = document.querySelectorAll(".room");

  const bed = document.querySelector(".bed");
  const wardrobe = document.querySelector(".wardrobe");
  const foods = document.querySelectorAll(".food");

  let stars = 0;
  let dressOn = false;
  let isMoving = false;

  // =====================
  // UTIL
  // =====================
  function addStar() {
    stars++;
    starEl.textContent = stars;
  }

  function getActiveRoom() {
    return document.querySelector(".room.active");
  }

  function getChild(room = getActiveRoom()) {
    return room?.querySelector(".person img");
  }

  function jump(child) {
    if (!child) return;
    child.classList.add("jump");
    setTimeout(() => child.classList.remove("jump"), 300);
  }

  function switchRoomInstant(name) {
    rooms.forEach(r => r.classList.remove("active"));
    document.querySelector(`.${name}`)?.classList.add("active");
  }

  // =====================
  // ANIMASI PINDAH AREA
  // =====================
  function switchAreaWithWalk(target) {
    if (isMoving) return;
    isMoving = true;

    const currentRoom = getActiveRoom();
    const child = getChild(currentRoom);
    if (!child) return;

    // keluar ke kanan
    child.style.transition = "transform 0.6s linear";
    child.style.transform = "translateX(600px)";

    setTimeout(() => {
      // ganti room
      switchRoomInstant(target);

      const newRoom = getActiveRoom();
      const newChild = getChild(newRoom);

      // masuk dari kiri
      newChild.style.transition = "none";
      newChild.style.transform = "translateX(-600px)";

      requestAnimationFrame(() => {
        newChild.style.transition = "transform 0.6s linear";
        newChild.style.transform = "translateX(0)";
      });

      setTimeout(() => {
        newChild.style.transition = "";
        newChild.style.transform = "";
        isMoving = false;
      }, 650);

    }, 650);
  }

  // =====================
  // NAVIGATION
  // =====================
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.area;
      const current = getActiveRoom()?.classList[1];

      // HOME ⇄ SCHOOL pakai animasi
      if (
        (current === "home" && target === "school") ||
        (current === "school" && target === "home")
      ) {
        switchAreaWithWalk(target);
      } else {
        switchRoomInstant(target);
      }
    });
  });

  // =====================
  // BED → BEDROOM
  // =====================
  bed?.addEventListener("click", () => {
    switchRoomInstant("bedroom");
    setTimeout(() => {
      addStar();
      jump(getChild());
    }, 100);
  });

  // =====================
  // WARDROBE
  // =====================
  wardrobe?.addEventListener("click", () => {
    switchRoomInstant("bedroom");
    setTimeout(() => {
      const child = getChild();
      dressOn = !dressOn;
      child.src = dressOn
        ? "./assets/child-dress.png"
        : "./assets/child.png";
      addStar();
      jump(child);
    }, 100);
  });

  // =====================
  // FOOD → KITCHEN
  // =====================
  foods.forEach(food => {
    food.addEventListener("click", () => {
      switchRoomInstant("kitchen");
      setTimeout(() => {
        addStar();
        jump(getChild());
      }, 100);
    });
  });

});
