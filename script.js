document.addEventListener("DOMContentLoaded", () => {

  const rooms = document.querySelectorAll(".room");
  const dialogBox = document.getElementById("dialog-box");
  const dialogSpeaker = dialogBox.querySelector(".dialog-speaker");
  const dialogText = dialogBox.querySelector(".dialog-text");
  const dialogNext = document.getElementById("dialog-next");

  const schoolIcon = document.querySelector(".school-icon");
  const homeIcon = document.querySelector(".home-icon");
  const schoolBasketIcon = document.querySelector(".school-basket-icon");
  const schoolDressIcon = document.querySelector(".school-dress-icon");

  const basketChild = document.querySelector(".basket-child");

  const gameState = {
    chapter: 1,
    dialogIndex: 0
  };

  function switchRoom(name) {
    rooms.forEach(r => r.classList.remove("active"));
    document.querySelector("." + name).classList.add("active");
  }

  function showDialog(speaker, text) {
    dialogSpeaker.textContent = speaker;
    dialogText.textContent = text;
    dialogBox.classList.remove("hidden");
  }

  /* =====================
     BASKET GAME (TIDAK DIUBAH)
  ===================== */
  let score = 0;
  const ball = document.querySelector(".basket-ball");
  const shootBtn = document.querySelector(".shoot-btn");
  const scoreBox = document.querySelector(".basket-score");

  shootBtn.onclick = () => {
    basketChild.classList.add("shoot");

    setTimeout(() => {
      basketChild.classList.remove("shoot");
      score++;
      scoreBox.textContent = score + " / 3";

      if (score >= 3) {
        setTimeout(() => {
          showDialog("Syabil", "Syabil sudah lelah. Saatnya pulang ke rumah.");
          gameState.chapter = 6;
        }, 500);
      }
    }, 300);
  };

  /* =====================
     DIALOG FLOW
  ===================== */
  dialogNext.onclick = () => {
    dialogBox.classList.add("hidden");

    if (gameState.chapter === 6) {
      switchRoom("map");
      homeIcon.classList.remove("hidden");
    }
  };

  /* =====================
     MAP → HOME
  ===================== */
  homeIcon.onclick = () => {
    switchRoom("room");
    showDialog("Syabil", "Hari yang menyenangkan. Saatnya beristirahat.");
    homeIcon.classList.add("hidden");
  };

});
