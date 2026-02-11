// yokaiReveal.js

import { gameState } from "../gameState.js";

/**
 * Returns only the information players are allowed to see
 * before spells are submitted.
 */
export function getYokaiClues() {
  const yokai = gameState.currentYokai;

  return {
    day: gameState.day,
    season: yokai.season,
    area: yokai.area,
    weather: yokai.weather
  };
}

/**
 * Returns full Yokai data AFTER combat resolution
 */
export function getFullYokaiReveal() {
  const yokai = gameState.currentYokai;

  return {
    name: yokai.name,
    element: yokai.element,
    hpForDay: yokai.hp[`day${Math.min(gameState.day, 4)}`]
  };
}
