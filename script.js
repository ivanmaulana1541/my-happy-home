console.log("script.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");

  // ======================
  // STATE
  // ======================
  let stars = 0;
  let isDressOn = false;
  let isSleeping = false;

  // ======================
  // ELEMENTS
  // ======================
  const starCount = document.getElementById("star-count");

  const bed = document.querySelector(".bed");
  const wardrobe = document.querySelector(".wardrobe");
  const childImg = document.querySelector(".bedroom .person img");

  const foods = document.querySelectorAll(".food");

  const btnBedroom = document.getElementById("btn-bedroom");
  const btnKitchen = document.getElementById("btn-kitchen");
  const bedroom = document.querySelector(".bedroom");
  const kitchen = document.querySelector(".kitchen");

  // ======================
  // FUNCTIONS
  // ======================
  function addStar() {
    stars++;
    starCount.textContent = stars;
  }

  function jumpAnimation() {
    const activeChild = document.querySelector(".room.active .person img");
    if (!activeChild) return;

    activeChild.classList.add("jump");
    setTimeout(() => {
      activeChild.classList.remove("jump");
    }, 400);
  }

  // ======================
  // EVENTS
  // ======================

  // 🛏️ Kasur → tidur / bangun
  bed.addEventListener("click", () => {
    addStar();

    if (isSleeping) {
      childImg.classList.remove("sleep");
      console.log("Syabil bangun ☀️");
    } else {
      childImg.classList.add("sleep");
      console.log("Syabil tidur 😴");
    }

    isSleeping = !isSleeping;
  });

  // 👗 Lemari → ganti baju + loncat
  wardrobe.addEventListener("click", () => {
    addStar();

    if (isDressOn) {
      childImg.src = "./assets/child.png";
      console.log("Syabil pakai baju biasa 🙂");
    } else {
      childImg.src = "./assets/child-dress.png";
      console.log("Syabil pakai baju pesta 👗");
    }

    jumpAnimation();
    isDressOn = !isDressOn;
  });

  // 🍎🍞🍰 Makan di dapur
  foods.forEach((food) => {
    food.addEventListener("click", () => {
      addStar();
      jumpAnimation();
      console.log("Syabil makan 😋");
    });
  });

  // 🏠 Pindah kamar
  btnBedroom.addEventListener("click", () => {
    bedroom.classList.add("active");
    kitchen.classList.remove("active");
  });

  // 🍳 Pindah dapur
  btnKitchen.addEventListener("click", () => {
    kitchen.classList.add("active");
    bedroom.classList.remove("active");
  });
});
