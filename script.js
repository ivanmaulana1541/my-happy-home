document.addEventListener("DOMContentLoaded", () => {

  const rooms = document.querySelectorAll(".room");
  const navButtons = document.querySelectorAll(".nav button");
  const wardrobe = document.querySelector(".wardrobe");
  const foods = document.querySelectorAll(".food");
  const feedback = document.getElementById("feedback");

  const btnQuest = document.getElementById("btn-quest");
  const questPanel = document.getElementById("quest-panel");
  const questList = document.getElementById("quest-list");
  const tabs = document.querySelectorAll(".quest-tabs .tab");

  let activeTab = "child";
  let currentRoom = "bedroom";

  const state = {
    child: { school: false, eat: false, schoolGo: false, dufan: false },
    father: { eat: false, office: false, dufan: false },
    mother: { eat: false, yoga: false, market: false, dufan: false }
  };

  function showRoom(name) {
    rooms.forEach(r => r.classList.remove("active"));
    document.querySelector(`.${name}`)?.classList.add("active");
    currentRoom = name;
  }

  function say(text) {
    feedback.textContent = text;
    feedback.classList.remove("hidden");
    setTimeout(() => feedback.classList.add("hidden"), 2000);
  }

  function renderQuest() {
    questList.innerHTML = "";

    const quests = {
      child: [
        ["Ganti baju sekolah", state.child.school],
        ["Makan", state.child.eat],
        ["Ke sekolah", state.child.schoolGo],
        ["Ganti baju Dufan", state.child.dufan],
        ["Ke Dufan", state.child.dufan]
      ],
      father: [
        ["Makan", state.father.eat],
        ["Ke kantor", state.father.office],
        ["Ganti baju Dufan", state.father.dufan],
        ["Ke Dufan", state.father.dufan]
      ],
      mother: [
        ["Makan", state.mother.eat],
        ["Yoga", state.mother.yoga],
        ["Ke market", state.mother.market],
        ["Ganti baju Dufan", state.mother.dufan],
        ["Ke Dufan", state.mother.dufan]
      ]
    };

    quests[activeTab].forEach(([text, done]) => {
      const li = document.createElement("li");
      li.textContent = (done ? "✅ " : "⬜ ") + text;
      if (done) li.classList.add("done");
      questList.appendChild(li);
    });
  }

  btnQuest.onclick = () => {
    questPanel.classList.toggle("hidden");
    renderQuest();
  };

  tabs.forEach(tab => {
    tab.onclick = () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      activeTab = tab.dataset.tab;
      renderQuest();
    };
  });

  foods.forEach(food => {
    food.onclick = () => {
      state.child.eat = true;
      state.father.eat = true;
      state.mother.eat = true;
      say("Semua sudah makan 🍽️");
    };
  });

  wardrobe.onclick = () => {
    state.child.school = true;
    state.mother.yoga = true;
    state.father.dufan = true;
    state.mother.dufan = true;
    state.child.dufan = true;
    say("Semua siap ✨");
  };

  navButtons.forEach(btn => {
    btn.onclick = () => {
      const target = btn.dataset.area;

      if (target === "market" && !state.mother.yoga) {
        say("Mama harus yoga dulu 🧘");
        return;
      }

      if (target === "school") state.child.schoolGo = true;
      if (target === "office") state.father.office = true;
      if (target === "market") state.mother.market = true;

      showRoom(target);
    };
  });

  showRoom("bedroom");

});
