const scenes = document.querySelectorAll(".scene");
const dialogText = document.getElementById("dialog-text");
const dialogActions = document.getElementById("dialog-actions");
const syabil = document.getElementById("char-syabil");
const syabilKitchen = document.getElementById("char-syabil-kitchen");

let state = {
  step: "wake"
};

function showScene(name) {
  scenes.forEach(s => s.classList.remove("active"));
  document.querySelector(`[data-scene="${name}"]`).classList.add("active");
}

function dialog(text, actions = []) {
  dialogText.textContent = text;
  dialogActions.innerHTML = "";
  actions.forEach(a => {
    const btn = document.createElement("button");
    btn.textContent = a.label;
    btn.onclick = a.action;
    dialogActions.appendChild(btn);
  });
}

dialog(
  "Syabil masih memakai piyama. Ia harus ganti baju dulu.",
  [
    {
      label: "Ganti Baju Sekolah",
      action: () => {
        syabil.style.backgroundImage = "url('./assets/child.png')";
        state.step = "readyToKitchen";
        dialog("Syabil sudah siap. Saatnya keluar kamar.");
      }
    }
  ]
);

document.addEventListener("click", e => {
  const act = e.target.dataset.action;

  if (act === "toKitchen" && state.step === "readyToKitchen") {
    showScene("kitchen");
    syabilKitchen.style.backgroundImage = "url('./assets/child.png')";
    state.step = "breakfast";
    dialog("Papa, Mama, dan Syabil sarapan bersama.");
  }

  if (act === "eat" && state.step === "breakfast") {
    state.step = "toSchool";
    dialog("Sarapan selesai. Saatnya berangkat sekolah.", [
      { label: "Ke Map", action: () => showScene("map") }
    ]);
  }

  if (act === "toSchool" && state.step === "toSchool") {
    showScene("school");
    dialog("105 + 12 = ?", [
      { label: "A. 117", action: () => secondQuestion() },
      { label: "B. 93", action: () => dialog("Jawaban salah, coba lagi.") }
    ]);
  }

  if (act === "toOffice") {
    showScene("office");
    dialog("12577 - 125 = ?", [
      { label: "A. 12452", action: () => dialog("Papa selesai bekerja.", [{ label:"Pulang", action:()=>showScene("map")}]) },
      { label: "B. 12386", action: () => dialog("Jawaban salah.") }
    ]);
  }

  if (act === "toMarket") {
    showScene("market");
    dialog("Mama berbelanja.", [
      { label: "Belanja selesai", action: () => showScene("map") }
    ]);
  }

  if (act === "toHome") {
    showScene("room");
    dialog("Keluarga sudah lengkap. Mau kemana?", [
      { label: "Dufan", action: () => showScene("dufan") }
    ]);
  }

});

function secondQuestion() {
  dialog("228 - 19 = ?", [
    { label: "A. 209", action: () => dialog("Syabil boleh pulang.", [{ label:"Ke Map", action:()=>showScene("map")}]) },
    { label: "B. 197", action: () => dialog("Jawaban salah.") }
  ]);
}
