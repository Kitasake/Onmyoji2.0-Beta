// spellSelection.js

export function createSpellSelection(spellHand) {
  let selectedIndex = null;

  return {
    spellHand,

    select(index) {
      if (selectedIndex !== null) return; // lock after selection
      selectedIndex = index;
    },

    getSelectedSpell() {
      if (selectedIndex === null) return null;
      return spellHand[selectedIndex];
    },

    isSelected() {
      return selectedIndex !== null;
    }
  };
}
