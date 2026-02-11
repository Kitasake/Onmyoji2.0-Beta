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
      Time: ${knowledge.knownClues.time ? yokai.time : "???"}<br>
      <em>HP by Day</em><br>
      Day1: ${knowledge.knownHP.day1 ? yokai.hp.day1 : "???"}<br>
      Day2: ${knowledge.knownHP.day2 ? yokai.hp.day2 : "???"}<br>
      Day3: ${knowledge.knownHP.day3 ? yokai.hp.day3 : "???"}<br>
      Day4: ${knowledge.knownHP.day4 ? yokai.hp.day4 : "???"}

    `;

    container.appendChild(div);
  });
}
