document.addEventListener("DOMContentLoaded", () => {

  const rooms = document.querySelectorAll(".room");
  const navButtons = document.querySelectorAll(".nav button");

  function switchRoom(name) {
    rooms.forEach(r => r.classList.remove("active"));
    document.querySelector(`.${name}`)?.classList.add("active");
  }

  // NAV BUTTON
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      switchRoom(btn.dataset.area);
    });
  });

  // MAP CLICK
  document.querySelectorAll(".map-location").forEach(loc => {
    loc.addEventListener("click", () => {
      switchRoom(loc.dataset.target);
    });
  });

});
