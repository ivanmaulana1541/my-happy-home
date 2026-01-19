// ============================
// MY HAPPY HOME - SCRIPT (SCHOOL ACTIVE)
// ============================

document.addEventListener("DOMContentLoaded", () => {
  console.log("My Happy Home ready");

  // ============================
  // ELEMENTS
  // ============================
  const starCountEl = document.getElementById("star-count");
  const btnBedroom = document.getElementById("btn-bedroom");
  const btnKitchen = document.getElementById("btn-kitchen");

  const bedroom = document.querySelector(".bedroom");
  const kitchen = document.querySelector(".kitchen");

  const bed = document.querySelector(".bed");
  const wardrobe = document.querySelector(".wardrobe");

  const foods = document.querySelectorAll(".food");

  // SEKOLAH
  const books = document.querySelectorAll(".book");
  const chairs = document.querySelectorAll(".chair");
  const bags = document.querySelectorAll(".bag");

  let stars = 0;
  let isSleeping = false;
  let isDressOn = false;
  let isSitting = false;

  // ============================
  // NAVIGATION
  // ============================
  btnBedroom?.addEventListener("click", () => {
    bedroom.classList.add("active");
    kitchen.classList.remove("active");
  });

  btnKitchen?.addEventListener("click", () => {
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
  // GET ACTIVE CHILD
  // ============================
  function getActiveChild() {
    return document.querySelector(".room.active .person img");
  }

  // ============================
  // ANIMATION: JUMP
  // ============================
  function jump(el) {
    if (!el) return;
    el.classList.add("jump");
    setTimeout(() => el.classList.remove("jump"), 400);
  }

  // ============================
  // BED: SLEEP
  // ============================
  bed?.addEventListener("click", () => {
    const child = getActiveChild();
    if (!child) return;

    addStar();

    child.classList.toggle("sleep");
    isSleeping = !isSleeping;
  });

  // ============================
  // WARDROBE: CHANGE CLOTHES
  // ============================
  wardrobe?.addEventListener("click", () => {
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
  // FOOD: EAT
  // ============================
  foods.forEach(food => {
    food.addEventListener("click", () => {
      const child = getActiveChild();
      addStar();
      jump(child);
    });
  });

  // ============================
  // 📚 SCHOOL: STUDY
  // ============================
  books.forEach(book => {
    book.addEventListener("click", () => {
      const child = getActiveChild();
      addStar();
      jump(child);
      console.log("Syabil belajar 📚");
    });
  });

  // ============================
  // 🪑 SCHOOL: SIT
  // ============================
  chairs.forEach(chair => {
    chair.addEventListener("click", () => {
      const child = getActiveChild();
      if (!child) return;

      child.classList.toggle("sit");
      isSitting = !isSitting;

      console.log("Syabil duduk 🪑");
    });
  });

  // ============================
  // 🎒 SCHOOL: READY
  // ============================
  bags.forEach(bag => {
    bag.addEventListener("click", () => {
      const child = getActiveChild();
      addStar();
      jump(child);
      console.log("Syabil siap sekolah 🎒");
    });
  });
});
