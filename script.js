document.addEventListener("DOMContentLoaded", () => {

  const rooms = document.querySelectorAll(".room");
  const wardrobe = document.querySelector(".wardrobe");
  const foods = document.querySelectorAll(".food");
  const schoolIcon = document.querySelector(".school-icon");

  const dialogBox = document.getElementById("dialog-box");
  const dialogSpeaker = dialogBox.querySelector(".dialog-speaker");
  const dialogText = dialogBox.querySelector(".dialog-text");
  const dialogNext = document.getElementById("dialog-next");

  const gameState = {
    chapter: 1,
    dialogIndex: 0,
    syabilOutfit: "piyama"
  };

  const story = {
    1: {
      scene: "room",
      dialogs: [
        { speaker: "Syabil", text: "Syabil masih memakai piyama." },
        { speaker: "Syabil", text: "Ia harus ganti baju dulu." }
      ],
      action: "changeDress"
    },
    2: {
      scene: "kitchen",
      dialogs: [
        { speaker: "Mama", text: "Ayo sarapan dulu sebelum berangkat." }
      ],
      action: "eat"
    },
    3: {
      scene: "map",
      dialogs: [
        { speaker: "Syabil", text: "Saatnya berangkat ke sekolah." }
      ],
      action: "chooseSchool"
    },
    4: {
      scene: "school",
      dialogs: [
        { speaker: "Bu Putri", text: "Selamat pagi Syabil." }
      ]
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

  function switchRoom(name) {
    rooms.forEach(r => r.classList.remove("active"));
    document.querySelector(`.${name}`).classList.add("active");
    updateSyabilOutfit();
  }

  function showDialog() {
    const chapter = story[gameState.chapter];
    const dialog = chapter.dialogs[gameState.dialogIndex];
    dialogSpeaker.textContent = dialog.speaker;
    dialogText.textContent = dialog.text;
    dialogBox.classList.remove("hidden");
  }

  dialogNext.onclick = () => {
    gameState.dialogIndex++;
    if (gameState.dialogIndex >= story[gameState.chapter].dialogs.length) {
      dialogBox.classList.add("hidden");
      gameState.dialogIndex = 0;
    } else {
      showDialog();
    }
  };

  // START
  switchRoom("room");
  showDialog();

  wardrobe.onclick = () => {
    if (story[gameState.chapter].action !== "changeDress") return;
    gameState.syabilOutfit = "seragam";
    gameState.chapter = 2;
    switchRoom("kitchen");
    showDialog();
  };

  foods.forEach(food => {
    food.onclick = () => {
      if (story[gameState.chapter].action !== "eat") return;
      gameState.chapter = 3;
      switchRoom("map");
      showDialog();
    };
  });

  schoolIcon.onclick = () => {
    if (story[gameState.chapter].action !== "chooseSchool") return;
    gameState.chapter = 4;
    switchRoom("school");
    showDialog();
  };

});
