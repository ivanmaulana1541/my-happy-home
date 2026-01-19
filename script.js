document.addEventListener("DOMContentLoaded", () => {

  const starEl = document.getElementById("star-count");

  const btnHome = document.getElementById("btn-home");
  const btnSchool = document.getElementById("btn-school");

  const btnBedroom = document.getElementById("btn-bedroom");
  const btnKitchen = document.getElementById("btn-kitchen");

  const worlds = document.querySelectorAll(".world");
  const homeWorld = document.querySelector(".world.home");
  const schoolWorld = document.querySelector(".world.school");

  const bedroom = document.querySelector(".bedroom");
  const kitchen = document.querySelector(".kitchen");

  let stars = 0;

  // =========================
  // UTIL
  // =========================
  function addStar() {
    stars++;
    starEl.textContent = stars;
  }

  function getActiveChild() {
    return document.querySelector(".world.active .person img");
  }

  function jump() {
    const child = getActiveChild();
    if (!child) return;
    child.classList.add("jump");
    setTimeout(() => child.classList.remove("jump"), 400);
  }

  // =========================
  // WORLD SWITCH
  // =========================
  btnHome.addEventListener("click", () => {
    worlds.forEach(w => w.classList.remove("active"));
    homeWorld.classList.add("active");
  });

  btnSchool.addEventListener("click", () => {
    worlds.forEach(w => w.classList.remove("active"));
    schoolWorld.classList.add("active");
    addStar();
    jump();
  });

  // =========================
  // ROOM SWITCH
  // =========================
  btnBedroom.addEventListener("click", () => {
    bedroom.classList.add("active");
    kitchen.classList.remove("active");
  });

  btnKitchen.addEventListener("click", () => {
    kitchen.classList.add("active");
    bedroom.classList.remove("active");
  });

  // =========================
  // FOOD
  // =========================
  document.querySelectorAll(".food").forEach(food => {
    food.addEventListener("click", () => {
      addStar();
      jump();
    });
  });

});
