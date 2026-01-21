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
    dialogIndex: 0
    syabilOutfit: "piyama" // "piyama" | "seragam"
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
      { speaker: "Syabil", text: "Sekarang aku berangkat sekolah!" }
    ],
    action: "goSchool"
  },
  4: {
    scene: "school",
    dialogs: [
      { speaker: "Bu Putri", text: "Selamat pagi Syabil." },
      { speaker: "Bu Putri", text: "Ayo kita belajar." }
    ],
    action: "schoolLesson"
  }
};


  function switchRoom(name) {
    rooms.forEach(r => r.classList.remove("active"));
    document.querySelector(`.${name}`).classList.add("active");
    updateSyabilOutfit(); // ← supaya konsisten
  }

function updateSyabilOutfit() {
  const src =
    gameState.syabilOutfit === "seragam"
      ? "./assets/child.png"      // SERAGAM
      : "./assets/piyama.png";    // PIYAMA

  document
    .querySelectorAll(".person.child img")
    .forEach(img => {
      img.src = src;
    });
}


  function showDialog() {
    const chapter = story[gameState.chapter];
    const dialog = chapter.dialogs[gameState.dialogIndex];
    dialogSpeaker.textContent = dialog.speaker;
    dialogText.textContent = dialog.text;
    document.querySelectorAll(".person").forEach(p => p.classList.remove("active"));

if (dialogSpeaker.textContent === "Bu Putri") {
  document.querySelector(".person.teacher")?.classList.add("active");
} else {
  document.querySelector(".person.child")?.classList.add("active");
}

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
updateSyabilOutfit(); // ← WAJIB
showDialog();


  document.querySelectorAll(".person.child img")
  .forEach(img => img.src = "./assets/piyama.png");

  switchRoom("bedroom");
  showDialog();

  wardrobe.addEventListener("click", () => {
  if (story[gameState.chapter].action !== "changeDress") return;

  gameState.syabilOutfit = "seragam"; // ← PENTING
  updateSyabilOutfit();

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

  const schoolIcon = document.querySelector(".school-icon");

schoolIcon.addEventListener("click", () => {
  if (story[gameState.chapter].action !== "goSchool") return;

  gameState.chapter = 4;
  switchRoom("school");
  showDialog();
});


});
