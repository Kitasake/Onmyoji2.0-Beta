// combatResolution.js
// Resolves spell effects, dice rolls, and damage vs Yokai

import { rollDice } from "./dice.js";
import { qualifiesForElementBonus } from "./elementBonus.js";
import { isWeakAgainst } from "./elementBonus.js";
import { gameState } from "../gameState.js";

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


export function resolveCombat(yokai, playerActions, roundNumber) {
  const yokaiHP = yokai.hp[`r${roundNumber}`];
  const hasWeakAttack =
  gameState.rules.resistancePenalty?.enabled &&
  playerActions.some(
    a =>
      a.spell.type === "attack" &&
      isWeakAgainst(a.spell.element, yokai.element)
  );

  let resistanceApplied = false;
  let totalAttackDamage = 0;
  let totalDefense = 0;
  let attackBonusUsed = false;
  let defenseBonusUsed = false;

  const actionResults = [];

  playerActions.forEach(action => {
    const { spell } = action;

    const isAttack = spell.type === "attack";
    const isDefense = spell.type === "defense";

    // OPTIONAL RULE #1 — Element-based Defense Restriction
if (
  spell.type === "defense" &&
  gameState.rules.defenseElementRestriction === "match" &&
  isWeakAgainst(spell.element, yokai.element)
) {
  actionResults.push({
    playerId: action.playerId,
    spell: spell.name,
    type: spell.type,
    ignored: true,
    reason: "Defense element is weak against Yokai"
  });
  return; // skip this spell entirely
}

    let diceExpression = spell.dice;
    let bonusDice = 0;
    let penaltyDice = 0;

    // Optional Rule #2 - Attack Resistance (-1 die total)
    if (
      spell.type === "attack" &&
      hasWeakAttack &&
      !resistanceApplied
      ) {
      penaltyDice = 1;
      resistanceApplied = true;
    }

    if (qualifiesForElementBonus(spell, yokai)) {
      if (spell.type === "attack" && !attackBonusUsed) {
        bonusDice = 1;
        attackBonusUsed = true;
      }

      if (spell.type === "defense" && !defenseBonusUsed) {
        bonusDice = 1;
        defenseBonusUsed = true;
      }
    }
    

    const rollResult = rollDice(diceExpression, bonusDice - penaltyDice);

    if (isAttack) {
      totalAttackDamage += rollResult.total;
    }

    if (isDefense) {
      totalDefense += rollResult.total;
    }

    actionResults.push({
      playerId: action.playerId,
      spell: spell.name,
      type: spell.type,
      dice: diceExpression,
      bonusDice,
      penaltyDice,
      roll: rollResult.rolls,
      total: rollResult.total
    });
  });

  const netDamageToYokai = Math.max(0, totalAttackDamage + totalDefense);
  const remainingHP = Math.max(0, yokaiHP - netDamageToYokai);

  

   

  return {
    yokai: yokai.name,
    round: roundNumber,
    yokaiHP,
    totalAttackDamage,
    totalDefense,
    netDamageToYokai,
    remainingHP,
    actionResults
  };
}
