// yokaiSelection.js
// Responsible for selecting a Yokai and exposing only partial info
// until the Reveal Phase is complete

let yokaiEncyclopedia = null;

/**
*Loads the Yokai encyclopedia once
*/
export async function loadYokaiEncyclopedia() {
  if (yokaiEncyclopedia) return yokaiEncyclopedia;

  const response = await fetch(new URL("../data/yokaiEncyclopedia.json", import.meta.url));
  if (!response.ok) {
    throw new Error("Failed to load yokaiEncyclopedia.json");
  }

  yokaiEncyclopedia = await response.json();
  return yokaiEncyclopedia;
}
/**
 * Selects a random Yokai from the encyclopedia
 * @returns {Object} full yokai object
 */
export function selectRandomYokai() {
  if (!yokaiEncyclopedia) {
    throw new Error("Yokai encyclopedia not loaded");
  }
   
  const index = Math.floor(Math.random() * yokaiEncyclopedia.length);
  return yokaiEncyclopedia[index];
}

/**
 * Gets the HP for the current round
 * @param {Object} yokai
 * @param {number} round - 1 to 4
 * @returns {number}
 */
export function getYokaiHPForRound(yokai, round) {
  if (!yokai.hp || !yokai.hp[`r${round}`]) {
    throw new Error(`Invalid round ${round} for yokai ${yokai.name}`);
  }
  return yokai.hp[`r${round}`];
}

/**
 * Information shown during the Yokai Reveal Phase (before spell resolution)
 * @param {Object} yokai
 * @param {number} round
 * @returns {Object}
 */
export function getYokaiClues(yokai, round) {
  return {
    round,
    season: yokai.season,
    area: yokai.area,
    weather: yokai.weather
  };
}

/**
 * Information revealed AFTER combat resolution
 * @param {Object} yokai
 * @param {number} round
 * @returns {Object}
 */
export function getFullYokaiReveal(yokai, round) {
  return {
    name: yokai.name,
    element: yokai.element,
    hp: getYokaiHPForRound(yokai, round),
    season: yokai.season,
    area: yokai.area,
    weather: yokai.weather
  };
}
