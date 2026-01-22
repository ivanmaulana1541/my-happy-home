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
    basketReady: false,
    basketActive: false,
    basketDirection: 1,
    basketX: 0,
    basketShots: 0,
    basketScore: 0
  };

  /* =====================
     STORY DATA (TIDAK DIUBAH)
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
     QUIZ DATA (TIDAK DIUBAH)
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

  function switchRoom(name) {
    rooms.forEach(r => r.classList.remove("active"));
    document.querySelector(`.${name}`).classList.add("active");
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
     QUIZ
  ===================== */
  function loadQuiz() {
    const q = quizQuestions[gameState.quizStep];
    quiz.querySelector(".question").textContent = q.question;

    answers.forEach((btn, i) => {
      btn.textContent = q.answers[i].text;
      btn.dataset.correct = q.answers[i].correct;
    });

    quiz.classList.remove("hidden");
    gameState.waitingQuiz = true;
  }

  answers.forEach(btn => {
    btn.addEventListener("click", () => {
      if (!gameState.waitingQuiz) return;

      const correct = btn.dataset.correct === "true";
      quiz.classList.add("hidden");
      gameState.waitingQuiz = false;

      dialogSpeaker.textContent = "Miss Putri";
      dialogText.textContent = correct
        ? "Yaaay betul!"
        : "Masih belum benar, dicoba lagi ya Syabil.";

      dialogBox.classList.remove("hidden");

      if (correct) gameState.quizStep++;

      gameState.afterAction = gameState.quizStep >= quizQuestions.length;
    });
  });

  /* =====================
     DIALOG FLOW (FIX)
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

    // SET BASKET READY (BUKAN LANGSUNG START)
    if (gameState.afterAction && gameState.chapter === 4 && !gameState.basketReady) {
      gameState.basketReady = true;
      showDialog();
      return;
    }

    // START BASKET SETELAH DIALOG PENGANTAR
    if (gameState.basketReady) {
      startBasket();
      return;
    }

    if (gameState.afterAction && gameState.chapter === 1) {
      gameState.afterAction = false;
      gameState.chapter = 2;
      switchRoom("kitchen");
      showDialog();
    }

    if (gameState.afterAction && gameState.chapter === 2) {
      gameState.afterAction = false;
      gameState.chapter = 3;
      switchRoom("map");
      showDialog();
    }
  });

  /* =====================
     BASKET (TIDAK DIUBAH)
  ===================== */
  function startBasket() {
    basketArea.classList.remove("hidden");
    gameState.basketShots = 0;
    gameState.basketScore = 0;
    resetBall();
  }

  function resetBall() {
    gameState.basketX = 20;
    gameState.basketDirection = 1;
    gameState.basketActive = true;

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

  basketShootBtn.addEventListener("click", () => {
    if (!gameState.basketActive) return;

    gameState.basketActive = false;
    gameState.basketShots++;

    const ball = basketBall.getBoundingClientRect();
    const ring = basketRing.getBoundingClientRect();
    const center = ball.left + ball.width / 2;

    if (center >= ring.left && center <= ring.right) {
      gameState.basketScore++;
    }

    if (gameState.basketShots < 3) {
      setTimeout(resetBall, 600);
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
      gameState.basketReady = false;
      gameState.chapter = 3;
      switchRoom("map");
    };
  });

  /* =====================
     ACTIONS
  ===================== */
  wardrobe?.addEventListener("click", () => {
    if (story[gameState.chapter].action !== "changeDress") return;
    gameState.syabilOutfit = "seragam";
    updateSyabilOutfit();
    gameState.afterAction = true;
    showDialog();
  });

  foods.forEach(food => {
    food.addEventListener("click", () => {
      if (story[gameState.chapter].action !== "eat") return;
      gameState.afterAction = true;
      showDialog();
    });
  });

  schoolIcon?.addEventListener("click", () => {
    if (story[gameState.chapter].action !== "goSchool") return;
    gameState.chapter = 4;
    switchRoom("school");
    showDialog();
  });

  /* =====================
     START GAME
  ===================== */
  switchRoom("room");
  showDialog();

});
