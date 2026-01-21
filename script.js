document.addEventListener("DOMContentLoaded", () => {

  // ===== STATE AWAL =====
  let syabilOutfit = "piyama";

  const syabilImg = document.getElementById("syabil-img");
  const dialogText = document.getElementById("dialog-text");
  const btnChange = document.getElementById("btn-change");

  // ===== SET AWAL (PENTING) =====
  syabilImg.src = "assets/piyama.png";
  dialogText.textContent = "Syabil masih memakai piyama. Ia harus ganti baju dulu.";

  // ===== GANTI BAJU =====
  btnChange.addEventListener("click", () => {
    if (syabilOutfit === "piyama") {
      syabilOutfit = "school";

      syabilImg.classList.add("jump");

      setTimeout(() => {
        syabilImg.src = "assets/child.png";
        syabilImg.classList.remove("jump");

        dialogText.textContent = "Syabil sudah siap. Saatnya keluar kamar.";
        btnChange.style.display = "none";
      }, 300);
    }
  });

});
