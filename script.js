document.addEventListener("DOMContentLoaded", () => {

  // STATE
  let syabilOutfit = "piyama";

  const syabilImg = document.getElementById("syabil-img");
  const dialogText = document.getElementById("dialog-text");
  const btnChange = document.getElementById("btn-change");

  btnChange.addEventListener("click", () => {

    if (syabilOutfit === "piyama") {

      // loncat
      syabilImg.classList.add("jump");

      setTimeout(() => {
        // ganti baju
        syabilOutfit = "school";
        syabilImg.src = "assets/child.png";
      }, 150);

      setTimeout(() => {
        // turun lagi
        syabilImg.classList.remove("jump");

        dialogText.textContent =
          "Syabil sudah siap. Saatnya keluar kamar.";

        btnChange.style.display = "none";
      }, 300);
    }

  });

});
