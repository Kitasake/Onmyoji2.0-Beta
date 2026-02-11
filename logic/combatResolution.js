// combatResolution.js
// Resolves spell effects, dice rolls, and damage vs Yokai

import { rollDice } from "./dice.js";
import { qualifiesForElementBonus } from "./elementBonus.js";
import { isWeakAgainst } from "./elementBonus.js";
import { gameState } from "../gameState.js";
import { drawRewardCard } from "../gameState.js";


/**
 * Resolves combat for a single round
 * @param {Object} yokai
 * @param {Array} playerActions - [{ playerId, spell }]
 * @param {number} roundNumber
 * @returns {Object}
 */
const attackBonus = gameState.buffs.attackBonus;
const defenseBonus = gameState.buffs.defenseBonus;
if (gameState.buffs.disableDefenseNegation) {
  // skip element negation logic
}


export function resolveCombat(yokai, playerActions) {

  let totalAttackDamage = 0;
  let totalDefense = 0;

  const actionResults = [];

  let attackBonusUsed = false;
  let defenseBonusUsed = false;

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

    const rollResult = rollDice(spell.dice, bonusDice);

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
    drawRewardCard();

    return {
      defeated: true,
      phase: "players_win",
      totalAttackDamage,
      remainingYokaiHP: 0,
      actionResults
    };
  }

  // =============================
  // PHASE 2 — YOKAI ATTACK
  // =============================

  // Example Yokai attack value
  const yokaiAttackValue = yokai.attack || 10; 
  // If you later add per-round attack scaling, use:
  // yokai.attack[`r${round}`]

  playerActions.forEach(action => {
    const { spell } = action;

    if (spell.type !== "defense") return;

    let bonusDice = 0;

    if (qualifiesForElementBonus(spell, yokai) && !defenseBonusUsed) {
      bonusDice = 1;
      defenseBonusUsed = true;
    }

    const rollResult = rollDice(spell.dice, bonusDice);

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

