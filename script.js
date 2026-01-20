document.addEventListener("DOMContentLoaded", () => {

  const starEl = document.getElementById("star-count");
  const navButtons = document.querySelectorAll(".nav button");
  const rooms = document.querySelectorAll(".room");

  const bed = document.querySelector(".bed");
  const wardrobe = document.querySelector(".wardrobe");
  const foods = document.querySelectorAll(".food");

  const btnQuest = document.getElementById("btn-quest");
  const questPanel = document.getElementById("quest-panel");
  const tabs = document.querySelectorAll(".quest-tabs .tab");
  const questList = questPanel.querySelector("ul");

  const homeIcon = document.querySelector(".home-icon");

  /* =====================
     FEEDBACK SYSTEM
  ===================== */
  const feedbackEl = document.getElementById("feedback");
  let feedbackTimeout = null;

  function showFeedback(text) {
    if (!feedbackEl) return;

    feedbackEl.textContent = text;
    feedbackEl.classList.remove("hidden");

    if (feedbackTimeout) clearTimeout(feedbackTimeout);

    feedbackTimeout = setTimeout(() => {
      feedbackEl.classList.add("hidden");
    }, 2000);
  }

  /* =====================
     BASIC ROOM SWITCH
  ===================== */
  function switchRoom(name) {
    rooms.forEach(r => r.classList.remove("active"));
    document.querySelector(`.${name}`)?.classList.add("active");
  }

  /* =====================
     TEMP NAV (BELUM DIKUNCI)
  ===================== */
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      switchRoom(btn.dataset.area);
    });
  });

  homeIcon?.addEventListener("click", () => {
    switchRoom("home");
  });

  /* =====================
     QUEST & INTERACTION
     (BELUM DIUBAH)
  ===================== */

});
