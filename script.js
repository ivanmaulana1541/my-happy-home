// ============================
// MY HAPPY HOME - SCRIPT (FIXED)
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

  let stars = 0;
  let isSleeping = false;
  let isDressOn = false;
  let isHugging = false;

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
  // ACTIVE ELEMENTS
  // ============================
  function getActiveFamily() {
    return document.querySelector(".room.active .family");
  }

  function getActiveChild() {
    return document.querySelector(".room.active .person img");
  }

  // ============================
  // LONCAT
  // ============================
  function jump(el) {
    el.classList.add("jump");
    setTimeout(() => el.classList.remove("jump"), 400);
  }

  // ============================
  // TIDUR / BANGUN
  // ============================
  bed.addEventListener("click", () => {
    const child = getActiveChild();
    if (!child) return;

    addStar();

    child.classList.toggle("sleep");
    isSleeping = !isSleeping;
  });

  // ============================
  // GANTI BAJU
  // ============================
  wardrobe.addEventListener("click", () => {
    const child = getActiveChild();
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
      const child = getActiveChild();
      if (child) jump(child);
    });
  });

  // ============================
  // 🤗 PELUKAN KELUARGA
  // ============================
  document.addEventListener("click", (e) => {
    // jangan ganggu klik makanan
    if (e.target.closest(".food")) return;

    // hanya ayah & ibu
    if (
      !e.target.closest(".father img") &&
      !e.target.closest(".mother img")
    ) {
      return;
    }

    const family = getActiveFamily();
    const child = getActiveChild();
    if (!family || !child) return;

    addStar();

    family.classList.toggle("hug");
    jump(child);
    isHugging = !isHugging;
  });

}); // ✅ INI YANG KEMARIN HILANG
