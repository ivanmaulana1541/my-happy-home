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

  // Basket elements
  const basketArea = document.querySelector(".basket-area");
  const basketBall = document.querySelector(".basket-ball");
  const basketRing = document.querySelector(".basket-ring");
  const basketShootBtn = document.querySelector(".basket-shoot");

  /* =====================
     GAME STATE
  ===================== */
  const gameState = {
    chapter: 1,
    dialogIndex: 0,
    syabilOutfit: "piyama",
    afterAction: false,

    // quiz
    quizStep: 0,
    waitingQuiz: false,

    // basket
    basketActive: false,
    basketDirection: 1,
    basketX: 0,
    basketShots: 0,
    basketScore: 0
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
        { speaker: "Miss Putri", text: "Selamat pagi Syabil." },
        { speaker: "Miss Putri", text: "Ayo kita belajar." }
      ],
      afterActionDialogs: [
        { speaker: "Miss Putri", text: "Bagus! Syabil boleh pulang." },
        { speaker: "Miss Putri", text: "Sekarang kita olahraga basket ya." }
      ],
      action: "lesson"
    }
  };

  /* =====================
     QUIZ DATA
  ===================== */
  const quizQuestions = [
    {
      question: "105 + 12 = ?",
      answers: [
        { text: "117", correct: true },
        { text: "120", correct: false }
      ]
    },
    {
      question: "1067 + 479 = ?",
      answers: [
        { text: "1635", correct: false },
        { text: "1546", correct: true }
      ]
    },
    {
      question: "4782 - 905 = ?",
      answers: [
        { text: "3804", correct: false },
        { text: "3877", correct: true }
      ]
    }
  ];

  /* =====================
     CORE FUNCTIONS
  ===================== */
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
     QUIZ FUNCTIONS
  ===================== */
  function loadQuiz() {
    const q = quizQuestions[gameState.quizStep];
    if (!q) return;

    quiz.querySelector(".question").textContent = q.question;

    answers.forEach((btn, i) => {
      btn.textContent = q.answers[i].text;
      btn.dataset.correct = q.answers[i].correct;
    });

    quiz.classList.remove("hidden");
    gameState.waitingQuiz = true;
  }

  /* =====================
     BASKET FUNCTIONS
  ===================== */
  function startBasket() {
    basketArea.classList.remove("hidden");
    gameState.basketShots = 0;
    gameState.basketScore = 0;
    resetBasketBall();
  }

  function resetBasketBall() {
    gameState.basketX = 20;
    gameState.basketDirection = 1;
    gameState.basketActive = true;
    basketBall.style.left = gameState.basketX + "px";

    const courtWidth = basketBall.parentElement.offsetWidth - 50;

    function move() {
      if (!gameState.basketActive) return;

      gameState.basketX += gameState.basketDirection * 2;

      if (gameState.basketX >= courtWidth) gameState.basketDirection = -1;
      if (gameState.basketX <= 0) gameState.basketDirection = 1;

      basketBall.style.left = gameState.basketX + "px";
      requestAnimationFrame(move);
    }

    move();
  }

  /* =====================
     DIALOG FLOW
  ===================== */
  dialogNext.addEventListener("click", () => {
    const chapter = story[gameState.chapter];
    const dialogs =
      gameState.afterAction && chapter.afterActionDialogs
        ? chapter.afterActionDialogs
        : chapter.dialogs;

    gameState.dialogIndex++;

    if (gameState.dialogIndex < dialogs.length) {
      showDialog();
      return;
    }

    dialogBox.classList.add("hidden");
    gameState.dialogIndex = 0;

    // START QUIZ
    if (!gameState.afterAction && gameState.chapter === 4) {
      gameState.quizStep = 0;
      loadQuiz();
      return;
    }

    // FINISH QUIZ → dialog lanjut (basket intro)
    if (gameState.afterAction && gameState.chapter === 4) {
      startBasket();
      return;
    }

    if (gameState.afterAction && gameState.chapter === 1) {
      gameState.afterAction = false;
      gameState.chapter = 2;
      switchRoom("kitchen");
      showDialog();
      return;
    }

    if (gameState.afterAction && gameState.chapter === 2) {
      gameState.afterAction = false;
      gameState.chapter = 3;
      switchRoom("map");
      showDialog();
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
      if (!gameState.waitingQuiz) return;

      const isCorrect = btn.dataset.correct === "true";
      quiz.classList.add("hidden");
      gameState.waitingQuiz = false;

      if (!isCorrect) {
        dialogSpeaker.textContent = "Miss Putri";
        dialogText.textContent = "Masih belum benar, dicoba lagi ya Syabil.";
        dialogBox.classList.remove("hidden");
        return;
      }

      dialogSpeaker.textContent = "Miss Putri";
      dialogText.textContent = "Yaaay betul!";
      dialogBox.classList.remove("hidden");

      gameState.quizStep++;

      if (gameState.quizStep < quizQuestions.length) {
        gameState.afterAction = false;
      } else {
        gameState.afterAction = true;
      }
    });
  });

  basketShootBtn.addEventListener("click", () => {
    if (!gameState.basketActive) return;

    gameState.basketActive = false;
    gameState.basketShots++;

    const ballRect = basketBall.getBoundingClientRect();
    const ringRect = basketRing.getBoundingClientRect();
    const ballCenterX = ballRect.left + ballRect.width / 2;

    if (ballCenterX >= ringRect.left && ballCenterX <= ringRect.right) {
      gameState.basketScore++;
    }

    if (gameState.basketShots < 3) {
      setTimeout(resetBasketBall, 600);
      return;
    }

    basketArea.classList.add("hidden");

    dialogSpeaker.textContent = "Miss Putri";
    dialogText.textContent =
      gameState.basketScore >= 2
        ? "Wah, Syabil hebat!"
        : "Tidak apa-apa, kita latihan lagi ya.";

    dialogBox.classList.remove("hidden");

    dialogNext.onclick = () => {
      dialogNext.onclick = null;
      dialogBox.classList.add("hidden");
      gameState.afterAction = false;
      gameState.chapter = 3;
      switchRoom("map");
    };
  });

  /* =====================
     START GAME
  ===================== */
  switchRoom("room");
  showDialog();

});
