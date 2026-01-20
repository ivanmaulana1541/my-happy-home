document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     ELEMENT
  ===================== */
  const rooms = document.querySelectorAll(".room");
  const navButtons = document.querySelectorAll(".nav button");
  const wardrobe = document.querySelector(".wardrobe");
  const foods = document.querySelectorAll(".food");
  const feedback = document.getElementById("feedback");

  /* =====================
     GAME STATE
  ===================== */
  let currentRoom = "bedroom";

  const state = {
    child: {
      dressedSchool: false,
      yoga: false,
      dufan: false
    },
    mother: {
      yoga: false,
      dufan: false
    },
    father: {
      dufan: false
    }
  };

  /* =====================
     UTIL
  ===================== */
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

  function getChar(role) {
    return document.querySelector(`.${currentRoom} .person.${role} img`);
  }

  /* =====================
     START GAME
  ===================== */
  showRoom("bedroom");

  /* =====================
     NAVIGATION
  ===================== */
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.area;

      if (target === "market" && !state.mother.yoga) {
        say("Mama harus yoga dulu 🧘");
        return;
      }

      if (target === "dufan") {
        if (!state.child.dufan || !state.mother.dufan || !state.father.dufan) {
          say("Semua harus siap Dufan 🎒");
          return;
        }
        say("Yeay! Ke Dufan 🎢");
      }

      showRoom(target);
    });
  });

  /* =====================
     WARDROBE (CONTEXT AWARE)
  ===================== */
  wardrobe?.addEventListener("click", () => {

    /* SYABIL */
    const child = getChar("child");
    if (child && !state.child.dressedSchool) {
      child.src = "./assets/child-dress.png";
      state.child.dressedSchool = true;
      say("Syabil ganti baju sekolah 👕");
      return;
    }

    /* MAMA */
    const mother = getChar("mother");
    if (mother && !state.mother.yoga) {
      mother.src = "./assets/mamayoga.png";
      state.mother.yoga = true;
      say("Mama siap yoga 🧘");
      return;
    }

    /* DUFAN MODE */
    if (child && !state.child.dufan) {
      child.src = "./assets/syabildufan.png";
      state.child.dufan = true;
      say("Syabil siap ke Dufan 🎒");
      return;
    }

    if (mother && !state.mother.dufan) {
      mother.src = "./assets/mamadufan.png";
      state.mother.dufan = true;
      say("Mama siap ke Dufan 🎒");
      return;
    }

    const father = getChar("father");
    if (father && !state.father.dufan) {
      father.src = "./assets/papadufan.png";
      state.father.dufan = true;
      say("Papa siap ke Dufan 🎒");
      return;
    }

    say("Semua sudah siap 👍");
  });

  /* =====================
     FOOD
  ===================== */
  foods.forEach(food => {
    food.addEventListener("click", () => {
      say("Keluarga sudah makan 🍽️");
    });
  });

});
