// spellHand.js
// Handles spell deck creation and player hand generation

import { buildStartingDeck } from "./startingDeck.js";

/**
 * Fisher-Yates shuffle
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
 * Creates the player's initial deck
 */
export function createPlayerDeck(element) {
  const baseDeck = buildStartingDeck(element);

  const deckWithIds = baseDeck.map(card => ({
    ...card,
    instanceId: crypto.randomUUID()
  }));

  return shuffle(deckWithIds);
}


/**
 * Generates opening hand
 */
export function generateSpellHand(element, handSize = 5) {
  const deck = createPlayerDeck(element);

  return {
    element,
    deck: deck.slice(handSize),
    hand: deck.slice(0, handSize),
    discard: []
  };
}

/**
 * Plays a spell
 */
export function playSpell(state, cardIndex) {
  const card = state.hand.splice(cardIndex, 1)[0];
  if (!card) throw new Error("Invalid card index");

  state.discard.push(card);
  return card;
}

/**
 * Refill hand
 */
export function refillHand(state, handSize = 5) {
  while (state.hand.length < handSize) {

    // If deck empty, reshuffle discard
    if (state.deck.length === 0) {
      if (state.discard.length === 0) break;

      state.deck = shuffle(state.discard);
      state.discard = [];
    }

    state.hand.push(state.deck.shift());
  }
}

