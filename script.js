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
  const introStartBtn = document.querySelector(".intro-start-btn");

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

    // ✅ FORCE MATIKAN INTRO
    document.querySelector(".room.intro")?.classList.remove("active");

    const room = document.querySelector(`.${name}`);
    if (!room) {
      console.warn("Room tidak ditemukan:", name);
      return;
    }

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

      switchRoom("map");
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
  // ✅ INTRO START
  introStartBtn?.addEventListener("click", () => {
    gameState.chapter = 1;
    gameState.dialogIndex = 0;
    gameState.afterAction = false;
    gameState.quizStep = 0;
    gameState.waitingQuiz = false;
    gameState.syabilOutfit = "piyama";

    switchRoom("syabil-room");
    showDialog();
  });

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

  // MAP: klik sekolah -> masuk mini game car-run
  schoolIcon?.addEventListener("click", () => {
    if (story[gameState.chapter].action !== "goSchool") return;

    startCarRun();
    return;
  });

  // ✅ NEW: MAP klik rumah setelah basket selesai -> mobil school ke home -> masuk room + dialog sampai rumah
  homeIcon?.addEventListener("click", () => {
    if (!allowGoHomeClick) return;

    const mapRoom = document.querySelector(".room.map");
    if (!mapRoom || !car || !homeIcon || !schoolIcon) {
      switchRoom("home-room");
      showArrivedHomeDialog = true;
      showCustomDialog("Syabil", "Aku sudah sampai rumah.");
      allowGoHomeClick = false;
      return;
    }

    const mapRect = mapRoom.getBoundingClientRect();
    const startRect = schoolIcon.getBoundingClientRect();
    const endRect = homeIcon.getBoundingClientRect();

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

    homeIcon.style.pointerEvents = "none";
    schoolIcon.style.pointerEvents = "none";

    setTimeout(() => {
      car.classList.add("hidden");
      homeIcon.style.pointerEvents = "auto";
      schoolIcon.style.pointerEvents = "auto";

      switchRoom("home-room");

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
     🏀 BASKET GAME (FINAL + EFFECTS)
     ✅ parabola
     ✅ power mempengaruhi jarak
     ✅ swish / rim bounce / airball floor bounce
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

    // reset ball
    ball.style.opacity = "1";
    ball.style.transition = "none";
    ball.style.transform = "translate(0,0) scale(1)";

    clearInterval(interval);
    interval = setInterval(() => {
      power += direction * 2;
      if (power >= 100) direction = -1;
      if (power <= 0) direction = 1;
      powerIndicator.style.width = power + "%";
    }, 30);

    shootBtn.onclick = () => {
      if (basketScore >= 3) return;

      clearInterval(interval);

      const basketRoom = document.querySelector(".room.basket");
      const roomRect = basketRoom.getBoundingClientRect();

      const ballRect = ball.getBoundingClientRect();
      const ringRect = ring.getBoundingClientRect();

      const startX = (ballRect.left - roomRect.left) + ballRect.width / 2;
      const startY = (ballRect.top - roomRect.top) + ballRect.height / 2;

      const ringX = (ringRect.left - roomRect.left) + ringRect.width / 2;
      const ringY = (ringRect.top - roomRect.top) + ringRect.height / 2;

      ball.style.transition = "none";
      ball.style.opacity = "1";
      ball.style.transform = "translate(0,0) scale(1)";
      void ball.offsetWidth;

      const p = power;

      const idealPower = 65;
      const distanceFactor = 1 + ((p - idealPower) / 120);

      const targetX = startX + (ringX - startX) * distanceFactor;
      const targetY = ringY;

      const gravity = 0.55;
      const tMax = 38;

      const vx = (targetX - startX) / tMax;
      let vy = -(9 + (p * 0.17));

      let x = startX;
      let y = startY;
      let t = 0;

      let lastVx = vx;
      let lastVy = vy;

      shootBtn.disabled = true;

      function renderBall(posX, posY, scale = 1) {
        const dx = posX - startX;
        const dy = posY - startY;
        ball.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
      }

      function resetForNextShot(isScore) {
        shootBtn.disabled = false;

        if (isScore) {
          basketScore++;
          scoreBox.textContent = basketScore + " / 3";
        }

        setTimeout(() => {
          ball.style.transition = "none";
          ball.style.opacity = "1";
          ball.style.transform = "translate(0,0) scale(1)";

          if (basketScore < 3) {
            power = 0;
            direction = 1;

            clearInterval(interval);
            interval = setInterval(() => {
              power += direction * 2;
              if (power >= 100) direction = -1;
              if (power <= 0) direction = 1;
              powerIndicator.style.width = power + "%";
            }, 30);

          } else {
            clearInterval(interval);
            goHomeAfterBasketDialog = true;
            showCustomDialog("Syabil", "Yaaay! Syabil hebat! Sekarang waktunya pulang ke rumah.");
          }
        }, 100);
      }

      function floorBounce(fromX, fromY, vX, vY, bounces = 2) {
        const floorY = roomRect.height - 70;

        let px = fromX;
        let py = fromY;
        let vx2 = vX;
        let vy2 = vY;

        let bounceCount = 0;

        function step() {
          px += vx2;
          py += vy2;
          vy2 += gravity;

          renderBall(px, py, 1);

          if (py >= floorY) {
            py = floorY;

            vy2 = -Math.abs(vy2) * 0.52;
            vx2 *= 0.75;

            bounceCount++;

            ball.style.transition = "transform 0.06s ease";
            renderBall(px, py, 0.9);
            setTimeout(() => {
              ball.style.transition = "none";
            }, 70);

            if (bounceCount >= bounces) {
              setTimeout(() => {
                ball.style.transition = "opacity 0.25s ease";
                ball.style.opacity = "0";
              }, 120);

              setTimeout(() => {
                resetForNextShot(false);
              }, 450);

              return;
            }
          }

          requestAnimationFrame(step);
        }

        step();
      }

      function rimBounce() {
        ring.style.transition = "transform 0.08s ease";
        ring.style.transform = "scaleX(1.12)";
        setTimeout(() => {
          ring.style.transform = "scaleX(1)";
        }, 90);

        const dir = Math.random() < 0.5 ? -1 : 1;
        const bounceVX = dir * (4 + Math.random() * 3);
        const bounceVY = -(6 + Math.random() * 3);

        floorBounce(ringX, ringY, bounceVX, bounceVY, 2);
      }

      function swishDrop() {
        const dropX = ringX;
        const dropY1 = ringY + 22;
        const dropY2 = ringY + 120;

        ball.style.transition = "transform 0.18s ease, opacity 0.2s ease";
        renderBall(dropX, dropY1, 0.55);

        setTimeout(() => {
          ball.style.transition = "transform 0.35s ease";
          renderBall(dropX, dropY2, 0.75);
        }, 190);

        setTimeout(() => {
          ball.style.transition = "opacity 0.25s ease";
          ball.style.opacity = "0";
        }, 560);

        setTimeout(() => {
          resetForNextShot(true);
        }, 820);
      }

      function animate() {
        t++;

        x += lastVx;
        y += lastVy;
        lastVy += gravity;

        const s = 1 - Math.min(0.35, t / tMax * 0.35);

// ✅ AUTO-ASSIST: mendekati ring di akhir lintasan (biar gampang masuk)
if (t > tMax * 0.72) {
  const assist = 0.28; // 0.1 = lembut, 0.25 = kuat
  x += (ringX - x) * assist;
  y += (ringY - y) * assist * 0.35;
}

renderBall(x, y, s);

if (t < tMax) {
  requestAnimationFrame(animate);
  return;
}


        const distToRing = Math.hypot((x - ringX), (y - ringY));

// ✅ dibuat lebih mudah untuk anak
const SWISH_RANGE = 38;    // sebelumnya 22
const RIM_RANGE = 70;      // sebelumnya 46
const goodPower = (p >= 30 && p <= 95); // sebelumnya 50-80 (terlalu ketat)


        if (distToRing < SWISH_RANGE && goodPower) {
          swishDrop();
          return;
        }

        if (distToRing < RIM_RANGE) {
          rimBounce();
          return;
        }

        floorBounce(x, y, lastVx * 0.9, lastVy, 2);
      }

      requestAnimationFrame(animate);
    };
  } // ✅ end startBasketGame

  /* =====================
     🚗 CAR RUN MINI GAME
  ===================== */
  let carRunActive = false;
  let carRunTimer = 12;
  let carRunObstacleInterval = null;
  let carRunCountdownInterval = null;
  let carRunCollision = false;

  function startCarRun() {
    switchRoom("car-run");

    const player = document.querySelector(".car-run-player");
    const obstaclesWrap = document.querySelector(".car-run-obstacles");
    const timerBox = document.querySelector(".car-run-timer");
    const btnLeft = document.querySelector(".car-run-left");
    const btnRight = document.querySelector(".car-run-right");

    if (!player || !obstaclesWrap || !timerBox) {
      gameState.chapter = 4;
      gameState.afterAction = false;
      switchRoom("school");
      showDialog();
      return;
    }

    const road1 = document.querySelector(".road-1");
    const road2 = document.querySelector(".road-2");

    carRunActive = true;
    carRunCollision = false;
    carRunTimer = 12;
    timerBox.textContent = carRunTimer;

    let roadY1 = 0;
    let roadY2 = -100;
    const roadSpeed = 0.8;

    function updateRoad() {
      if (!carRunActive) return;

      roadY1 += roadSpeed;
      roadY2 += roadSpeed;

      if (roadY1 >= 100) roadY1 = -100;
      if (roadY2 >= 100) roadY2 = -100;

      if (road1) road1.style.top = roadY1 + "%";
      if (road2) road2.style.top = roadY2 + "%";

      requestAnimationFrame(updateRoad);
    }
    updateRoad();

    obstaclesWrap.innerHTML = "";

    const lanes = [37, 50, 63];
    let laneIndex = 1;

    function setLane(idx) {
      laneIndex = Math.max(0, Math.min(2, idx));
      player.style.left = lanes[laneIndex] + "%";
      player.style.transform = "translateX(-50%)";
    }
    setLane(1);

    let touchStartX = null;

player.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

player.addEventListener("touchend", (e) => {
  if (touchStartX === null) return;
  const endX = e.changedTouches[0].clientX;
  const diff = endX - touchStartX;

  if (diff > 40) setLane(laneIndex + 1);     // swipe kanan
  if (diff < -40) setLane(laneIndex - 1);    // swipe kiri

  touchStartX = null;
}, { passive: true });


    function onKey(e) {
      if (!carRunActive) return;
      if (e.key === "ArrowLeft") setLane(laneIndex - 1);
      if (e.key === "ArrowRight") setLane(laneIndex + 1);
    }
    window.addEventListener("keydown", onKey);

    const leftHandler = () => carRunActive && setLane(laneIndex - 1);
    const rightHandler = () => carRunActive && setLane(laneIndex + 1);
    btnLeft && btnLeft.addEventListener("click", leftHandler);
    btnRight && btnRight.addEventListener("click", rightHandler);

    carRunObstacleInterval = setInterval(() => {
      if (!carRunActive) return;

      const obs = document.createElement("img");
      obs.className = "car-run-obstacle";
      obs.src = "./assets/icons/mobil-lain.png";
      obs.alt = "obstacle";
      obs.draggable = false;

      const obsLane = Math.floor(Math.random() * 3);
      obs.style.left = lanes[obsLane] + "%";
      obs.style.transform = "translateX(-50%)";
      obstaclesWrap.appendChild(obs);

      let y = -80;
      const speed = 6 + Math.random() * 3;

      const moveInterval = setInterval(() => {
        if (!carRunActive) {
          clearInterval(moveInterval);
          obs.remove();
          return;
        }

        y += speed;
        obs.style.top = y + "px";

        const playerRect = player.getBoundingClientRect();
        const obsRect = obs.getBoundingClientRect();

        const hit =
          !(playerRect.right < obsRect.left ||
            playerRect.left > obsRect.right ||
            playerRect.bottom < obsRect.top ||
            playerRect.top > obsRect.bottom);

        if (hit) {
          carRunCollision = true;
          clearInterval(moveInterval);
          obs.style.opacity = "0";
          setTimeout(() => obs.remove(), 100);
        }

        if (y > 500) {
          clearInterval(moveInterval);
          obs.remove();
        }
      }, 30);

    }, 800);

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

      window.removeEventListener("keydown", onKey);

      dialogBox.classList.remove("hidden");
      dialogSpeaker.textContent = "Syabil";
      dialogText.textContent = carRunCollision
        ? "Aduh... hampir nabrak! Tapi Syabil sudah sampai sekolah."
        : "Yey! Syabil sampai sekolah dengan aman.";

      const handler = () => {
        dialogNext.removeEventListener("click", handler);

        dialogBox.classList.add("hidden");

        gameState.chapter = 4;
        gameState.afterAction = false;
        switchRoom("school");
        showDialog();
      };

      dialogNext.addEventListener("click", handler);
    }
  }

  /* =====================
     START GAME
  ===================== */
  switchRoom("intro");
  dialogBox.classList.add("hidden");

});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });
}
