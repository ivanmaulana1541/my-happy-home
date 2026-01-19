console.log("script loaded");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM ready");

  const starEl = document.getElementById("star-count");
  const btnBedroom = document.getElementById("btn-bedroom");
  const btnKitchen = document.getElementById("btn-kitchen");

  const bedroom = document.querySelector(".bedroom");
  const kitchen = document.querySelector(".kitchen");

  const bed = document.querySelector(".bed");
  const wardrobe = document.querySelector(".wardrobe");
  const childImg = document.querySelector(".child img");

  let stars = 0;

  function addStar() {
    stars++;
    starEl.textContent = stars;
  }

  // NAV
  btnBedroom.onclick = () => {
    bedroom.classList.add("active");
    kitchen.classList.remove("active");
  };

  btnKitchen.onclick = () => {
    bedroom.classList.remove("active");
    kitchen.classList.add("active");
  };

  // BED
  bed.onclick = () => {
    addStar();
    alert("Syabil tidur 😴");
  };

  // WARDROBE
  wardrobe.onclick = () => {
    addStar();
    alert("Syabil ganti baju 👗");
  };

  // FOOD
  document.querySelectorAll(".food").forEach(food => {
    food.onclick = () => {
      addStar();
      alert("Syabil makan 😋");
    };
  });
});
