// renderEncyclopedia.js
import { loadYokaiEncyclopedia } from "./yokaiSelection.js";
import { playerEncyclopedia } from "../data/playerEncyclopedia.js";

let cachedYokaiData = null;

export async function renderEncyclopedia() {
  const container = document.getElementById("encyclopedia-list");
  if (!container) return;

  if (!cachedYokaiData) {
    cachedYokaiData = await loadYokaiEncyclopedia();
  }

  container.innerHTML = "";

  cachedYokaiData.forEach(yokai => {
    const knowledge = playerEncyclopedia[yokai.name];
    if (!knowledge) return;

    const div = document.createElement("div");
    div.className = "encyclopedia-entry";

    div.innerHTML = `
      <strong>${knowledge.discovered ? yokai.name : "???"}</strong><br>
      Area: ${knowledge.knownClues.area ? yokai.area : "???"}<br>
      Season: ${knowledge.knownClues.season ? yokai.season : "???"}<br>
      Weather: ${knowledge.knownClues.weather ? yokai.weather : "???"}<br>
      <em>HP by Round</em><br>
      R1: ${knowledge.knownHP.r1 ? yokai.hp.r1 : "???"}<br>
      R2: ${knowledge.knownHP.r2 ? yokai.hp.r2 : "???"}<br>
      R3: ${knowledge.knownHP.r3 ? yokai.hp.r3 : "???"}<br>
      R4: ${knowledge.knownHP.r4 ? yokai.hp.r4 : "???"}
    `;

    container.appendChild(div);
  });
}
