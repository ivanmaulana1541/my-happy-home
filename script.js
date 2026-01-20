document.addEventListener("DOMContentLoaded", () => {

  const rooms = document.querySelectorAll(".room");
  const navButtons = document.querySelectorAll(".nav button");
  const wardrobe = document.querySelectorAll(".wardrobe");
  const foods = document.querySelectorAll(".food");
  const dialog = document.getElementById("dialog");

  let currentRoom = "room";

  const state = {
    child: { schoolDress:false, eat:false, school:false, yoga:false, dufan:false },
    mother:{ eat:false, market:false, yoga:false, dufan:false },
    father:{ eat:false, office:false, dufan:false }
  };

  function showRoom(name) {
    rooms.forEach(r => r.classList.remove("active"));
    document.querySelector(`.${name}`)?.classList.add("active");
    currentRoom = name;
    roomDialog();
  }

  function say(text) {
    dialog.textContent = text;
    dialog.classList.remove("hidden");
    setTimeout(() => dialog.classList.add("hidden"), 2200);
  }

  function roomDialog() {
    if (currentRoom === "room" && !state.child.schoolDress)
      say("Hari ini aku sekolah. Aku harus ganti baju dulu.");
    if (currentRoom === "kitchen" && !state.child.eat)
      say("Aku lapar... sarapan dulu yuk.");
    if (currentRoom === "school")
      say("Belajar dulu, nanti main!");
    if (currentRoom === "market")
      say("Mama belanja dulu ya.");
    if (currentRoom === "office")
      say("Papa bekerja dulu.");
    if (currentRoom === "dufanroom")
      say("Yeay! Kita pergi bersama!");
  }

  wardrobe.forEach(w => {
    w.onclick = () => {
      if (currentRoom === "room" && !state.child.schoolDress) {
        state.child.schoolDress = true;
        say("Aku sudah pakai seragam sekolah!");
        return;
      }
      if (currentRoom === "bedroom" && !state.mother.yoga) {
        state.mother.yoga = true;
        say("Mama siap yoga.");
        return;
      }
      if (!state.child.dufan && !state.mother.dufan && !state.father.dufan) {
        state.child.dufan = state.mother.dufan = state.father.dufan = true;
        say("Semua sudah siap ke Dufan!");
      }
    };
  });

  foods.forEach(f => {
    f.onclick = () => {
      state.child.eat = state.mother.eat = state.father.eat = true;
      say("Perut kenyang, semangat!");
    };
  });

  navButtons.forEach(btn => {
    btn.onclick = () => {
      const target = btn.dataset.area;
      if (target === "school" && !state.child.schoolDress) {
        say("Aku harus ganti baju dulu.");
        return;
      }
      showRoom(target);
    };
  });

  showRoom("room");
});
