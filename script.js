const scenes = document.querySelectorAll(".scene");
const dialogText = document.getElementById("dialog-text");
const dialogActions = document.getElementById("dialog-actions");

const syabilRoom = document.getElementById("syabil-room");
const syabilHome = document.getElementById("syabil-home");
const syabilKitchen = document.getElementById("syabil-kitchen");

let state = {
  step: "wake"
};

function showScene(name) {
  scenes.forEach(s => s.classList.remove("active"));
  document.querySelector(`.scene[data-scene="${name}"]`)?.classList.add("active");
}

function setSyabil(img) {
  [syabilRoom, syabilHome, syabilKitchen].forEach(el => {
    if (el) el.style.backgroundImage = `url('${img}')`;
  });
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

/* START */
setSyabil("./assets/piyama.png");

dialog(
  "Syabil masih memakai piyama. Ia harus ganti baju dulu.",
  [
    {
      label: "Ganti Baju Sekolah",
      action: () => {
        setSyabil("./assets/child.png");
        state.step = "ready";
        dialog("Syabil sudah siap. Saatnya keluar kamar.");
      }
    }
  ]
);

document.addEventListener("click", e => {
  const act = e.target.dataset.action;
  if (!act) return;

  if (act === "toKitchen" && state.step === "ready") {
    showScene("kitchen");
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
      { label: "A. 117", action: () => schoolQ2() },
      { label: "B. 93", action: () => dialog("Jawaban salah.") }
    ]);
  }

  if (act === "toHome") {
    showScene("home");
    setSyabil("./assets/child.png");
    dialog("Papa mama kemana ya?", [
      {
        label: "Cari Papa",
        action: () => {
          showScene("bedroom");
          dialog("Papa bersiap berangkat kerja.");
        }
      }
    ]);
  }
});

function schoolQ2() {
  dialog("228 - 19 = ?", [
    {
      label: "A. 209",
      action: () => dialog(
        "Syabil boleh pulang.",
        [{ label: "Pulang", action: () => showScene("map") }]
      )
    },
    { label: "B. 197", action: () => dialog("Jawaban salah.") }
  ]);
}
