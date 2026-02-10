import { gameState } from "../gameState.js";

export function grantYokaiRewards(yokai) {
  gameState.resources[yokai.element] += 1;
  gameState.resources.Skin += 1;
}
