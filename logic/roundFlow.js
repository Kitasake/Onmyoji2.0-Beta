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


/**
 * Starts a new round
 */
export async function startRound() {
  await loadYokaiEncyclopedia();
  
  gameState.currentYokai = selectRandomYokai();


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
    gameState.round,
    revealYokaiInfo(
      gameState.currentYokai,
      gameState.round
      )
  );

  gameState.lastCombatResult = combatResult;
  revealCombatResults(combatResult);

  const partyDamage = combatResult.remainingHP;

  let partyDefeated = false;
  
  if (partyDamage > 0) {
    partyDefeated = resolvePartyDamage(partyDamage);
  }

  showPartyHP();

  if (partyDefeated) {
    endGame(false);
    return;
  }

  if (gameState.round >= gameState.maxRounds) {
    endGame(true);
    return;
  }

  advanceRound();
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
  console.log("Yokai:", combatResult.yokai);
  console.log("HP Before:", combatResult.yokaiHP);
  console.log("Attack:", combatResult.totalAttackDamage);
  console.log("Defense:", combatResult.totalDefense);
  console.log("Remaining HP:", combatResult.remainingHP);
}

function showPartyHP() {
  console.log(
    `Party HP: ${gameState.partyHP} / ${gameState.maxPartyHP}`
    );
}

