document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     BASIC SETUP
  ===================== */
  const rooms = document.querySelectorAll(".room");
  const wardrobe = document.querySelector(".wardrobe");
  const foods = document.querySelectorAll(".food");
  const schoolIcon = document.querySelector(".school-icon");

  const dialogBox = document.getElementById("dialog-box");
  const dialogSpeaker = dialogBox.querySelector(".dialog-speaker");
  const dialogText = dialogBox.querySelector(".dialog-text");
  const dialogNext = document.getElementById("dialog-next");

  const quiz = document.querySelector(".quiz");
  const answers = document.querySelectorAll(".answer");

  const gameState = {
    chapter: 1,
    dialogIndex: 0,
    syabilOutfit: "piyama",
    afterAction: false
  };

  /* =====================
     STORY DATA
  ===================== */
  const story = {
    1: {
      scene: "room",
      dialogs: [
        { speaker: "Syabil", text: "Syabil masih memakai piyama." },
        { speaker: "Syabil", text: "Ia harus ganti baju dulu." }
      ],
      afterActionDialogs: [
        { speaker: "Syabil", text: "Syabil sudah siap. Saatnya keluar kamar." }
      ],
      action: "changeDress"
    },

    2: {
      scene: "kitchen",
      dialogs: [
        { speaker: "Mama", text: "Ayo sarapan dulu sebelum berangkat." },
        { speaker: "Papa", text: "Sarapan bersama yuk!" }
      ],
      afterActionDialogs: [
        { speaker: "Syabil", text: "Sarapan selesai. Saatnya berangkat sekolah." }
      ],
      action: "eat"
    },

    3: {
      scene: "map",
      dialogs: [
        { speaker: "Syabil", text: "Saatnya berangkat ke sekolah." }
      ],
      action: "goSchool"
    },

    4: {
      scene: "school",
      dialogs: [
        { speaker: "Bu Putri", text: "Selamat pagi Syabil." },
        { speaker: "Bu Putri", text: "Ayo kita belajar." }
      ],
      afterActionDialogs: [
        { speaker: "Bu Putri", text: "Bagus! Syabil boleh pulang." }
      ],
      action: "lesson"
    }
  };

  /* =====================
     CORE FUNCTIONS
  ===================== */
  function updateSyabilOutfit() {
    const src =
      gameState.syabilOutfit === "seragam"
        ? "./assets/child.png"
        : "./assets/piyama.png";

    document
      .querySelectorAll(".person.child img")
      .forEach(img => (img.src = src));
  }

  function loadRoomBackground(name) {
    const room = document.querySelector(`.${name}`);
    if (!room || room.dataset.bgLoaded) return;

    const webp = `./assets/background/${name}.webp`;
    const png = `./assets/background/${name}.png`;

    const img = new Image();
    img.src = webp;

    img.onload = () => {
      room.style.backgroundImage = `url("${webp}")`;
      room.dataset.bgLoaded = "true";
    };

    img.onerror = () => {
      room.style.backgroundImage = `url("${png}")`;
      room.dataset.bgLoaded = "true";
    };
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
    const dialogs =
      gameState.afterAction && chapter.afterActionDialogs
        ? chapter.afterActionDialogs
        : chapter.dialogs;

    const dialog = dialogs[gameState.dialogIndex];
    if (!dialog) return;

    dialogSpeaker.textContent = dialog.speaker;
    dialogText.textContent = dialog.text;
    dialogBox.classList.remove("hidden");
  }

  /* =====================
     DIALOG FLOW (INTI)
  ===================== */
  dialogNext.addEventListener("click", () => {
    const chapter = story[gameState.chapter];
    const dialogs =
      gameState.afterAction && chapter.afterActionDialogs
        ? chapter.afterActionDialogs
        : chapter.dialogs;

    gameState.dialogIndex++;

    // masih ada dialog
    if (gameState.dialogIndex < dialogs.length) {
      showDialog();
      return;
    }

    // dialog selesai
    dialogBox.classList.add("hidden");
    gameState.dialogIndex = 0;

    // BAB 4 → tampilkan quiz
    if (!gameState.afterAction && gameState.chapter === 4) {
      quiz.classList.remove("hidden");
      return;
    }

    // selesai BAB 1
    if (gameState.afterAction && gameState.chapter === 1) {
      gameState.afterAction = false;
      gameState.chapter = 2;
      switchRoom("kitchen");
      showDialog();
      return;
    }

    // selesai BAB 2
    if (gameState.afterAction && gameState.chapter === 2) {
      gameState.afterAction = false;
      gameState.chapter = 3;
      switchRoom("map");
      showDialog();
      return;
    }

    // selesai BAB 4 → balik map
    if (gameState.afterAction && gameState.chapter === 4) {
      gameState.afterAction = false;
      gameState.chapter = 3;
      switchRoom("map");
    }
  });

  /* =====================
     ACTIONS
  ===================== */
  wardrobe?.addEventListener("click", () => {
    if (story[gameState.chapter].action !== "changeDress") return;

    gameState.syabilOutfit = "seragam";
    updateSyabilOutfit();

    const child = document.querySelector(".person.child");
    child.classList.add("jump");
    setTimeout(() => child.classList.remove("jump"), 400);

    gameState.afterAction = true;
    showDialog();
  });

  foods.forEach(food => {
    food.addEventListener("click", () => {
      if (story[gameState.chapter].action !== "eat") return;

      food.style.opacity = "0.4";
      gameState.afterAction = true;
      showDialog();
    });
  });

  schoolIcon?.addEventListener("click", () => {
    if (story[gameState.chapter].action !== "goSchool") return;

    gameState.afterAction = false;
    gameState.chapter = 4;
    switchRoom("school");
    showDialog();
  });

  answers.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.dataset.value !== "117") return;

      quiz.classList.add("hidden");
      gameState.afterAction = true;
      showDialog();
    });
  });

  /* =====================
     START GAME
  ===================== */
  switchRoom("room");
  showDialog();

});
