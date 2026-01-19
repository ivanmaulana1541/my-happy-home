// === MY HAPPY HOME - SAFE BOOT SCRIPT ===
console.log("✅ script.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM fully loaded");

  const bed = document.querySelector(".bed");
  const wardrobe = document.querySelector(".wardrobe");
  const foods = document.querySelectorAll(".food");
  const btnBedroom = document.getElementById("btn-bedroom");
  const btnKitchen = document.getElementById("btn-kitchen");

  if (bed) {
    bed.addEventListener("click", () => {
      alert("🛏️ Kasur diklik");
    });
  }

  if (wardrobe) {
    wardrobe.addEventListener("click", () => {
      alert("👗 Lemari diklik");
    });
  }

  foods.forEach((food) => {
    food.addEventListener("click", () => {
      alert("🍎 Makan");
    });
  });

  if (btnBedroom) {
    btnBedroom.addEventListener("click", () => {
      alert("Masuk Kamar");
    });
  }

  if (btnKitchen) {
    btnKitchen.addEventListener("click", () => {
      alert("Masuk Dapur");
    });
  }
});
