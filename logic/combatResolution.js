// combatResolution.js
// Resolves spell effects, dice rolls, and damage vs Yokai

import { rollDice } from "./dice.js";
import { qualifiesForElementBonus } from "./elementBonus.js";
import { isWeakAgainst } from "./elementBonus.js";
import { revealYokaiInfo } from "../data/playerEncyclopedia.js";
import { gameState } from "../gameState.js";
import { drawRewardCard } from "../gameState.js";
import { grantYokaiRewards } from "./rewards.js";


/**
 * Resolves combat for a single round
 * @param {Object} yokai
 * @param {Array} playerActions - [{ playerId, spell }]
 * @param {number} roundNumber
 * @returns {Object}
 */

const WEATHER_SPELL_BONUS = {
  Clear: "Fire",
  Snowy: "Ice",
  Rainy: "Lightning",
  Windy: "Wind"
};

const WEATHER_YOKAI_EFFECTS = {
  Clear:   { boost: "Fire", weaken: "Ice" },
  Snowy:   { boost: "Ice", weaken: "Lightning" },
  Rainy:   { boost: "Lightning", weaken: "Wind" },
  Windy:   { boost: "Wind", weaken: "Fire" }
};



export function resolveCombat(yokai, playerActions) {

  let totalAttackDamage = 0;
  let totalDefense = 0;

  const actionResults = [];

  let attackBonusUsed = false;
  let defenseBonusUsed = false;
  let weatherBonusUsed = false;  


  // =============================
  // PHASE 1 — PLAYER ATTACK
  // =============================

  playerActions.forEach(action => {
    const { spell } = action;

    if (spell.type !== "attack") return;

    let bonusDice = 0;

    if (qualifiesForElementBonus(spell, yokai) && !attackBonusUsed) {
      bonusDice = 1;
      attackBonusUsed = true;
    }

    let weatherBonus = 0;

    if (
      spell.type === "attack" &&
      WEATHER_SPELL_BONUS[gameState.currentWeather] === spell.element &&
      !weatherBonusUsed
    ) {
      weatherBonus = 1;
      weatherBonusUsed = true;  // ← ensures only 1 bonus per turn
    }

    
    const [count, sides] = spell.dice.split("d").map(Number);

    const totalDice =
      count +
      gameState.buffs.attackBonus +
      weatherBonus;
    
    const rollResult = rollDice(
      `${totalDice}d${sides}`,
      bonusDice
    );




    totalAttackDamage += rollResult.total;

    actionResults.push({
      playerId: action.playerId,
      spell: spell.name,
      type: "attack",
      roll: rollResult.rolls,
      total: rollResult.total
    });
  });

  gameState.currentYokaiHP -= totalAttackDamage;

  if (gameState.currentYokaiHP <= 0) {
  gameState.currentYokaiHP = 0;
    revealYokaiInfo(gameState.currentYokai, gameState.day);

  // 🔥 Grant elemental + skin resources
  if (!yokai.boss) {
    grantYokaiRewards(yokai);
  }

  drawRewardCard();

  return {
    defeated: true,
    phase: "players_win",
    totalAttackDamage,
    remainingYokaiHP: 0,
    remainingPartyHP: gameState.partyHP, // ✅ ADD THIS
    actionResults
  };

  }

  // =============================
  // PHASE 2 — YOKAI ATTACK
  // =============================

  // Example Yokai attack value
  let yokaiAttackDice;

  if (yokai.boss) {
    yokaiAttackDice = yokai.attack;
  } else {
    const effectiveDay = Math.min(gameState.day, 4);
    const dayKey = `day${effectiveDay}`;
    yokaiAttackDice = yokai.attack[dayKey] || 1;
  }
  
  // WEATHER MODIFIER
  const weatherEffect =
    WEATHER_YOKAI_EFFECTS[gameState.currentWeather];
  
  if (weatherEffect) {
    if (weatherEffect.boost === yokai.element) {
      yokaiAttackDice += 1;
    }
  
    if (weatherEffect.weaken === yokai.element) {
      yokaiAttackDice = Math.max(0, yokaiAttackDice - 1);
    }
  }
  
  const yokaiAttackRoll = rollDice(`${yokaiAttackDice}d6`);
  const yokaiAttackValue = yokaiAttackRoll.total;

  // If you later add per-round attack scaling, use:
  // yokai.attack[`r${round}`]

  playerActions.forEach(action => {
    const { spell } = action;

    if (spell.type !== "defense") return;

    let bonusDice = 0;

    if (
      qualifiesForElementBonus(spell, yokai) &&
      !defenseBonusUsed &&
      !gameState.buffs.disableDefenseNegation
    ) {
      bonusDice = 1;
      defenseBonusUsed = true;
    }

    const [count, sides] = spell.dice.split("d").map(Number);

    const totalDice =
      count +
      gameState.buffs.defenseBonus;
    
    const rollResult = rollDice(
      `${totalDice}d${sides}`,
      bonusDice
    );



    totalDefense += rollResult.total;

    actionResults.push({
      playerId: action.playerId,
      spell: spell.name,
      type: "defense",
      roll: rollResult.rolls,
      total: rollResult.total
    });
  });

  const damageToParty = Math.max(0, yokaiAttackValue - totalDefense);

  gameState.partyHP -= damageToParty;
  if (gameState.partyHP < 0) gameState.partyHP = 0;

  return {
    defeated: false,
    phase: "yokai_attack",
    totalAttackDamage,
    totalDefense,
    yokaiAttackValue,
    damageToParty,
    remainingYokaiHP: gameState.currentYokaiHP,
    remainingPartyHP: gameState.partyHP,
    actionResults
  };
}

