document.addEventListener("DOMContentLoaded", () => {

  const rooms = document.querySelectorAll(".room");
  const wardrobe = document.querySelector(".wardrobe");
  const foods = document.querySelectorAll(".food");

  const dialogBox = document.getElementById("dialog-box");
  const dialogSpeaker = dialogBox.querySelector(".dialog-speaker");
  const dialogText = dialogBox.querySelector(".dialog-text");
  const dialogNext = document.getElementById("dialog-next");

  const gameState = {
    chapter: 1,
    dialogIndex: 0,
    syabilOutfit: "piyama" // piyama | seragam
  };

  const story = {
    1: {
      scene: "bedroom",
      dialogs: [
        { speaker: "Syabil", text: "Syabil masih memakai piyama." },
        { speaker: "Syabil", text: "Ia harus ganti baju dulu." }
      ],
      action: "changeDress"
    },
    2: {
      scene: "kitchen",
      dialogs: [
        { speaker: "Mama", text: "Ayo sarapan dulu sebelum berangkat." },
        { speaker: "Papa", text: "Sarapan bersama yuk!" }
      ],
      action: "eat"
    },
    3: {
      scene: "school",
      dialogs: [
        { speaker: "Bu Putri", text: "Selamat pagi Syabil." },
        { speaker: "Bu Putri", text: "Ayo kita belajar." }
      ],
      action: "lesson"
    }
  };

  function updateSyabilOutfit() {
    const src =
      gameState.syabilOutfit === "seragam"
        ? "./assets/child.png"
        : "./assets/piyama.png";

    document.querySelectorAll(".person.child img")
      .forEach(img => img.src = src);
  }

  function loadRoomBackground(name) {
    const room = document.querySelector(`.${name}`);
    if (!room || room.dataset.bgLoaded) return;

    room.style.backgroundImage =
      `url("./assets/background/${name}.png")`;

    room.dataset.bgLoaded = "true";
  }

  function switchRoom(name) {
    rooms.forEach(r => r.classList.remove("active"));
    const room = document.querySelector(`.${name}`);
    room.classList.add("active");

    loadRoomBackground(name);
    updateSyabilOutfit();
  }

  function showDialog() {
    const chapter = story[gameState.chapter];
    const dialog = chapter.dialogs[gameState.dialogIndex];
    dialogSpeaker.textContent = dialog.speaker;
    dialogText.textContent = dialog.text;
    dialogBox.classList.remove("hidden");
  }

  dialogNext.addEventListener("click", () => {
    gameState.dialogIndex++;
    if (gameState.dialogIndex >= story[gameState.chapter].dialogs.length) {
      dialogBox.classList.add("hidden");
      gameState.dialogIndex = 0;
    } else {
      showDialog();
    }
  });

  // START GAME
  switchRoom("bedroom");
  updateSyabilOutfit();
  showDialog();

  wardrobe.addEventListener("click", () => {
    if (story[gameState.chapter].action !== "changeDress") return;

    gameState.syabilOutfit = "seragam";
    gameState.chapter = 2;
    switchRoom("kitchen");
    showDialog();
  });

  foods.forEach(food => {
    food.addEventListener("click", () => {
      if (story[gameState.chapter].action !== "eat") return;

      gameState.chapter = 3;
      switchRoom("school");
      showDialog();
    });
  });

});
