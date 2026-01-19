document.addEventListener("DOMContentLoaded", () => {

  const starEl = document.getElementById("star-count");
  const navButtons = document.querySelectorAll(".nav button");
  const rooms = document.querySelectorAll(".room");

  const bed = document.querySelector(".bed");
  const wardrobe = document.querySelector(".wardrobe");
  const foods = document.querySelectorAll(".food");

  const btnQuest = document.getElementById("btn-quest");
  const questPanel = document.getElementById("quest-panel");

  const qWake = document.getElementById("q-wakeup");
  const qEat = document.getElementById("q-eat");
  const qSchool = document.getElementById("q-school");

  let stars = 0;
  let dressOn = false;

  const quest = {
    wakeUp: false,
    eat: false,
    school: false
  };

  /* UTIL */
  function addStar(n = 1) {
    stars += n;
    starEl.textContent = stars;
  }

  function switchRoom(name) {
    rooms.forEach(r => r.classList.remove("active"));
    document.querySelector(`.${name}`)?.classList.add("active");
  }

  function getChild() {
    return document.querySelector(".room.active .person img");
  }

  function jump() {
    const child = getChild();
    if (!child) return;
    child.classList.add("jump");
    setTimeout(() => child.classList.remove("jump"), 300);
  }

  function updateQuestUI() {
    if (quest.wakeUp) qWake.classList.add("done");
    if (quest.eat) qEat.classList.add("done");
    if (quest.school) qSchool.classList.add("done");
  }

  /* QUEST PANEL */
  btnQuest.addEventListener("click", () => {
    questPanel.classList.toggle("hidden");
  });

  /* NAV */
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.area;

      if (target === "school" && !quest.wakeUp) return;
      if (target === "school" && !quest.eat) return;

      switchRoom(target);

      if (target === "school" && !quest.school) {
        quest.school = true;
        addStar(2);
        updateQuestUI();
      }
    });
  });

  /* BED */
  bed.addEventListener("click", () => {
    switchRoom("bedroom");
    setTimeout(() => {
      quest.wakeUp = true;
      addStar();
      jump();
      updateQuestUI();
    }, 100);
  });

  /* DRESS */
  wardrobe.addEventListener("click", () => {
    switchRoom("bedroom");
    setTimeout(() => {
      const child = getChild();
      dressOn = !dressOn;
      child.src = dressOn
        ? "./assets/child-dress.png"
        : "./assets/child.png";
      addStar();
      jump();
    }, 100);
  });

  /* FOOD */
  foods.forEach(food => {
    food.addEventListener("click", () => {
      if (!quest.wakeUp) return;
      switchRoom("kitchen");
      setTimeout(() => {
        quest.eat = true;
        addStar();
        jump();
        updateQuestUI();
      }, 100);
    });
  });

});
