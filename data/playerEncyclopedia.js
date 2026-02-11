// playerEncyclopedia.js
import { loadYokaiEncyclopedia } from "../logic/yokaiSelection.js";

const STORAGE_KEY = "onmyoji_player_encyclopedia";

export let playerEncyclopedia = {};

export async function initPlayerEncyclopedia() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    playerEncyclopedia = JSON.parse(saved);
    return;
  }

  const yokaiData = await loadYokaiEncyclopedia();

  yokaiData.forEach(yokai => {
    playerEncyclopedia[yokai.name] = {
      name: yokai.name,
      element: yokai.element,

      discovered: false,

      knownClues: {
        area: false,
        season: false,
        time: false
      },

      knownHP: {
        day1: false,
        day2: false,
        day3: false,
        day4: false
      }
    };
  });

  savePlayerEncyclopedia();
}

function savePlayerEncyclopedia() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(playerEncyclopedia)
  );
}

export function revealYokaiInfo(yokai, round) {
  const entry = playerEncyclopedia[yokai.name];
  if (!entry) return;

  entry.discovered = true;
  entry.knownClues.area = true;
  entry.knownClues.season = true;
  entry.knownClues.weather = true;
  entry.knownHP[`r${round}`] = true;

  savePlayerEncyclopedia();
}

export function resetPlayerEncyclopedia() {
  localStorage.removeItem(STORAGE_KEY);
}
