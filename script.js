document.addEventListener("DOMContentLoaded", () => {

  const rooms = document.querySelectorAll(".room");
  const navButtons = document.querySelectorAll(".nav button");
  const wardrobe = document.querySelectorAll(".wardrobe");
  const foods = document.querySelectorAll(".food");

  const questPanel = document.getElementById("quest-panel");
  const btnQuest = document.getElementById("btn-quest");
  const questList = document.getElementById("quest-list");
  const tabs = document.querySelectorAll(".tab");
  const feedback = document.getElementById("feedback");

  let currentRoom = "room";
  let activeTab = "child";

  const state = {
    child: {
      schoolDress: false,
      eat: false,
      school: false,
      yogaDress: false,
      dufan: false
    },
    mother: {
      eat: false,
      market: false,
      yogaDress: false,
      yoga: false,
      dufan: false
    },
    father: {
      eat: false,
      office: false,
      dufan: false
    }
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
        ["Ganti baju sekolah", state.child.schoolDress],
        ["Makan", state.child.eat],
        ["Pergi ke sekolah", state.child.school],
        ["Ganti baju yoga", state.child.yogaDress],
        ["Ganti baju Dufan", state.child.dufan]
      ],
      mother: [
        ["Makan", state.mother.eat],
        ["Ke market", state.mother.market],
        ["Ganti baju yoga", state.mother.yogaDress],
        ["Yoga", state.mother.yoga],
        ["Ganti baju Dufan", state.mother.dufan]
      ],
      father: [
        ["Makan", state.father.eat],
        ["Ke kantor", state.father.office],
        ["Ganti baju Dufan", state.father.dufan]
      ]
    };

    quests[activeTab].forEach(([text, done]) => {
      const li = document.createElement("li");
      li.textContent = (done ? "✅ " : "⬜ ") + text;
      if (done) li.classList.add("done");
      questList.appendChild(li);
    });
  }

  btnQuest.onclick = () => questPanel.classList.toggle("hidden");

  tabs.forEach(tab => {
    tab.onclick = () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      activeTab = tab.dataset.tab;
      renderQuest();
    };
  });

  wardrobe.forEach(w => {
    w.onclick = () => {
      if (currentRoom === "room" && !state.child.schoolDress) {
        state.child.schoolDress = true;
        say("Syabil ganti baju sekolah 👕");
      } else if (currentRoom === "room" && !state.child.yogaDress) {
        state.child.yogaDress = true;
        say("Syabil ganti baju yoga 🧘");
      } else if (currentRoom === "bedroom" && !state.mother.yogaDress) {
        state.mother.yogaDress = true;
        say("Mama ganti baju yoga 🧘");
      } else if (!state.child.dufan && !state.mother.dufan && !state.father.dufan) {
        state.child.dufan = state.mother.dufan = state.father.dufan = true;
        say("Semua siap ke Dufan 🎢");
      }
      renderQuest();
    };
  });

  foods.forEach(f => {
    f.onclick = () => {
      state.child.eat = state.mother.eat = state.father.eat = true;
      say("Semua sudah makan 🍽️");
      renderQuest();
    };
  });

  navButtons.forEach(btn => {
    btn.onclick = () => {
      const target = btn.dataset.area;

      if (target === "school" && !state.child.schoolDress) {
        say("Syabil harus ganti baju dulu 👕");
        return;
      }

      if (target === "market" && !state.mother.eat) {
        say("Mama harus makan dulu 🍽️");
        return;
      }

      if (target === "yogaroom" && !(state.child.yogaDress && state.mother.yogaDress)) {
        say("Yoga harus bersama Mama & Syabil 🧘");
        return;
      }

      if (target === "dufanroom" && !(state.child.dufan && state.mother.dufan && state.father.dufan)) {
        say("Semua harus siap dulu 🎒");
        return;
      }

      if (target === "school") state.child.school = true;
      if (target === "office") state.father.office = true;
      if (target === "market") state.mother.market = true;
      if (target === "yogaroom") state.mother.yoga = true;

      showRoom(target);
      renderQuest();
    };
  });

  renderQuest(); // auto muncul di awal
});
