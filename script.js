const state = {
  scene: "bedroom",
  syabil: { outfit: "piyama" },
};

const scenes = document.querySelectorAll(".scene");
const dialogText = document.getElementById("dialogText");
const dialogActions = document.getElementById("dialogActions");

function showScene(name) {
  scenes.forEach(s => s.classList.remove("active"));
  document.querySelector(`.${name}`).classList.add("active");
  state.scene = name;
}

function setDialog(text, actions = []) {
  dialogText.textContent = text;
  dialogActions.innerHTML = "";
  actions.forEach(a => {
    const btn = document.createElement("button");
    btn.textContent = a.text;
    btn.onclick = a.action;
    dialogActions.appendChild(btn);
  });
}

function updateSyabil() {
  const el = document.querySelectorAll(".syabil");
  el.forEach(s => {
    s.style.backgroundImage =
      state.syabil.outfit === "school"
        ? 'url("./assets/child.png")'
        : 'url("./assets/piyama.png")';
  });
}

/* INIT */
showScene("bedroom");
updateSyabil();

setDialog(
  "Syabil masih memakai piyama. Ia harus ganti baju dulu.",
  [
    {
      text: "Ganti Baju Sekolah",
      action: () => {
        state.syabil.outfit = "school";
        updateSyabil();
        setDialog(
          "Syabil sudah siap. Saatnya keluar kamar.",
          [
            {
              text: "Ke Dapur",
              action: () => {
                showScene("kitchen");
                setDialog(
                  "Sarapan selesai. Saatnya berangkat sekolah.",
                  [
                    {
                      text: "Ke Map",
                      action: () => showScene("map")
                    }
                  ]
                );
              }
            }
          ]
        );
      }
    }
  ]
);

/* MAP CLICK */
document.querySelectorAll(".map-icon").forEach(icon => {
  icon.addEventListener("click", () => {
    const target = icon.dataset.target;
    showScene(target);

    if (target === "school") {
      setDialog(
        "Bu Putri: Kerjakan soal ini.\n105 + 12 = ?",
        [
          {
            text: "117",
            action: () => {
              setDialog(
                "Benar! 228 - 19 = ?",
                [
                  {
                    text: "209",
                    action: () => {
                      setDialog(
                        "Bagus! Syabil boleh pulang.",
                        [
                          {
                            text: "Pulang",
                            action: () => {
                              showScene("map");
                            }
                          }
                        ]
                      );
                    }
                  }
                ]
              );
            }
          }
        ]
      );
    }

    if (target === "home") {
      setDialog(
        "Papa mama ke mana ya?",
        [
          {
            text: "Cari Papa",
            action: () => showScene("bedroom")
          }
        ]
      );
    }
  });
});

/* TOP BAR */
document.getElementById("btnHome").onclick = () => showScene("home");
document.getElementById("btnMap").onclick = () => showScene("map");
