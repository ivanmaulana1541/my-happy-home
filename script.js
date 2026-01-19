console.log("script.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");

  // ======================
  // STATE
  // ======================
  let stars = 0;
  let isDressOn = false;

  // ======================
  // ELEMENTS
  // ======================
  const starCount = document.getElementById("star-count");
  const bed = document.querySelector(".bed");
  const wardrobe = document.querySelector(".wardrobe");
  const childImg = document.querySelector(".person img");

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

  // ======================
  // EVENTS
  // ======================

  // 🛏️ Klik kasur
  bed.addEventListener("click", () => {
    addStar();
    console.log("Syabil tidur 😴");
  });

  // 👗 Klik lemari (ganti baju bolak-balik)
  wardrobe.addEventListener("click", () => {
    addStar();

    if (isDressOn) {
      childImg.src = "./assets/child.png";
      console.log("Syabil pakai baju biasa 🙂");
    } else {
      childImg.src = "./assets/child-dress.png";
      console.log("Syabil pakai baju pesta 👗");
    }

    isDressOn = !isDressOn;
  });

  // 🏠 Tombol kamar
  btnBedroom.addEventListener("click", () => {
    bedroom.classList.add("active");
    kitchen.classList.remove("active");
  });

  // 🍳 Tombol dapur
  btnKitchen.addEventListener("click", () => {
    kitchen.classList.add("active");
    bedroom.classList.remove("active");
  });
});
