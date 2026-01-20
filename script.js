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

  let stars = 0;
  let dressOn = false;
  let activeTab = "child";

  const quest = {
    child: { wakeUp: false, eat: false, school: false },
    father: { eat: false, office: false },
    mother: { eat: false, market: false }
  };

  function addStar(n = 1) {
    stars += n;
    starEl.textContent = stars;
  }

  function switchRoom(name) {
    rooms.forEach(r => r.classList.remove("active"));
    document.querySelector(`.${name}`)?.classList.add("active");
  }

  function getChild() {
    return document.querySelector(".room.active .person.child img");
  }

  function jumpChild() {
    const child = getChild();
    if (!child) return;
    child.classList.add("jump");
    setTimeout(() => child.classList.remove("jump"), 300);
  }

  function renderQuest() {
    questList.innerHTML = "";

    if (activeTab === "child") {
      addQuestItem("Syabil bangun tidur", quest.child.wakeUp);
      addQuestItem("Syabil makan pagi", quest.child.eat);
      addQuestItem("Syabil berangkat sekolah", quest.child.school);
    }

    if (activeTab === "father") {
      addQuestItem("Papa makan pagi", quest.father.eat);
      addQuestItem("Papa pergi ke kantor", quest.father.office);
    }

    if (activeTab === "mother") {
      addQuestItem("Mama makan pagi", quest.mother.eat);
      addQuestItem("Mama pergi ke market", quest.mother.market);
    }
  }

  function addQuestItem(text, done) {
    const li = document.createElement("li");
    li.textContent = (done ? "✅ " : "⬜ ") + text;
    if (done) li.classList.add("done");
    questList.appendChild(li);
  }

  btnQuest.addEventListener("click", () => {
    questPanel.classList.toggle("hidden");
    renderQuest();
  });

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      activeTab = index === 0 ? "child" : index === 1 ? "father" : "mother";
      renderQuest();
    });
  });

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.area;
      if (target === "school" && (!quest.child.wakeUp || !quest.child.eat)) return;
      if (target === "office" && !quest.father.eat) return;
      if (target === "market" && !quest.mother.eat) return;

      switchRoom(target);

      if (target === "school" && !quest.child.school) {
        quest.child.school = true;
        addStar(2);
      }
      if (target === "office" && !quest.father.office) {
        quest.father.office = true;
        addStar(2);
      }
      if (target === "market" && !quest.mother.market) {
        quest.mother.market = true;
        addStar(2);
      }
    });
  });

  bed?.addEventListener("click", () => {
    switchRoom("bedroom");
    setTimeout(() => {
      quest.child.wakeUp = true;
      addStar(1);
      jumpChild();
    }, 100);
  });

  wardrobe?.addEventListener("click", () => {
    switchRoom("bedroom");
    setTimeout(() => {
      const child = getChild();
      dressOn = !dressOn;
      child.src = dressOn ? "./assets/child-dress.png" : "./assets/child.png";
      addStar(1);
      jumpChild();
    }, 100);
  });

  foods.forEach(food => {
    food.addEventListener("click", () => {
      switchRoom("kitchen");
      setTimeout(() => {
        if (!quest.child.eat) { quest.child.eat = true; addStar(1); }
        if (!quest.father.eat) { quest.father.eat = true; addStar(1); }
        if (!quest.mother.eat) { quest.mother.eat = true; addStar(1); }
      }, 100);
    });
  });

});
