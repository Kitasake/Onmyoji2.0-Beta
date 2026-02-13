import { gameState } from "../gameState.js";

export function applyGuardian(name) {
  switch (name) {
    case "Genbu":
      gameState.buffs.defenseBonus += 1;
      break;
    case "Byakko":
      gameState.buffs.attackBonus += 1;
      break;
    case "Suzaku":
      gameState.buffs.disableDefenseNegation = true;
      break;
    case "Seiryu":
      ["Fire","Ice","Lightning","Wind","Skin"].forEach(
        r => gameState.resources[r] += 3
      );
      break;
    }
  }
