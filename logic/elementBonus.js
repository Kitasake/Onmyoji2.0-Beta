// elementBonus.js

export const strengthMap = {
  Fire: "Ice",
  Ice : "Lightning",
  Lightning : "Wind",
  Wind : "Fire"
};

/**
 * Returns bonus dice based on spell type and element interaction
 * @param {Object} spell
 * @param {Object} yokai
 * @returns {number}
 */
export function qualifiesForElementBonus(spell, yokai) {
  const spellElement = spell.element;
  const yokaiElement = yokai.element;

  // ATTACK: spell is strong against Yokai
  if (
    spell.type === "attack" &&
    strengthMap[spellElement] === yokaiElement
  ) {
    return true;
  }

  // DEFENSE: Element matches Yokai
  if (
    spell.type === "defense" &&
    spellElement === yokaiElement
  ) {
    return true;
  }

  return false;
}


export function isWeakAgainst(spellElement, yokaiElement) {
  // spell is weak if yokai is strong against it
  return strengthMap[yokaiElement] === spellElement;
}

