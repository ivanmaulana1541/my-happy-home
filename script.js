document.addEventListener("DOMContentLoaded", () => {

  const rooms = document.querySelectorAll(".room");
  const wardrobe = document.querySelector(".wardrobe");
  const foods = document.querySelectorAll(".food");
  const mapSchool = document.querySelector(".school-icon");

  const dialogBox = document.getElementById("dialog-box");
  const dialogSpeaker = dialogBox.querySelector(".dialog-speaker");
  const dialogText = dialogBox.querySelector(".dialog-text");
  const dialogNext = document.getElementById("dialog-next");

  const quizBox = document.getElementById("quiz-box");
  const answerInput = document.getElementById("answer");
  const submitAnswer = document.getElementById("submit-answer");

  const gameState = {
    chapter: 1,
    dialogIndex: 0
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
      scene: "map",
      dialogs: [
        { speaker: "Syabil", text: "Saatnya berangkat sekolah!" }
      ],
      action: "goSchool"
    },
    4: {
      scene: "school",
      dialogs: [
        { speaker: "Bu Putri", text: "Ayo kita mulai pelajaran." }
      ],
      action: "quiz"
    }
  };

  function switchRoom(name) {
    rooms.forEach(r => r.classList.remove("active"));
    document.querySelector(`.${name}`).classList.add("active");
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
    const chapter = story[gameState.chapter];

    if (gameState.dialogIndex >= chapter.dialogs.length) {
      dialogBox.classList.add("hidden");
      gameState.dialogIndex = 0;
    } else {
      showDialog();
    }
  });

  // START GAME
  switchRoom("bedroom");
  showDialog();

  wardrobe.addEventListener("click", () => {
    if (story[gameState.chapter].action !== "changeDress") return;
    document.querySelector(".person.child img").src = "./assets/child-dress.png";
    gameState.chapter = 2;
    switchRoom("kitchen");
    showDialog();
  });

  foods.forEach(food => {
    food.addEventListener("click", () => {
      if (story[gameState.chapter].action !== "eat") return;
      gameState.chapter = 3;
      switchRoom("map");
      showDialog();
    });
  });

  mapSchool.addEventListener("click", () => {
    if (story[gameState.chapter].action !== "goSchool") return;
    gameState.chapter = 4;
    switchRoom("school");
    showDialog();
  });

  submitA
