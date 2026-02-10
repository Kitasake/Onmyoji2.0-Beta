// playerState.js
// Handles player creation, HP tracking, and defeat conditions

/**
 * Creates the initial player list
 * @param {number} playerCount
 * @param {number} startingHP
 * @returns {Array}
 */
export function createPlayers(playerCount = 4, startingHP = 20) {
  const elements = ["Fire", "Ice", "Wind", "Lightning"];

  return Array.from({ length: playerCount }, (_, i) => ({
    id: i,
    name: `Player ${i + 1}`,
    element: elements[i % elements.length],
    hp: startingHP,
    alive: true
  }));
}

/**
 * Applies overflow damage evenly to all living players
 * @param {Array} players
 * @param {number} overflowDamage
 */
export function applyPlayerDamage(players, playerDamage) {
  if (playerDamage <= 0) return;

  const livingPlayers = players.filter(p => p.alive);
  if (livingPlayers.length === 0) return;

  const damagePerPlayer = Math.ceil(
    playerDamage / livingPlayers.length
  );

  livingPlayers.forEach(player => {
    player.hp -= damagePerPlayer;

    if (player.hp <= 0) {
      player.hp = 0;
      player.alive = false;
    }
  });
}

/**
 * Returns true if all players are defeated
 * @param {Array} players
 * @returns {boolean}
 */
export function areAllPlayersDefeated(players) {
  return players.every(player => !player.alive);
}
