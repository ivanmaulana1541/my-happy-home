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

  const dialogBox = document.getElementById("dialog-box");
  const dialogSpeaker = dialogBox.querySelector(".dialog-speaker");
  const dialogText = dialogBox.querySelector(".dialog-text");
  const dialogNext = document.getElementById("dialog-next");

  const quiz = document.querySelector(".quiz");
  const answers = document.querySelectorAll(".answer");

  /* =====================
     ✅ NEW FLAGS (PULANG)
  ===================== */
  let goHomeAfterBasketDialog = false;  // setelah dialog capek -> pindah map
  let allowGoHomeClick = false;         // di map, player wajib klik rumah
  let showArrivedHomeDialog = false;    // setelah masuk home, tampil dialog "sampai rumah"

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

  function loadRoomBackground(name) {
    const room = document.querySelector(`.${name}`);
    if (!room || room.dataset.bgLoaded) return;

    if (name === "car-run") return;

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

  // ✅ helper untuk dialog cepat (dipakai fitur pulang)
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
     DIALOG FLOW
  ===================== */
  dialogNext.addEventListener("click", () => {

    // ✅ NEW: habis basket selesai, dialog capek -> pindah map
    if (goHomeAfterBasketDialog) {
      goHomeAfterBasketDialog = false;
      allowGoHomeClick = true;

      // balik ke map, player wajib klik rumah
      switchRoom("map");

      // dialog box ditutup dulu biar map kelihatan bersih
      dialogBox.classList.add("hidden");
      gameState.dialogIndex = 0;

      return;
    }

    // ✅ NEW: sampai rumah -> setelah klik next, tutup dialog
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

  // MAP: klik sekolah -> mobil home ke school -> masuk school
  schoolIcon?.addEventListener("click", () => {
    if (story[gameState.chapter].action !== "goSchool") return;

    // 🚗 NEW: masuk mini game car-run dulu
    startCarRun();
    return;

    const carEl = document.querySelector(".car");
    const home = document.querySelector(".home-icon");
    const school = document.querySelector(".school-icon");

    if (!carEl || !home || !school) {
      gameState.chapter = 4;
      gameState.afterAction = false;
      switchRoom("school");
      showDialog();
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

      gameState.chapter = 4;
      gameState.afterAction = false;
      switchRoom("school");
      showDialog();
    }, 1300);
  });

  // ✅ NEW: MAP klik rumah setelah basket selesai -> mobil school ke home -> masuk room + dialog sampai rumah
  homeIcon?.addEventListener("click", () => {
    if (!allowGoHomeClick) return;

    const mapRoom = document.querySelector(".room.map");
    if (!mapRoom || !car || !homeIcon || !schoolIcon) {
      // fallback tanpa animasi
      switchRoom("room");
      showArrivedHomeDialog = true;
      showCustomDialog("Syabil", "Aku sudah sampai rumah.");
      allowGoHomeClick = false;
      return;
    }

    const mapRect = mapRoom.getBoundingClientRect();
    const startRect = schoolIcon.getBoundingClientRect(); // start sekolah
    const endRect = homeIcon.getBoundingClientRect();     // end rumah

    const startX = startRect.left - mapRect.left + startRect.width / 2;
    const startY = startRect.top - mapRect.top + startRect.height / 2;

    const endX = endRect.left - mapRect.left + endRect.width / 2;
    const endY = endRect.top - mapRect.top + endRect.height / 2;

    car.classList.remove("hidden");
    car.style.left = (startX - 35) + "px";
    car.style.top = (startY - 20) + "px";

    void car.offsetWidth;

    car.style.left = (endX - 35) + "px";
    car.style.top = (endY - 20) + "px";

    // lock click sementara
    homeIcon.style.pointerEvents = "none";
    schoolIcon.style.pointerEvents = "none";

    setTimeout(() => {
      car.classList.add("hidden");
      homeIcon.style.pointerEvents = "auto";
      schoolIcon.style.pointerEvents = "auto";

      // masuk ke rumah
      switchRoom("room");

      // tampil dialog sampai rumah
      showArrivedHomeDialog = true;
      showCustomDialog("Syabil", "Aku sudah sampai rumah.");

      allowGoHomeClick = false;

    }, 1300);
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

      if (gameState.quizStep >= quizQuestions.length) {
        gameState.afterAction = true;
        gameState.dialogIndex = 0;
        schoolDressIcon.classList.remove("hidden");
        showDialog();
      }
    });
  });

  schoolDressIcon?.addEventListener("click", () => {
    gameState.syabilOutfit = "sport";
    updateSyabilOutfit();

    const child = document.querySelector(".person.child");
    child.classList.add("jump");
    setTimeout(() => child.classList.remove("jump"), 400);

    schoolDressIcon.classList.add("hidden");
    schoolBasketIcon.classList.remove("hidden");
  });

  schoolBasketIcon?.addEventListener("click", () => {
    schoolBasketIcon.classList.add("hidden");
    switchRoom("basket");
    setTimeout(startBasketGame, 300);
  });

  /* =====================
     🏀 BASKET GAME (FIXED)
  ===================== */
  let power = 0;
  let direction = 1;
  let interval = null;
  let basketScore = 0;

  function startBasketGame() {
    const powerIndicator = document.querySelector(".power-indicator");
    const shootBtn = document.querySelector(".shoot-btn");
    const ball = document.querySelector(".basket-ball");
    const ring = document.querySelector(".basket-ring");
    const scoreBox = document.querySelector(".basket-score");

    power = 0;
    direction = 1;
    basketScore = 0;
    scoreBox.textContent = "0 / 3";

    interval = setInterval(() => {
      power += direction * 2;
      if (power >= 100) direction = -1;
      if (power <= 0) direction = 1;
      powerIndicator.style.width = power + "%";
    }, 30);

    shootBtn.onclick = () => {
      clearInterval(interval);

      const ballRect = ball.getBoundingClientRect();
      const ringRect = ring.getBoundingClientRect();

      const dx = ringRect.left - ballRect.left + ringRect.width / 2;
      const dy = ringRect.top - ballRect.top;

      ball.style.transition = "none";
      ball.style.transform = "translate(0,0)";
      ball.style.opacity = "1";
      void ball.offsetWidth;

      ball.style.transition = "transform 0.6s cubic-bezier(.3,.8,.4,1)";
      ball.style.transform = `translate(${dx}px, ${dy}px) scale(0.6)`;

      setTimeout(() => {
        ball.style.opacity = "0";
        basketScore++;
        scoreBox.textContent = basketScore + " / 3";

        // ✅ NEW: kalau sudah 3/3, munculkan dialog capek pulang
        if (basketScore >= 3) {
          // stop indikator power supaya game berhenti bersih
          clearInterval(interval);

          // kasih sedikit delay biar animasi masuk dulu
          setTimeout(() => {
            goHomeAfterBasketDialog = true;
            showCustomDialog("Syabil", "Syabil sudah lelah... Saatnya pulang ke rumah.");
          }, 400);
        }

      }, 450);

      setTimeout(() => {
        // kalau sudah menang, jangan restart shoot lagi
        if (basketScore >= 3) return;

        ball.style.opacity = "1";
        ball.style.transform = "translate(0,0)";
        power = 0;
        direction = 1;
        interval = setInterval(() => {
          power += direction * 2;
          if (power >= 100) direction = -1;
          if (power <= 0) direction = 1;
          powerIndicator.style.width = power + "%";
        }, 30);
      }, 800);
    };
  }

  /* =====================
     🚗 CAR RUN MINI GAME
  ===================== */
  let carRunActive = false;
  let carRunTimer = 12;
  let carRunObstacleInterval = null;
  let carRunCountdownInterval = null;
  let carRunCollision = false;

  function startCarRun() {
    // masuk room car-run
    switchRoom("car-run");

    const player = document.querySelector(".car-run-player");
    const obstaclesWrap = document.querySelector(".car-run-obstacles");
    const timerBox = document.querySelector(".car-run-timer");
    const btnLeft = document.querySelector(".car-run-left");
    const btnRight = document.querySelector(".car-run-right");

    if (!player || !obstaclesWrap || !timerBox) {
      // fallback: kalau scene belum ada, langsung ke school
      gameState.chapter = 4;
      gameState.afterAction = false;
      switchRoom("school");
      showDialog();
      return;
    }

    // reset state
    carRunActive = true;
    carRunCollision = false;
    carRunTimer = 12;
    timerBox.textContent = carRunTimer;

    // bersihin obstacle lama
    obstaclesWrap.innerHTML = "";

    // posisi mobil (3 lajur)
    const lanes = [25, 50, 75]; // % left
    let laneIndex = 1; // tengah

    function setLane(idx) {
      laneIndex = Math.max(0, Math.min(2, idx));
      player.style.left = lanes[laneIndex] + "%";
      player.style.transform = "translateX(-50%)";
    }

    setLane(1);

    // keyboard control
    function onKey(e) {
      if (!carRunActive) return;
      if (e.key === "ArrowLeft") setLane(laneIndex - 1);
      if (e.key === "ArrowRight") setLane(laneIndex + 1);
    }
    window.addEventListener("keydown", onKey);

    // mobile buttons
    const leftHandler = () => carRunActive && setLane(laneIndex - 1);
    const rightHandler = () => carRunActive && setLane(laneIndex + 1);
    btnLeft && btnLeft.addEventListener("click", leftHandler);
    btnRight && btnRight.addEventListener("click", rightHandler);

    // spawn obstacles
    carRunObstacleInterval = setInterval(() => {
      if (!carRunActive) return;

      const obs = document.createElement("div");
      obs.className = "car-run-obstacle";

      // random lane
      const obsLane = Math.floor(Math.random() * 3);
      obs.style.left = lanes[obsLane] + "%";
      obs.style.transform = "translateX(-50%)";

      obstaclesWrap.appendChild(obs);

      // animate turun
      let y = -80;
      const speed = 6 + Math.random() * 3; // variasi

      const moveInterval = setInterval(() => {
        if (!carRunActive) {
          clearInterval(moveInterval);
          obs.remove();
          return;
        }

        y += speed;
        obs.style.top = y + "px";

        // collision check (simple)
        const playerRect = player.getBoundingClientRect();
        const obsRect = obs.getBoundingClientRect();

        const hit =
          !(playerRect.right < obsRect.left ||
            playerRect.left > obsRect.right ||
            playerRect.bottom < obsRect.top ||
            playerRect.top > obsRect.bottom);

        if (hit) {
          carRunCollision = true;
          // efek kecil: obstacle hilang
          clearInterval(moveInterval);
          obs.style.opacity = "0";
          setTimeout(() => obs.remove(), 100);
        }

        // keluar layar
        if (y > 500) {
          clearInterval(moveInterval);
          obs.remove();
        }
      }, 30);

    }, 800);

    // countdown finish
    carRunCountdownInterval = setInterval(() => {
      if (!carRunActive) return;

      carRunTimer--;
      timerBox.textContent = carRunTimer;

      if (carRunTimer <= 0) finishCarRun();

    }, 1000);

    function finishCarRun() {
      carRunActive = false;
      clearInterval(carRunObstacleInterval);
      clearInterval(carRunCountdownInterval);

      // cleanup listener
      window.removeEventListener("keydown", onKey);

      // kasih dialog singkat (optional)
      dialogBox.classList.remove("hidden");
      dialogSpeaker.textContent = "Syabil";
      dialogText.textContent = carRunCollision
        ? "Aduh... hampir nabrak! Tapi Syabil sudah sampai sekolah."
        : "Yey! Syabil sampai sekolah dengan aman.";

      // next → masuk school (pakai click sekali)
      const oldHandler = dialogNext.onclick;
      dialogNext.onclick = () => {
        // balikin handler default
        dialogNext.onclick = null;

        // close dialog
        dialogBox.classList.add("hidden");

        // lanjut normal ke school
        gameState.chapter = 4;
        gameState.afterAction = false;
        switchRoom("school");
        showDialog();

        // restore (kalau sebelumnya ada)
        if (oldHandler) dialogNext.addEventListener("click", oldHandler);
      };
    }
  }

  /* =====================
     START GAME
  ===================== */
  switchRoom("room");
  showDialog();

});
