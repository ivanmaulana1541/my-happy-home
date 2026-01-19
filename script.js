document.addEventListener("DOMContentLoaded", () => {
  const starEl = document.getElementById("star-count");
  const buttons = document.querySelectorAll(".nav button");
  const rooms = document.querySelectorAll(".room");

  let stars = 0;

  function addStar() {
    stars++;
    starEl.textContent = stars;
  }

  function switchRoom(name) {
    rooms.forEach(r => r.classList.remove("active"));
    document.querySelector(`.${name}`).classList.add("active");
  }

  function jumpChild() {
    const child = document.querySelector(".room.active .person img");
    if (!child) return;
    child.classList.add("jump");
    setTimeout(() => child.classList.remove("jump"), 400);
  }

  /* NAV BUTTON */
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      switchRoom(btn.dataset.room);
    });
  });

  /* HALAMAN */
  document.querySelector(".tree").onclick = () => {
    addStar();
    jumpChild();
  };

  document.querySelector(".door-bedroom").onclick = () => switchRoom("bedroom");
  document.querySelector(".door-kitchen").onclick = () => switchRoom("kitchen");

  /* KAMAR */
  document.querySelector(".bed").onclick = () => {
    addStar();
    jumpChild();
  };

  document.querySelector(".wardrobe").onclick = () => {
    const child = document.querySelector(".room.active .person img");
    child.src = child.src.includes("dress")
      ? "./assets/child.png"
      : "./assets/child-dress.png";
    addStar();
    jumpChild();
  };

  /* DAPUR */
  document.querySelectorAll(".food").forEach(food => {
    food.onclick = () => {
      addStar();
      jumpChild();
    };
  });

  /* SEKOLAH */
  document.querySelectorAll(".school-item").forEach(item => {
    item.onclick = () => {
      addStar();
      jumpChild();
    };
  });
});
