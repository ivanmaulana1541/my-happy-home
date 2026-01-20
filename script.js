document.addEventListener("DOMContentLoaded", () => {

  const btnQuest = document.getElementById("btn-quest");
  const questPanel = document.getElementById("quest-panel");
  const tabs = document.querySelectorAll(".quest-tabs .tab");
  const questList = questPanel.querySelector("ul");

  let activeTab = "child";

  const quest = {
    child: {
      dressSchool: false,
      eat: false,
      school: false
    },
    mother: {
      eat: false,
      yoga: false
    },
    father: {
      eat: false,
      office: false
    }
  };

  /* =====================
     FORCE QUEST OPEN
  ===================== */
  questPanel.classList.remove("hidden");
  questPanel.classList.add("slide-in");

  /* =====================
     QUEST RENDER
  ===================== */
  function renderQuest() {
    questList.innerHTML = "";

    if (activeTab === "child") {
      addItem("Ganti baju sekolah", quest.child.dressSchool);
      addItem("Sarapan di dapur", quest.child.eat);
      addItem("Berangkat ke sekolah", quest.child.school);
    }

    if (activeTab === "mother") {
      addItem("Sarapan di dapur", quest.mother.eat);
      addItem("Yoga bersama Syabil", quest.mother.yoga);
    }

    if (activeTab === "father") {
      addItem("Sarapan di dapur", quest.father.eat);
      addItem("Pergi ke kantor", quest.father.office);
    }
  }

  function addItem(text, done) {
    const li = document.createElement("li");
    li.textContent = (done ? "✅ " : "⬜ ") + text;
    questList.appendChild(li);
  }

  /* =====================
     QUEST BUTTON
  ===================== */
  btnQuest.addEventListener("click", () => {
    questPanel.classList.toggle("hidden");
  });

  /* =====================
     QUEST TABS
  ===================== */
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      activeTab = tab.dataset.tab;
      renderQuest();
    });
  });

  /* INIT */
  renderQuest();
});
