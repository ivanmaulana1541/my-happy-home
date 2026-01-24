document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     BASIC SETUP
  ===================== */
  const rooms = document.querySelectorAll(".room");
  const wardrobe = document.querySelector(".wardrobe");
  const foods = document.querySelectorAll(".food");
  const schoolIcon = document.querySelector(".school-icon");
  const homeIcon = document.querySelector(".home-icon");
  const car = document.querySelector(".car");
  const schoolDressIcon = document.querySelector(".school-dress-icon");
  const schoolBasketIcon = document.querySelector(".school-basket-icon");
  const introPlayBtn = document.querySelector(".intro-play");

  const dialogBox = document.getElementById("dialog-box");
  const dialogSpeaker = dialogBox.querySelector(".dialog-speaker");
  const dialogText = dialogBox.querySelector(".dialog-text");
  const dialogNext = document.getElementById("dialog-next");

  const quiz = document.querySelector(".quiz");
  const answers = document.querySelectorAll(".answer");

  /* =====================
     🚗 TAPRUN SELECTORS
  ===================== */
  const tapRunResult = document.querySelector(".taprun-result");
  const tapRunScoreEl = document.querySelector(".taprun-score");
  const tapRunCoinsEl = document.querySelector(".taprun-coins");
  const tapRunTimerEl = document.querySelector(".taprun-timer");
  const tapRunPlayer = document.querySelector(".taprun-player");
  const tapRunPlayerImg = document.querySelector(".taprun-player img");

  const tapRunTouchLeft = document.querySelector(".taprun-touch-left");
  const tapRunTouchRight = document.querySelector(".taprun-touch-right");
  const tapRunRestartBtn = document.querySelector(".taprun-restart");
  const tapRunContinueBtn = document.querySelector(".taprun-continue");
  const tapRunSummary = document.querySelector(".taprun-summary");

  /* =====================
     FLAGS (PULANG)
  ===================== */
  let goHomeAfterBasketDialog = false;
  let allowGoHomeClick = false;
  let showArrivedHomeDialog = false;

  /* =====================
     GAME STATE
  ===================== */
  const gameState = {
    chapter: 1,
    dialogIndex: 0,
    syabilOutfit: "piyama",
    afterAction: false,
    quizStep: 0,
    waitingQuiz: false
  };

  /* =====================
     STORY DATA
  ===================== */
  const story = {
    1: {
      scene: "syabil-room",
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
      dialogs: [{ speaker: "Syabil", text: "Saatnya berangkat ke sekolah." }],
      action: "goSchool"
    },

    4: {
      scene: "school",
      dialogs: [
        { speaker: "Miss Putri", text: "Selamat pagi Syabil." },
        { speaker: "Miss Putri", text: "Ayo kita belajar." }
      ],
      afterActionDialogs: [
        {
          speaker: "Miss Putri",
          text: "Selamat ya Syabil, kamu sudah menyelesaikan tugas hari ini. Sekarang waktunya belajar olahraga. Syabil harus ganti baju dulu."
        }
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
    let src = "./assets/piyama.png";
    if (gameState.syabilOutfit === "seragam") src = "./assets/child.png";
    if (gameState.syabilOutfit === "sport") src = "./assets/child_sport.png";

    document.querySelectorAll(".person.child img")
      .forEach(img => img.src = src);
  }

  // ✅ mapping nama room -> file background
  function getBackgroundFile(roomName){
    if(roomName === "syabil-room") return "syabil-room.webp"; // ✅ NEW
    return `${roomName}.webp`;
  }

  function loadRoomBackground(name) {
    const room = document.querySelector(`.${name}`);
    if (!room || room.dataset.bgLoaded) return;

    const file = getBackgroundFile(name);

    const webp = `./assets/background/${file}`;
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
    if (!room) return;
    room.classList.add("active");
    loadRoomBackground(name);
    updateSyabilOutfit();
  }

  function showCustomDialog(speaker, text) {
    dialogSpeaker.textContent = speaker;
    dialogText.textContent = text;
    dialogBox.classList.remove("hidden");
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
     INTRO PLAY
  ===================== */
  introPlayBtn?.addEventListener("click", () => {
    gameState.chapter = 1;
    gameState.dialogIndex = 0;
    gameState.afterAction = false;
    gameState.syabilOutfit = "piyama";
    updateSyabilOutfit();

    // ✅ pindah ke kamar Syabil
    switchRoom("syabil-room");
    showDialog();
  });

  /* =====================
     QUIZ
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
     🚗 TAPRUN (20 detik)
  ===================== */
  let taprunLane = 1;
  let taprunScore = 0;
  let taprunCoins = 0;
  let taprunSpeed = 2.2;
  let taprunRunning = false;

  let taprunLoop = null;
  let taprunSpawnObs = null;
  let taprunSpawnCoin = null;

  let taprunTimeLeft = 20;
  let taprunTimerInt = null;

  let taprunSafeUntil = 0;
  let taprunStartTimeout = null;

  function updateTapRunCar() {
    if (!tapRunPlayerImg) return;
    tapRunPlayerImg.src = "./assets/icons/car-run.png";
  }

  function laneX(lane) {
    if (lane === 0) return 33;
    if (lane === 1) return 50;
    return 67;
  }

  function setPlayerLane(lane) {
    taprunLane = Math.max(0, Math.min(2, lane));
    if (tapRunPlayer) tapRunPlayer.style.left = laneX(taprunLane) + "%";
  }

  function clearTapRunObjects() {
    document.querySelectorAll(".taprun-obstacle, .taprun-coin").forEach(el => el.remove());
  }

  function stopTapRunLoops() {
    clearInterval(taprunLoop);
    clearInterval(taprunSpawnObs);
    clearInterval(taprunSpawnCoin);
    clearInterval(taprunTimerInt);
    clearTimeout(taprunStartTimeout);
  }

  function spawnObstacle() {
    const ui = document.querySelector(".taprun-ui");
    if (!ui) return;

    const obs = document.createElement("img");
    obs.className = "taprun-obstacle";
    obs.src = "./assets/icons/freshmarket.png";
    obs.dataset.type = "obstacle";

    let lane = Math.floor(Math.random() * 3);
    if (Date.now() < taprunSafeUntil && lane === taprunLane) lane = (lane + 1) % 3;

    obs.dataset.lane = String(lane);
    obs.style.left = laneX(lane) + "%";
    obs.style.transform = "translateX(-50%)";
    ui.appendChild(obs);
  }

  function spawnCoin() {
    const ui = document.querySelector(".taprun-ui");
    if (!ui) return;

    const coin = document.createElement("img");
    coin.className = "taprun-coin";
    coin.src = "./assets/icons/citraberkat.png";
    coin.dataset.type = "coin";

    const lane = Math.floor(Math.random() * 3);
    coin.dataset.lane = String(lane);
    coin.style.left = laneX(lane) + "%";
    coin.style.transform = "translateX(-50%)";

    ui.appendChild(coin);
  }

  function winTapRun() {
    if (!taprunRunning) return;
    taprunRunning = false;
    stopTapRunLoops();

    const reward = taprunCoins + 10;

    if (tapRunSummary) {
      tapRunSummary.innerHTML =
        `✅ Kamu tidak terlambat!<br>` +
        `Waktu: <b>20 detik</b><br>` +
        `Rintangan terlewati: <b>${taprunScore}</b><br>` +
        `Coins diambil: <b>${taprunCoins}</b><br>` +
        `Reward: <b>+${reward}</b> coin`;
    }

    if (tapRunContinueBtn) {
      tapRunContinueBtn.style.opacity = "1";
      tapRunContinueBtn.style.pointerEvents = "auto";
    }

    if (tapRunResult) {
      tapRunResult.dataset.status = "win";
      tapRunResult.style.display = "flex";
      tapRunResult.classList.remove("hidden");
    }
  }

  function loseTapRun() {
    if (!taprunRunning) return;
    taprunRunning = false;
    stopTapRunLoops();

    if (tapRunSummary) {
      tapRunSummary.innerHTML =
        `❌ Kamu menabrak!<br>` +
        `Sisa waktu: <b>${taprunTimeLeft}s</b><br>` +
        `Rintangan terlewati: <b>${taprunScore}</b><br>` +
        `Coins diambil: <b>${taprunCoins}</b><br><br>` +
        `<b>Kamu harus menang dulu ya supaya tidak terlambat 😄</b>`;
    }

    if (tapRunContinueBtn) {
      tapRunContinueBtn.style.opacity = "0.4";
      tapRunContinueBtn.style.pointerEvents = "none";
    }

    if (tapRunResult) {
      tapRunResult.dataset.status = "lose";
      tapRunResult.style.display = "flex";
      tapRunResult.classList.remove("hidden");
    }
  }

  function startTapRun() {
    if (!tapRunScoreEl || !tapRunCoinsEl || !tapRunTimerEl) return;

    if (tapRunResult) {
      tapRunResult.classList.add("hidden");
      tapRunResult.style.display = "none";
    }

    if (tapRunSummary) tapRunSummary.innerHTML = "";
    if (tapRunContinueBtn) {
      tapRunContinueBtn.style.opacity = "0.4";
      tapRunContinueBtn.style.pointerEvents = "none";
    }

    stopTapRunLoops();

    taprunScore = 0;
    taprunCoins = 0;
    taprunSpeed = 2.2;
    taprunRunning = true;

    taprunSafeUntil = Date.now() + 1200;

    taprunTimeLeft = 20;
    tapRunTimerEl.textContent = "Time: 20";
    tapRunTimerEl.style.background = "#000";

    tapRunScoreEl.textContent = "Score: 0";
    tapRunCoinsEl.textContent = "Coins: 0";

    clearTapRunObjects();
    setPlayerLane(1);
    updateTapRunCar();

    clearInterval(taprunTimerInt);
    taprunTimerInt = setInterval(() => {
      if (!taprunRunning) return;

      taprunTimeLeft--;
      tapRunTimerEl.textContent = "Time: " + taprunTimeLeft;

      if (taprunTimeLeft <= 7) tapRunTimerEl.style.background = "#ff2d2d";
      else tapRunTimerEl.style.background = "#000";

      if (taprunTimeLeft <= 0) winTapRun();
    }, 1000);

    taprunStartTimeout = setTimeout(() => {
      if (!taprunRunning) return;
      spawnObstacle();
      spawnCoin();
    }, 900);

    clearInterval(taprunSpawnObs);
    clearInterval(taprunSpawnCoin);
    taprunSpawnObs = setInterval(spawnObstacle, 980);
    taprunSpawnCoin = setInterval(spawnCoin, 750);

    clearInterval(taprunLoop);
    taprunLoop = setInterval(() => {
      if (!taprunRunning) return;

      const ui = document.querySelector(".taprun-ui");
      const H = ui?.getBoundingClientRect().height || 420;

      document.querySelectorAll(".taprun-obstacle, .taprun-coin").forEach(el => {
        const y = (parseFloat(el.dataset.y || "0") + taprunSpeed);
        el.dataset.y = String(y);
        el.style.top = y + "px";

        if (el.dataset.type === "obstacle" && !el.dataset.passed && y > 270) {
          el.dataset.passed = "1";
          taprunScore++;
          tapRunScoreEl.textContent = "Score: " + taprunScore;
        }

        if (Date.now() > taprunSafeUntil) {
          if (y > 280 && y < 360) {
            const objLane = Number(el.dataset.lane);
            if (objLane === taprunLane) {
              if (el.dataset.type === "coin") {
                taprunCoins++;
                tapRunCoinsEl.textContent = "Coins: " + taprunCoins;
                el.remove();
              } else {
                loseTapRun();
              }
            }
          }
        }

        if (y > H + 80) el.remove();
      });

      taprunSpeed += 0.003;
    }, 16);
  }

  tapRunTouchLeft?.addEventListener("click", () => {
    if (!taprunRunning) return;
    setPlayerLane(taprunLane - 1);
  });

  tapRunTouchRight?.addEventListener("click", () => {
    if (!taprunRunning) return;
    setPlayerLane(taprunLane + 1);
  });

  tapRunRestartBtn?.addEventListener("click", () => {
    startTapRun();
  });

  tapRunContinueBtn?.addEventListener("click", () => {
    const status = tapRunResult?.dataset?.status;
    if (status !== "win") return;

    if (tapRunResult) tapRunResult.classList.add("hidden");
    clearTapRunObjects();

    gameState.chapter = 4;
    gameState.afterAction = false;
    switchRoom("school");
    showDialog();
  });

  /* =====================
     DIALOG FLOW
  ===================== */
  dialogNext.addEventListener("click", () => {

    if (goHomeAfterBasketDialog) {
      goHomeAfterBasketDialog = false;
      allowGoHomeClick = true;

      switchRoom("map");
      dialogBox.classList.add("hidden");
      gameState.dialogIndex = 0;
      return;
    }

    if (showArrivedHomeDialog) {
      showArrivedHomeDialog = false;
      dialogBox.classList.add("hidden");
      return;
    }

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

    if (!gameState.afterAction && gameState.chapter === 4) {
      loadQuiz();
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

  /* MAP → SCHOOL ICON */
  schoolIcon?.addEventListener("click", () => {
    if (story[gameState.chapter].action !== "goSchool") return;

    const carEl = document.querySelector(".car");
    const home = document.querySelector(".home-icon");
    const school = document.querySelector(".school-icon");

    if (!carEl || !home || !school) {
      switchRoom("taprun");
      startTapRun();
      return;
    }

    const mapRoom = document.querySelector(".room.map");
    const mapRect = mapRoom.getBoundingClientRect();
    const homeRect = home.getBoundingClientRect();
    const schoolRect = school.getBoundingClientRect();

    const startX = homeRect.left - mapRect.left + homeRect.width / 2;
    const startY = homeRect.top - mapRect.top + homeRect.height / 2;

    const endX = schoolRect.left - mapRect.left + schoolRect.width / 2;
    const endY = schoolRect.top - mapRect.top + schoolRect.height / 2;

    carEl.classList.remove("hidden");
    carEl.style.left = (startX - 35) + "px";
    carEl.style.top = (startY - 20) + "px";
    void carEl.offsetWidth;

    carEl.style.left = (endX - 35) + "px";
    carEl.style.top = (endY - 20) + "px";

    setTimeout(() => {
      carEl.classList.add("hidden");
      switchRoom("taprun");
      startTapRun();
    }, 1300);
  });

  /* =====================
     START GAME
  ===================== */
  switchRoom("intro");
  dialogBox.classList.add("hidden");

});
