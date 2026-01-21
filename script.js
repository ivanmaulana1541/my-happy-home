document.addEventListener("DOMContentLoaded", () => {
  const door = document.getElementById("door");
  const bg = document.getElementById("bg");
  const dialogText = document.getElementById("dialog-text");

  door.addEventListener("click", () => {
    // pindah ke kitchen
    bg.src = "assets/background/kitchen.png";
    dialogText.textContent = "Mama dan Papa sudah menunggu di dapur.";

    // opsional: sembunyikan pintu
    door.style.display = "none";
  });
});
