document.addEventListener("DOMContentLoaded", () => {

  let stars = 0;
  const starEl = document.getElementById("star-count");

  const btnHome = document.getElementById("btn-home");
  const btnSchool = document.getElementById("btn-school");
  const btnBedroom = document.getElementById("btn-bedroom");
  const btnKitchen = document.getElementById("btn-kitchen");

  const homeArea = document.querySelector(".home");
  const schoolArea = document.querySelector(".school");

  const bedroom = document.querySelector(".bedroom");
  const kitchen = document.querySelector(".kitchen");

  const bed = document.querySelector(".bed");
  const wardrobe = document.querySelector(".wardrobe");
  const foods = document.querySelectorAll(".food");

  let isDress = false;
  let isSleeping = false;

  /* UTIL */
  function addStar() {
    stars++;
    starEl.textContent = stars;
  }

  function getActiveChild() {
    return document.querySelector(".area.active .room.active .person img, .area.active .person img");
  }

  function jump(child) {
    if (!child) return;
    child.classList.add("jump");
    setTimeout(() => child.classList.remove("jump"), 250);
  }

  /* NAV AREA */
  btnHome.onclick = () => {
    homeArea.classList.add("active");
    schoolArea.classList.remove("active");
  };

  btnSchool.onclick = () => {
    schoolArea.classList.add("active");
    homeArea.classList.remove("active");
  };

  /* ROOM NAV */
  btnBedroom.onclick = () => {
    bedroom.classList.add("active");
    kitchen.classList.remove("active");
  };

  btnKitchen.onclick = () => {
    kitchen.classList.add("active");
    bedroom.classList.remove("active");
  };

  /* BED */
  bed.onclick = () => {
    const child = getActiveChild();
    addStar();
    jump(child);
    isSleeping = !isSleeping;
  };

  /* DRESS */
  wardrobe.onclick = () => {
    const child = getActiveChild();
    if (!child) return;

    addStar();
    child.src = isDress
      ? "./assets/child.png"
      : "./assets/child-dress.png";

    jump(child);
    isDress = !isDress;
  };

  /* FOOD */
  foods.forEach(food => {
    food.onclick = () => {
      const child = getActiveChild();
      addStar();
      jump(child);
    };
  });

});
