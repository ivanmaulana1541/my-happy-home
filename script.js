document.addEventListener("DOMContentLoaded", () => {

  const rooms = document.querySelectorAll(".room");
  const navButtons = document.querySelectorAll(".nav button");
  const questBtn = document.getElementById("btn-quest");
  const questPanel = document.getElementById("quest-panel");
  const questTitle = document.getElementById("quest-title");
  const questList = document.getElementById("quest-list");

  let activeCharacter = "syabil";

  const quests = {
    syabil: [
      { text: "Bangun (kamar)", done: false },
      { text: "Makan", done: false },
      { text: "Sekolah", done: false },
      { text: "Pulang ke Home", done: false }
    ],
    papa: [
      { text: "Bangun (kamar orang tua)", done: false },
      { text: "Makan", done: false },
      { text: "Ke Kantor", done: false },
      { text: "Pulang ke Home", done: false }
    ],
    mama: [
      { text: "Bangun (kamar orang tua)", done: false },
      { text: "Makan", done: false },
      { text: "Ke Market", done: false },
      { text: "Pulang ke Home", done: false }
    ]
  };

  function switchRoom(name) {
    rooms.forEach(r => r.classList.remove("active"));
    document.querySelector(`.room.${name}`)?.classList.add("active");
  }

  function renderQuest() {
    questList.innerHTML = "";
    questTitle.textContent = `📋 Quest ${activeCharacter.charAt(0).toUpperCase() + activeCharacter.slice(1)}`;

    quests[activeCharacter].forEach(q => {
      const li = document.createElement("li");
      li.textContent = q.text;
      if (q.done) li.style.textDecoration = "line-through";
      questList.appendChild(li);
    });
  }

  questBtn.onclick = () => {
    questPanel.classList.toggle("hidden");
  };

  navButtons.forEach(btn => {
    btn.onclick = () => switchRoom(btn.dataset.area);
  });

  /* =====================
   MAP CLICK (WAJIB)
===================== */
document.querySelectorAll(".map-location").forEach(loc => {
  loc.addEventListener("click", () => {
    const target = loc.dataset.target;
    if (!target) return;
    switchRoom(target);
  });
});


  document.querySelectorAll("[data-action='wake']").forEach(el => {
    el.onclick = () => {
      quests[activeCharacter][0].done = true;
      renderQuest();
    };
  });

  document.querySelectorAll("[data-action='eat']").forEach(el => {
    el.onclick = () => {
      quests[activeCharacter][1].done = true;
      renderQuest();
    };
  });

  renderQuest();
});
