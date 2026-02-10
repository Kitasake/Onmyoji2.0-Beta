// logic/rewardDeck.js
// Builds and shuffles the reward deck

import { rewardCatalog } from "../data/rewardCatalog.js";

/**
 * Fisher–Yates shuffle
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
 * Builds the full reward deck (24 cards)
 */
export function buildRewardDeck() {
  const deck = [];

  rewardCatalog.forEach(card => {
    for (let i = 0; i < card.copies; i++) {
      deck.push({ ...card });
    }
  });

  return shuffle(deck);
}
