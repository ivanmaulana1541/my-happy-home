document.addEventListener("DOMContentLoaded", () => {

  const DEV_MODE = true; // ganti false kalau sudah rilis
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
  syabilOutfit: "piyama",
+ afterAction: false
};

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

  const dialogs = gameState.afterAction && chapter.afterActionDialogs
    ? chapter.afterActionDialogs
    : chapter.dialogs;

  const dialog = dialogs[gameState.dialogIndex];
  if (!dialog) return;

  dialogSpeaker.textContent = dialog.speaker;
  dialogText.textContent = dialog.text;
  dialogBox.classList.remove("hidden");
}


  dialogNext.addEventListener("click", () => {
  const chapter = story[gameState.chapter];

  const dialogs = gameState.afterAction && chapter.afterActionDialogs
    ? chapter.afterActionDialogs
    : chapter.dialogs;

  gameState.dialogIndex++;

  if (gameState.dialogIndex >= dialogs.length) {
    dialogBox.classList.add("hidden");
    gameState.dialogIndex = 0;

    // selesai dialog setelah ganti baju
    if (gameState.afterAction && gameState.chapter === 1) {
      gameState.afterAction = false;
      gameState.chapter = 2;
      switchRoom("kitchen");
      showDialog();
    }
  } else {
    showDialog();
  }
});


  // START GAME
  switchRoom("room");
  loadRoomBackground("room");
  updateSyabilOutfit();
  showDialog();

  wardrobe.addEventListener("click", () => {
  const chapter = story[gameState.chapter];
  if (chapter.action !== "changeDress") return;

  // ganti baju
  gameState.syabilOutfit = "seragam";
  updateSyabilOutfit();

  // efek loncat kecil
  const child = document.querySelector(".person.child");
  child.classList.add("jump");
  setTimeout(() => child.classList.remove("jump"), 400);

  // siapkan dialog setelah aksi
  gameState.afterAction = true;
  gameState.dialogIndex = 0;
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
