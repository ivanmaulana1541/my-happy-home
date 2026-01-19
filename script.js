document.addEventListener("DOMContentLoaded", () => {

  let stars = 0;
  const starEl = document.getElementById("star-count");

  const rooms = document.querySelectorAll(".room");

  const btnHome = document.getElementById("btn-home");
  const btnSchool = document.getElementById("btn-school");
  const btnBedroom = document.getElementById("btn-bedroom");
  const btnKitchen = document.getElementById("btn-kitchen");

  const bed = document.querySelector(".bed");
  const wardrobe = document.querySelector(".wardrobe");
  const foods = document.querySelectorAll(".food");
  const schoolItems = document.querySelectorAll(".school-item");

  let dressed = false;
  let sleeping = false;

  function showRoom(name) {
    rooms.forEach(r => r.classList.remove("active"));
    document.querySelector("." + name).classList.add("active");
  }

  function addStar(n = 1) {
    stars += n;
    starEl.textContent = stars;
  }

  function getActiveChild() {
    return document.querySelector(".room.active .person img");
  }

  function jump(child) {
    if (!child) return;
    child.classList.add("jump");
    setTimeout(() => child.classList.remove("jump"), 300);
  }

  // NAV
  btnHome.onclick = () => showRoom("home");
  btnSchool.onclick = () => showRoom("school");
  btnBedroom.onclick = () => showRoom("bedroom");
  btnKitchen.onclick = () => showRoom("kitchen");

  // BED
  bed.onclick = () => {
    const child = getActiveChild();
    addStar();
    jump(child);
  };

  // DRESS
  wardrobe.onclick = () => {
    const child = getActiveChild();
    if (!child) return;

    dressed = !dressed;
    child.src = dressed
      ? "./assets/child-dress.png"
      : "./assets/child.png";

    addStar();
    jump(child);
  };

  // FOOD
  foods.forEach(food => {
    food.onclick = () => {
      const child = getActiveChild();
      addStar();
      jump(child);
    };
  });

  // SCHOOL
  schoolItems.forEach(item => {
    item.onclick = () => {
      const child = getActiveChild();
      if (!child) return;

      if (item.classList.contains("board")) {
        addStar(2);
      } else {
        addStar(1);
      }

      jump(child);
    };
  });

});
