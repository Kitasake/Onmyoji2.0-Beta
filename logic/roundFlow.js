// roundFlow.js

import { gameState } from "../gameState.js";
import { selectRandomYokai, loadYokaiEncyclopedia } from "./yokaiSelection.js";
import { generateSpellHand, refillHand } from "./spellHand.js";
import { resolveCombat } from "./combatResolution.js";
import { applyGuardian } from "./guardians.js";


const FINAL_BOSS = {
  name: "Corrupted Kirin",
  element: "Dark",
  hp: 180,
  attack: 9,
  boss: true
};

const TIMES = ["Dawn", "Afternoon", "Dusk", "Night"];
const WEATHER_TYPES = ["Clear", "Snowy", "Rainy", "Windy"];

function selectRandomWeather() {
  const index = Math.floor(Math.random() * WEATHER_TYPES.length);
  return WEATHER_TYPES[index];
}


export function advanceEncounter() {

  gameState.round = 0;
  gameState.currentYokaiRevealed = false;
  gameState.currentYokai = null;
  gameState.currentYokaiHP = 0;

  gameState.encounter++;


  // FINAL DAY LOGIC
  if (gameState.isFinalDay) {

    // After 3 Yokai → spawn boss
    if (gameState.encounter === 4) {
      spawnFinalBoss();
      return;
    }

    // After boss defeated
    if (gameState.encounter > 4) {
      endGame(true);
      return;
    }
  }

  if (gameState.encounter > gameState.maxEncounters) {
    resolveEndOfDay();
    return;
  }

  gameState.timeOfDay = TIMES[gameState.encounter - 1];
}


function resolveEndOfDay() {

  if (gameState.isFinalDay) {
    spawnFinalBoss();
    return;
  }

  gameState.guardianChoicePending = true;

  const panel = document.getElementById("guardianPanel");
  panel?.classList.remove("hidden");

  // 🔥 HIDE already summoned guardians
  panel?.querySelectorAll("[data-guardian]").forEach(btn => {
    const name = btn.dataset.guardian;

    if (gameState.summonedGuardians.has(name)) {
      btn.disabled = true;
      btn.textContent += " (Already Summoned)";
    } else {
      btn.style.display = "block";
    }
  });
}




function summonGuardian() {
  const guardians = ["Genbu", "Byakko", "Suzaku", "Seiryu"];

  const randomGuardian =
    guardians[Math.floor(Math.random() * guardians.length)];

  applyGuardian(randomGuardian);

  console.log(`Guardian Summoned: ${randomGuardian}`);
}

function spawnFinalBoss() {

  console.log("Final Boss Appears!");

  gameState.currentYokai = FINAL_BOSS;
  gameState.currentYokaiHP = FINAL_BOSS.hp;

  gameState.timeOfDay = "Night";

  showCluesOnly();
}


/**
 * Starts a new round
 */
export async function startRound() {
  await loadYokaiEncyclopedia();
  gameState.round++;

  // If final day and encounter <= 3 → normal Yokai
  if (gameState.isFinalDay && gameState.encounter <= 3) {

    if (!gameState.currentYokai) {
  
      gameState.currentYokai = selectRandomYokai();
      gameState.currentWeather = selectRandomWeather();
  
      const effectiveDay = Math.min(gameState.day, 4);
  
      gameState.currentYokaiHP =
        gameState.currentYokai.hp[`day${effectiveDay}`];
    }
  }

  // If boss phase
  else if (gameState.isFinalDay && gameState.encounter === 4) {

    if (!gameState.currentYokai) {
      spawnFinalBoss();
    }
  
  }

  else {
  // Only select a new Yokai if none exists
    if (!gameState.currentYokai) {
  
      gameState.currentYokai = selectRandomYokai();
      gameState.currentWeather = selectRandomWeather();
  
      const effectiveDay = Math.min(gameState.day, 4);
  
      gameState.currentYokaiHP =
        gameState.currentYokai.hp[`day${effectiveDay}`];
    }
  }





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
    submittedSpells
  );
  gameState.currentYokaiHP =
  combatResult.remainingYokaiHP;

  gameState.partyHP =
  combatResult.remainingPartyHP;
  gameState.lastCombatResult = combatResult;

  // Reveal Yokai if not defeated
  if (gameState.round >= 2 && gameState.currentYokaiHP > 0) {
    gameState.currentYokaiRevealed = true;
  }
  
  revealCombatResults(combatResult);

  

  showPartyHP();

  if (gameState.partyHP <= 0) {

  // FINAL DAY = TRUE DEFEAT
    if (gameState.isFinalDay) {
      endGame(false);
      return;
    }
  
    // NOT FINAL DAY = DAY ENDS
    console.log("Party defeated — ending day.");
  
    handlePartyDefeat();
    return;
  }


  // If Yokai is dead, move to next encounter
  if (gameState.currentYokaiHP <= 0) {
  
    // 🔥 TRUE DESTROY HANDLING
    if (gameState.pendingReward?.destroyCount) {
  
      gameState.destroyRemaining =
        gameState.pendingReward.destroyCount;
  
      alert(`Destroy ${gameState.destroyRemaining} card(s).`);
  
      return; // wait for player to destroy
    }

        // Refill all player hands
    Object.values(gameState.spellHands).forEach(hand => {
      refillHand(hand);
    });

    advanceEncounter();
    return;
  }
  // Otherwise combat continues (players pick again)
  // Combat continues → refill hands
  Object.values(gameState.spellHands).forEach(hand => {
    refillHand(hand);
  });

}

function handlePartyDefeat() {

  // Restore party HP for next day
  gameState.partyHP = gameState.maxPartyHP;

  // Clear current encounter
  gameState.currentYokai = null;
  gameState.currentYokaiHP = 0;

  // Skip guardian phase on defeat
  gameState.guardianChoicePending = false;

  // Open shop immediately
  gameState.shopOpen = true;

  document.getElementById("guardianPanel")
    ?.classList.add("hidden");

  document.getElementById("shopPanel")
    ?.classList.remove("hidden");
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
  console.log("Day", gameState.day);
  console.log("Encounter", gameState.encounter);  
  console.log("Season:", gameState.currentYokai.season);
  console.log("Area:", gameState.currentYokai.area);
  console.log("Time of Day:", gameState.timeOfDay);
  console.log("Weather:", gameState.currentWeather);
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

