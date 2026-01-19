// ===============================
// GAME STATE
// ===============================
let stars = 0;
let isSleeping = false;

// ===============================
// ELEMENTS
// ===============================
const starCountEl = document.getElementById("star-count");
const bedEl = document.querySelector(".bed");
const girlEl = document.querySelector(".girl");

// ===============================
// FUNCTIONS
// ===============================
function updateStars() {
  starCountEl.textContent = stars;
}

function sleepAction() {
  if (isSleeping) return;

  isSleeping = true;
  stars += 1;
  updateStars();

  // Change girl to sleeping
  girlEl.textContent = "😴";

  // Simple animation
  girlEl.style.transform = "scale(0.9)";

  // Wake up after 2 seconds
  setTimeout(() => {
    girlEl.textContent = "👧";
    girlEl.style.transform = "scale(1)";
    isSleeping = false;
  }, 2000);
}

// ===============================
// EVENTS
// ===============================
bedEl.addEventListener("click", sleepAction);

// ===============================
// INIT
// ===============================
updateStars();
console.log("Sleep system ready ⭐");
