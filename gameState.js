// gameState.js
// Central source of truth for the playtest app

import { createPlayers } from "./logic/playerState.js";
import { BASE_RULES } from "./logic/rulesets.js";

export const gameState = {
  // CAMPAIGN
  day: 1,
  maxDays: 7, // set by difficulty
  isFinalDay: false,

  // DAY FLOW
  encounter: 1,          // 1–4 (or 1–3 on final day)
  maxEncounters: 4,
  timeOfDay: "Dawn",     // Dawn / Afternoon / Dusk / Night

  // PARTY
  partyHP: 60,
  maxPartyHP: 60,

  // RESOURCES
  resources: {
    Fire: 0,
    Ice: 0,
    Lightning: 0,
    Wind: 0,
    Skin: 0
  },

  // BUFFS (from guardians)
  buffs: {
    attackBonus: 0,
    defenseBonus: 0,
    disableDefenseNegation: false
  },

  // COMBAT
  players: [],
  currentYokai: null,

  spellHands: {},
  selectedSpells: {},

  lastCombatResult: null,
  rules: {},

  gameOver: false,
  victory: false
};


/**
 * Initializes a new game
 * @param {number} playerCount
 */
export function initGame(playerCount = 4, options = {}) {
  const { partyHP = 60, rules = BASE_RULES, maxDays = 7 } = options;

  gameState.day = 1;
  gameState.maxDays = maxDays;
  gameState.isFinalDay = false;

  gameState.encounter = 1;
  gameState.maxEncounters = 4;
  gameState.timeOfDay = "Dawn";

  gameState.partyHP = partyHP;
  gameState.maxPartyHP = partyHP;

  gameState.resources = {
    Fire: 0, Ice: 0, Lightning: 0, Wind: 0, Skin: 0
  };

  gameState.buffs = {
    attackBonus: 0,
    defenseBonus: 0,
    disableDefenseNegation: false
  };

  gameState.players = createPlayers(playerCount);
  gameState.spellHands = {};
  gameState.selectedSpells = {};
  gameState.currentYokai = null;

  gameState.rules = { ...BASE_RULES, ...rules };

  gameState.lastCombatResult = null;
  gameState.gameOver = false;
  gameState.victory = false;
}



/**
 * Advances the round counter
 */
export function advanceRound() {
  gameState.round += 1;
}

/**
 * Applies overflow damage from combat to players
 * @param {number} overflowDamage
 * @returns {boolean} true if all players are defeated
 */
export function resolvePartyDamage(damage) {
  gameState.partyHP -= damage;
  if (gameState.partyHP < 0) {
    gameState.partyHP = 0;
  }

  return gameState.partyHP === 0;
}

