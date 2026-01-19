// ============================
// MY HAPPY HOME - SCRIPT
// ============================

document.addEventListener("DOMContentLoaded", () => {
  console.log("My Happy Home ready");

  const starCountEl = document.getElementById("star-count");
  const btnBedroom = document.getElementById("btn-bedroom");
  const btnKitchen = document.getElementById("btn-kitchen");

  const bedroom = document.querySelector(".bedroom");
  const kitchen = document.querySelector(".kitchen");

  const bed = document.querySelector(".bed");
  const wardrobe = document.querySelector(".wardrobe");
  const foods = document.querySelectorAll(".food");

  const familyMembers = document.querySelectorAll(".family .person img");

  let stars = 0;
  let isSleeping = false;
  let isDressOn = false;

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
  // LONCAT (UNTUK SEMUA)
  // ============================
  function jump(el) {
    el.classList.add("jump");
    setTimeout(() => el.classList.remove("jump"), 400);
  }

  // ============================
  // TIDUR / BANGUN (ANAK)
  // ============================
  bed.addEventListener("click", () => {
    const child = document.querySelector(".child img");
    if (!child) return;

    addStar();

    if (isSleeping) {
      child.classList.remove("sleep");
    } else {
      child.classList.add("sleep");
    }

    isSleeping = !isSleeping;
  });

  // ============================
  // GANTI BAJU (ANAK)
  // ============================
  wardrobe.addEventListener("click", () => {
    const child = document.querySelector(".child img");
    if (!child) return;

    addStar();

    child.src = isDressOn
      ? "./assets/child.png"
      : "./assets/child-dress.png";

    jump(child);
    isDressOn = !isDressOn;
  });

  // ============================
  // MAKAN
  // ============================
  foods.forEach(food => {
  food.addEventListener("click", () => {
    addStar();

    const activeChild = document.querySelector(
      ".room.active .person img"
    );

    if (activeChild) jump(activeChild);
  });
});


  // ============================
  // INTERAKSI AYAH & IBU
  // ============================
  familyMembers.forEach(member => {
    member.addEventListener("click", () => {
      addStar();
      jump(member);
    });
  });
});
