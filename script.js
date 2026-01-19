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
  const foods = document.querySelectorAll(".food");

  let stars = 0;
  let isSleeping = false;

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
  // AMBIL ANAK DI ROOM AKTIF
  // ============================
  function getActiveChild() {
    return document.querySelector(".room.active .person img");
  }

  // ============================
  // LONCAT
  // ============================
  function jumpChild() {
    const child = getActiveChild();
    if (!child) return;

    child.classList.add("jump");
    setTimeout(() => {
      child.classList.remove("jump");
    }, 400);
  }

  // ============================
  // TIDUR / BANGUN
  // ============================
  bed.addEventListener("click", () => {
    const child = getActiveChild();
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
  // MAKAN
  // ============================
  foods.forEach(food => {
    food.addEventListener("click", () => {
      addStar();
      jumpChild();
    });
  });
});
