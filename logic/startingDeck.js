// startingDeck.js
import { spellCatalog } from "../data/spellCatalog.js";

export function buildStartingDeck(element) {
  const deck = [];
  const elementData = spellCatalog[element];

  if (!elementData) {
    throw new Error(`Unknown element: ${element}`);
  }

  [...elementData.attack, ...elementData.defense].forEach(spell => {
    for (let i = 0; i < spell.startingCopies; i++) {
      deck.push({ ...spell });
    }
  });

  return deck;
}
