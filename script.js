console.log("script.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");

  let stars = 0;

  const starCount = document.getElementById("star-count");
  const bed = document.querySelector(".bed");
  const wardrobe = document.querySelector(".wardrobe");
  const childImg = document.querySelector(".person img");

  // klik kasur
  bed.addEventListener("click", () => {
    stars++;
    starCount.textContent = stars;
    console.log("Syabil tidur 😴");
  });

  // klik lemari → ganti baju
  wardrobe.addEventListener("click", () => {
    stars++;
    starCount.textContent = stars;

    childImg.src = "./assets/child-dress.png";

    console.log("Syabil ganti baju 👗");
  });
});
