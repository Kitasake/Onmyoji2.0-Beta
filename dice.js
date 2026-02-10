// dice.js
export function rollDice(diceString, bonusDice = 0) {
  const [count, sides] = diceString.split("d").map(Number);
  const totalDice = count + bonusDice;

  const rolls = [];
  let total = 0;

  for (let i = 0; i < totalDice; i++) {
    const roll = Math.floor(Math.random() * sides) + 1;
    rolls.push(roll);
    total += roll;
  }

  return { rolls, total };
}
