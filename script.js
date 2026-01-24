/* =====================
   SELECTORS
===================== */
const rooms = document.querySelectorAll(".room");
const startBtn = document.querySelector(".start-btn");

const dialogBox = document.querySelectorAll(".dialog-box");
const dialogText = document.querySelectorAll(".dialog-text");
const nextBtn = document.querySelectorAll(".next-btn");

const houseIcon = document.querySelector(".house-icon");
const schoolIcon = document.querySelector(".school-icon");
const carEl = document.querySelector(".car");

const shootBtn = document.querySelector(".shoot-btn");
const basketResult = document.querySelector(".basket-result");
const powerEl = document.querySelector(".power");

/* =====================
   TAPRUN selectors (NEW)
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
   GAME STATE
===================== */
const gameState = {
  chapter: 1,
  afterAction: false,
  syabilOutfit: "piyama", // piyama / seragam / sport
};

/* =====================
   BACKGROUND
===================== */
function loadRoomBackground(roomName) {
  const room = document.querySelector(`.${roomName}`);
  const bg = room?.querySelector(".background");
  if (!bg) return;

  if (roomName === "room") bg.style.backgroundImage = "url('./assets/background/room.png')";
  if (roomName === "kitchen") bg.style.backgroundImage = "url('./assets/background/kitchen.png')";
  if (roomName === "map") bg.style.backgroundImage = "url('./assets/background/map.png')";
  if (roomName === "school") bg.style.backgroundImage = "url('./assets/background/school.png')";
  if (roomName === "basket") bg.style.backgroundImage = "url('./assets/background/basket.png')";
  if (roomName === "home") bg.style.backgroundImage = "url('./assets/background/home.png')";
  if (roomName === "bedroom") bg.style.backgroundImage = "url('./assets/background/bedroom.png')";
}

/* =====================
   SWITCH ROOM
===================== */
function switchRoom(name) {
  rooms.forEach(r => r.classList.remove("active"));
  const room = document.querySelector(`.${name}`);
  room.classList.add("active");

  loadRoomBackground(name);
  updateSyabilOutfit();
  updateTapRunOutfit(); // ✅ ensure car icon ready
}

/* =====================
   OUTFIT
===================== */
function updateSyabilOutfit() {
  const allSyabil = document.querySelectorAll(".person.child img");

  let src = "./assets/piyama.png";
  if (gameState.syabilOutfit === "seragam") src = "./assets/child.png";
  if (gameState.syabilOutfit === "sport") src = "./assets/child_sport.png";

  allSyabil.forEach(img => (img.src = src));
}

// Taprun always uses car
function updateTapRunOutfit() {
  if (!tapRunPlayerImg) return;
  tapRunPlayerImg.src = "./assets/car.png";
}

/* =====================
   DIALOG DATA (ORIGINAL)
   BAB 1 sampai BAB Syabil pulang & cari papa mama
   (Aku tidak ubah sesuai permintaan kamu)
===================== */
const dialogs = [
  // BAB 1
  "Syabil: Hmm... sudah pagi ya. Hari ini sekolah!",
  "Syabil: Aku harus bangun dulu.",
  "Syabil: Aku mau ke dapur cari sarapan.",

  // BAB 2 (kitchen)
  "Syabil: Wah ada makanan enak!",
  "Syabil: Aku makan dulu ya.",
  "Syabil: Oke! Sekarang waktunya berangkat ke sekolah.",

  // BAB 3 (map)
  "Syabil: Aku mau ke sekolah dulu!",

  // BAB 4 (school)
  "Miss Putri: Selamat pagi Syabil!",
  "Syabil: Selamat pagi Miss Putri!",
  "Miss Putri: Hari ini kita latihan basket ya!",

  // BAB 5 (basket mini game)
  "Syabil: Aku harus fokus shooting bola!",

  // BAB 6 (home)
  "Syabil: Aku sudah sampai di rumah!",
  "Syabil: Mama papa dimana ya?",

  // BAB 7 (bedroom papa mama)
  "Papa: Halo Syabil!",
  "Mama: Syabil sudah pulang ya sayang 💖",
];

/* =====================
   DIALOG ENGINE
===================== */
function showDialog() {
  // determine active room
  const activeRoom = document.querySelector(".room.active");
  const idx = Array.from(rooms).indexOf(activeRoom);

  const box = activeRoom.querySelector(".dialog-box");
  const textEl = activeRoom.querySelector(".dialog-text");

  if (!box || !textEl) return;

  box.classList.remove("hidden");

  const d = dialogs[gameState.chapter - 1];
  textEl.textContent = d || "";
}

function hideDialog() {
  const activeRoom = document.querySelector(".room.active");
  const box = activeRoom.querySelector(".dialog-box");
  if (box) box.classList.add("hidden");
}

/* =====================
   NEXT BUTTON HANDLER
===================== */
nextBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    // Flow chapters
    gameState.chapter++;

    // CHAPTER transitions (sesuai flow kamu)
    if (gameState.chapter === 4) {
      // after kitchen -> map
      switchRoom("map");
      showDialog();
      return;
    }

    if (gameState.chapter === 8) {
      // after school -> basket mini game
      switchRoom("basket");
      hideDialog();
      startBasketMiniGame();
      return;
    }

    if (gameState.chapter === 9) {
      // after basket -> home
      switchRoom("home");
      showDialog();
      return;
    }

    if (gameState.chapter === 11) {
      // after home -> bedroom papa mama
      switchRoom("bedroom");
      showDialog();
      return;
    }

    // default
    showDialog();
  });
});

/* =====================
   START BUTTON
===================== */
startBtn?.addEventListener("click", () => {
  gameState.chapter = 1;
  switchRoom("room");
  showDialog();
});

/* =====================
   MAP CLICK HANDLER (UPDATED)
   Klik sekolah: mobil jalan -> masuk Car Rush (1 menit) -> baru school
===================== */
schoolIcon?.addEventListener("click", () => {
  // mobil muncul dan jalan
  carEl.classList.remove("hidden");
  carEl.style.left = "680px";

  // after animation
  setTimeout(() => {
    carEl.classList.add("hidden");
    carEl.style.left = "100px";

    // ✅ masuk mini game car rush dulu
    switchRoom("taprun");
    startTapRun();
  }, 1300);
});

houseIcon?.addEventListener("click", () => {
  // kalau ada fungsional lain nanti
});

/* =====================
   BASKET MINI GAME (ORIGINAL)
===================== */
let power = 0;
let powerDir = 1;
let powerInterval = null;

function startBasketMiniGame() {
  basketResult.textContent = "";
  power = 0;
  powerDir = 1;

  clearInterval(powerInterval);
  powerInterval = setInterval(() => {
    power += powerDir * 2;
    if (power >= 100) powerDir = -1;
    if (power <= 0) powerDir = 1;

    powerEl.style.width = power + "%";
  }, 40);
}

shootBtn?.addEventListener("click", () => {
  clearInterval(powerInterval);

  // simple result
  if (power >= 45 && power <= 70) basketResult.textContent = "🏀 MASUK! Hebat!";
  else basketResult.textContent = "😅 Hampir masuk, coba lagi!";

  // continue story
  setTimeout(() => {
    gameState.chapter++; // lanjut setelah basket
    switchRoom("home");
    showDialog();
  }, 1200);
});

/* =====================
   🚗 CAR RUSH MINI GAME (1 MINUTE SURVIVE)
===================== */
let taprunLane = 1; // 0 left, 1 mid, 2 right
let taprunScore = 0;
let taprunCoins = 0;
let taprunSpeed = 3.4;
let taprunRunning = false;
let taprunLoop = null;
let taprunSpawnObs = null;
let taprunSpawnCoin = null;

let taprunTimeLeft = 60;
let taprunTimerInt = null;

function laneX(lane) {
  if (lane === 0) return 30;
  if (lane === 1) return 50;
  return 70;
}

function setPlayerLane(lane) {
  taprunLane = Math.max(0, Math.min(2, lane));
  tapRunPlayer.style.left = laneX(taprunLane) + "%";
}

function spawnObstacle() {
  const obs = document.createElement("img");
  obs.className = "taprun-obstacle";
  obs.src = "./assets/icons/obstacle.png";
  obs.dataset.type = "obstacle";
  obs.dataset.lane = String(Math.floor(Math.random() * 3));
  obs.style.left = laneX(Number(obs.dataset.lane)) + "%";
  obs.style.transform = "translateX(-50%)";
  document.querySelector(".taprun-ui").appendChild(obs);
}

function spawnCoin() {
  const coin = document.createElement("img");
  coin.className = "taprun-coin";
  coin.src = "./assets/icons/coin.png";
  coin.dataset.type = "coin";
  coin.dataset.lane = String(Math.floor(Math.random() * 3));
  coin.style.left = laneX(Number(coin.dataset.lane)) + "%";
  coin.style.transform = "translateX(-50%)";
  document.querySelector(".taprun-ui").appendChild(coin);
}

function clearTapRunObjects() {
  document
    .querySelectorAll(".taprun-obstacle, .taprun-coin")
    .forEach(el => el.remove());
}

function stopTapRunLoops() {
  clearInterval(taprunLoop);
  clearInterval(taprunSpawnObs);
  clearInterval(taprunSpawnCoin);
  clearInterval(taprunTimerInt);
}

function startTapRun() {
  // reset
  taprunScore = 0;
  taprunCoins = 0;
  taprunSpeed = 3.4;
  taprunRunning = true;

  taprunTimeLeft = 60;
  tapRunTimerEl.textContent = "Time: 60";
  tapRunTimerEl.style.background = "#000";

  tapRunResult.classList.add("hidden");
  tapRunSummary.textContent = "";

  tapRunScoreEl.textContent = "Score: 0";
  tapRunCoinsEl.textContent = "Coins: 0";

  clearTapRunObjects();
  setPlayerLane(1);
  updateTapRunOutfit();

  // timer countdown
  clearInterval(taprunTimerInt);
  taprunTimerInt = setInterval(() => {
    if (!taprunRunning) return;

    taprunTimeLeft--;
    tapRunTimerEl.textContent = "Time: " + taprunTimeLeft;

    if (taprunTimeLeft <= 10) tapRunTimerEl.style.background = "#ff2d2d";
    else tapRunTimerEl.style.background = "#000";

    if (taprunTimeLeft <= 0) {
      winTapRun();
    }
  }, 1000);

  // spawn loops
  clearInterval(taprunSpawnObs);
  clearInterval(taprunSpawnCoin);

  taprunSpawnObs = setInterval(spawnObstacle, 720);
  taprunSpawnCoin = setInterval(spawnCoin, 520);

  // main loop
  clearInterval(taprunLoop);
  taprunLoop = setInterval(() => {
    if (!taprunRunning) return;

    const ui = document.querySelector(".taprun-ui");
    const H = ui.getBoundingClientRect().height;

    document.querySelectorAll(".taprun-obstacle, .taprun-coin").forEach(el => {
      const y = (parseFloat(el.dataset.y || "0") + taprunSpeed);
      el.dataset.y = String(y);
      el.style.top = y + "px";

      // score = obstacle passed
      if (el.dataset.type === "obstacle" && !el.dataset.passed && y > 270) {
        el.dataset.passed = "1";
        taprunScore++;
        tapRunScoreEl.textContent = "Score: " + taprunScore;
      }

      // collision zone near car
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

      // cleanup
      if (y > H + 80) el.remove();
    });

    // difficulty
    taprunSpeed += 0.008;
  }, 16);
}

function winTapRun() {
  if (!taprunRunning) return;

  taprunRunning = false;
  stopTapRunLoops();

  const reward = taprunCoins + 10;

  tapRunSummary.innerHTML =
    `✅ Kamu tidak terlambat!<br>` +
    `Waktu: <b>60 detik</b><br>` +
    `Rintangan terlewati: <b>${taprunScore}</b><br>` +
    `Coins diambil: <b>${taprunCoins}</b><br>` +
    `Reward: <b>+${reward}</b> coin`;

  tapRunResult.classList.remove("hidden");
  tapRunResult.dataset.reward = String(reward);
  tapRunResult.dataset.status = "win";
}

function loseTapRun() {
  if (!taprunRunning) return;

  taprunRunning = false;
  stopTapRunLoops();

  tapRunSummary.innerHTML =
    `❌ Kamu menabrak!<br>` +
    `Sisa waktu: <b>${taprunTimeLeft}s</b><br>` +
    `Rintangan terlewati: <b>${taprunScore}</b><br>` +
    `Coins diambil: <b>${taprunCoins}</b><br><br>` +
    `<b>Kamu harus menang dulu ya supaya tidak terlambat 😄</b>`;

  tapRunResult.classList.remove("hidden");
  tapRunResult.dataset.reward = "0";
  tapRunResult.dataset.status = "lose";
}

/* input: tap left right */
tapRunTouchLeft?.addEventListener("click", () => {
  if (!taprunRunning) return;
  setPlayerLane(taprunLane - 1);
});

tapRunTouchRight?.addEventListener("click", () => {
  if (!taprunRunning) return;
  setPlayerLane(taprunLane + 1);
});

/* restart */
tapRunRestartBtn?.addEventListener("click", () => {
  startTapRun();
});

/* continue -> only if win */
tapRunContinueBtn?.addEventListener("click", () => {
  const status = tapRunResult.dataset.status;

  if (status !== "win") return;

  tapRunResult.classList.add("hidden");
  clearTapRunObjects();

  // lanjut story (school dialog)
  // chapter harus menuju bab 4 dialog miss putri
  // (bab 4 dimulai di dialog index 7 di dialogs list)
  gameState.chapter = 4;
  gameState.afterAction = false;

  switchRoom("school");
  showDialog();
});
