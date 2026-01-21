document.addEventListener("DOMContentLoaded", () => {

  let syabilOutfit = "piyama";

  const sceneRoom = document.getElementById("scene-room");
  const sceneKitchen = document.getElementById("scene-kitchen");

  const syabilImg = document.getElementById("syabil-img");
  const dialogText = document.getElementById("dialog-text");
  const btnChange = document.getElementById("btn-change");
  const doorRoom = document.getElementById("door-room");

  btnChange.addEventListener("click", () => {

    if (syabilOutfit === "piyama") {

      syabilImg.classList.add("jump");

      setTimeout(() => {
        syabilOutfit = "school";
        syabilImg.src = "assets/child.png";
      }, 150);

      setTimeout(() => {
        syabilImg.classList.remove("jump");

        dialogText.textContent =
          "Syabil sudah siap. Saatnya keluar kamar.";

        btnChange.style.display = "none";
        doorRoom.classList.remove("hidden");
      }, 300);
    }
  });

  doorRoom.addEventListener("click", () => {
    sceneRoom.classList.remove("active");
    sceneKitchen.classList.add("active");

    dialogText.textContent =
      "Mama dan Papa sudah menunggu di dapur.";
  });

});
