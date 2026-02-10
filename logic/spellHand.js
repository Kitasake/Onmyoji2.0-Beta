// spellHand.js
// Handles spell deck creation and player hand generation

import { spellCatalog } from "../data/spellCatalog.js";

/**
 * Creates a shuffled copy of an array (Fisher-Yates)
 */
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Builds a full spell deck for a given element
 * @param {string} element - Fire | Ice | Wind | Lightning
 * @returns {Array}
 */
export function buildSpellDeck(element) {
  const elementSpells = spellCatalog[element];

  if (!elementSpells) {
    throw new Error(`Unknown spell element: ${element}`);
  }

  return shuffle([
    ...elementSpells.attack,
    ...elementSpells.defense
  ]);
}

/**
 * Draws an opening hand for a player
 * @param {string} element
 * @param {number} handSize - default 5
 * @returns {Object}
 */
export function generateSpellHand(element, handSize = 9) {
  const deck = buildSpellDeck(element);

  if (deck.length < handSize) {
    throw new Error("Not enough cards to generate hand");
  }

  return {
    element,
    deck,
    hand: deck.slice(0, handSize),
    discard: []
  };
}

/**
 * Plays a spell card from the hand
 * @param {Object} state
 * @param {number} cardIndex
 * @returns {Object}
 */
export function playSpell(state, cardIndex) {
  const card = state.hand[cardIndex];

  if (!card) {
    throw new Error("Invalid card index");
  }

  state.hand.splice(cardIndex, 1);
  state.discard.push(card);

  return card;
}

/**
 * Draws back up to hand size
 * @param {Object} state
 * @param {number} handSize
 */
export function refillHand(state, handSize = 5) {
  while (state.hand.length < handSize && state.deck.length > 0) {
    state.hand.push(state.deck.shift());
  }
}
