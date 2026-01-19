console.log("script.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");

  const bed = document.querySelector(".bed");
  const wardrobe = document.querySelector(".wardrobe");
  const starCount = document.getElementById("star-count");
  const btnBedroom = document.getElementById("btn-bedroom");
  const btnKitchen = document.getElementById("btn-kitchen");

  const bedroom = document.querySelector(".bedroom");
  const kitchen = document.querySelector(".kitchen");

  let stars = 0;

  bed.addEventListener("click", () => {
    stars++;
    starCount.textContent = stars;
    alert("Syabil tidur 😴");
  });

  wardrobe.addEventListener("click", () => {
    stars++;
    starCount.textContent = stars;
    alert("Syabil ganti baju 👗");
  });

  btnBedroom.addEventListener("click", () => {
    bedroom.classList.add("active");
    kitchen.classList.remove("active");
  });

  btnKitchen.addEventListener("click", () => {
    kitchen.classList.add("active");
    bedroom.classList.remove("active");
  });
});
