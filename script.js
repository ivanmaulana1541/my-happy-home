document.addEventListener("DOMContentLoaded", () => {

  let syabilOutfit = "piyama";

  const syabilImg = document.getElementById("syabil-img");
  const dialogText = document.getElementById("dialog-text");
  const btnChange = document.getElementById("btn-change");
  const door = document.getElementById("door");

  // GANTI BAJU
  btnChange.addEventListener("click", () => {
    if (syabilOutfit === "piyama") {
      syabilOutfit = "school";

      // efek loncat
      syabilImg.classList.add("jump");

      setTimeout(() => {
        syabilImg.classList.remove("jump");

        dialogText.textContent =
          "Syabil sudah siap. Saatnya keluar kamar.";

        btnChange.style.display = "none";
        door.classList.remove("hidden");
      }, 400);
    }
  });

  // CLICK PINTU
  door.addEventListener("click", () => {
    alert("Menuju Kitchen (lanjut tahap berikutnya)");
  });

});
