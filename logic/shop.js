// shop.js
import { spellCatalog } from "../data/spellCatalog.js";

/**
 * Returns all spells that can be purchased in the shop
 * (i.e. spells with a cost)
 */
export function getShopSpells() {
  const shop = [];

  Object.values(spellCatalog).forEach(element => {
    [...element.attack, ...element.defense].forEach(spell => {
      if (spell.cost) {
        shop.push({ ...spell });
      }
    });
  });

  return shop;
}
