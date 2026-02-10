// playerTurn.js

/**
 * Creates a player turn object
 * Used during the spell selection phase
 */
export function createPlayerTurn(playerId, spellHand) {
  return {
    playerId,
    spellHand,
    selectedSpell: null,

    selectSpell(spellIndex) {
      this.selectedSpell = this.spellHand[spellIndex];
    },

    submit() {
      if (!this.selectedSpell) {
        throw new Error(`Player ${this.playerId} has not selected a spell`);
      }

      return {
        playerId: this.playerId,
        spell: this.selectedSpell
      };
    }
  };
}
