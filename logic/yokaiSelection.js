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
export function getYokaiHPForDay(yokai, day) {
  if (!yokai.hp || !yokai.hp[`day${day}`]) {
    throw new Error(`Invalid day ${day} for yokai ${yokai.name}`);
  }
  return yokai.hp[`day${day}`];
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
export function getFullYokaiReveal(yokai, day) {
  return {
    name: yokai.name,
    element: yokai.element,
    hp: getYokaiHPForRound(yokai, day),
    season: yokai.season,
    area: yokai.area,
    weather: yokai.weather
  };
}
