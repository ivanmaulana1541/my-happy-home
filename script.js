document.addEventListener("DOMContentLoaded", () => {

  const rooms = document.querySelectorAll(".room");
  const navButtons = document.querySelectorAll(".nav button");
  const mapLocations = document.querySelectorAll(".map-location");

  const quest = {
    wake: false,
    eat: false,
    school: false
  };

  const qWake = document.getElementById("q-wakeup");
  const qEat = document.getElementById("q-eat");
  const qSchool = document.getElementById("q-school");

  const bed = document.querySelector(".bed");
  const foods = document.querySelectorAll(".food");

  function switchRoom(name) {
    const target = document.querySelector(`.room.${name}`);
    if (!target) return;
    rooms.forEach(r => r.classList.remove("active"));
    target.classList.add("active");
  }

  navButtons.forEach(btn => {
    btn.onclick = () => switchRoom(btn.dataset.area);
  });

  bed.onclick = () => {
    quest.wake = true;
    qWake.classList.add("done");
    updateMap();
  };

  foods.forEach(f => {
    f.onclick = () => {
      if (!quest.wake) return;
      quest.eat = true;
      qEat.classList.add("done");
      updateMap();
    };
  });

  function updateMap() {
    mapLocations.forEach(loc => {
      loc.classList.remove("locked","active-quest");
      if (loc.dataset.target === "school" && !quest.eat) {
        loc.classList.add("locked","active-quest");
      }
    });
  }

  mapLocations.forEach(loc => {
    loc.onclick = () => {
      if (loc.classList.contains("locked")) return;
      switchRoom(loc.dataset.target);
    };
  });

  updateMap();
});
