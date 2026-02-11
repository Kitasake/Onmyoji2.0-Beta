// roundFlow.js

import { gameState, advanceRound, resolvePartyDamage } from "../gameState.js";
import { selectRandomYokai, loadYokaiEncyclopedia } from "./yokaiSelection.js";
import { generateSpellHand } from "./spellHand.js";
import { resolveCombat } from "./combatResolution.js";
import { revealYokaiInfo} from "../data/playerEncyclopedia.js";

const TIMES = ["Dawn", "Afternoon", "Dusk", "Night"];

export function advanceEncounter() {
  gameState.encounter++;

  if (gameState.encounter > gameState.maxEncounters) {
    resolveEndOfDay();
    return;
  }

  gameState.timeOfDay = TIMES[gameState.encounter - 1];
}

function resolveEndOfDay() {
  gameState.day++;

  if (gameState.day > gameState.maxDays) {
    endGame(true);
    return;
  }

  gameState.encounter = 1;
  gameState.timeOfDay = "Dawn";

  startRound();
}

/**
 * Starts a new round
 */
export async function startRound() {
  await loadYokaiEncyclopedia();
  
  gameState.currentYokai = selectRandomYokai();
  gameState.currentYokaiHP = gameState.currentYokai.hp[`r${gameState.encounter}`];


  // Generate spell hand per player
  gameState.players.forEach(player => {
  if (!player.alive) return;

  // RESET selection every round (CRITICAL)
  gameState.selectedSpells[player.id] = [];

  // ONLY generate hand once
  if (!gameState.spellHands[player.id]) {
    gameState.spellHands[player.id] =
      generateSpellHand(player.element);
  }
});

  

  showCluesOnly();
}

/**
 * Players submit spells (UI calls this)
 * @param {Array} submittedSpells
 */
export function submitSpells(submittedSpells) {
  const combatResult = resolveCombat(
    gameState.currentYokai,
    submittedSpells,
    gameState.encounter
  );

  gameState.lastCombatResult = combatResult;
  revealCombatResults(combatResult);

  

  showPartyHP();

  if (gameState.partyHP <= 0) {
    endGame(false);
    return;
  }

  // If Yokai is dead, move to next encounter
  if (gameState.currentYokaiHP <= 0) {
    advanceEncounter();
    return;
  }

  // Otherwise combat continues (players pick again)
}


/**
 * Ends the game
 * @param {boolean} victory
 */
function endGame(victory) {
  gameState.gameOver = true;
  gameState.victory = victory;
  }


/**
 * UI HOOKS (to be implemented in HTML)
 */
function showCluesOnly() {
  console.log("Round", gameState.round);
  console.log("Season:", gameState.currentYokai.season);
  console.log("Area:", gameState.currentYokai.area);
  console.log("Weather:", gameState.currentYokai.weather);
}

function revealCombatResults(combatResult) {
  console.log("Total Attack:", combatResult.totalAttackDamage);
  console.log("Total Defense:", combatResult.totalDefense);
  console.log("Yokai Remaining HP:", combatResult.remainingYokaiHP);
  console.log("Party Remaining HP:", combatResult.remainingPartyHP);
}

function showPartyHP() {
  console.log(
    `Party HP: ${gameState.partyHP} / ${gameState.maxPartyHP}`
    );
}

