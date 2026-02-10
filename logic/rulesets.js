// logic/rulesets.js
export const BASE_RULES = {
  defenseElementRestriction: "none",
  attackResistance: "none",
  maxDefenseDice: null,
  resistancePenalty: {
    enabled: false,
    removeDice: 0
  }
};

export const RULES = {
  vanilla: {
    label: "Vanilla",
    defenseElementRestriction: "none",
    attackResistance: "none"
  },

  elementalDefense: {
    label: "Elemental Defense Only",
    defenseElementRestriction: "match"
  },

  attackResistanceLite: {
    label: "Attack Resistance (−1 die total)",
    resistancePenalty: {
      enabled: true,
      removeDice: 1
    }
  },

  hardMode: {
    label: "Hard Mode",
    defenseElementRestriction: "match",
    resistancePenalty: {
      enabled: true,
      removeDice: 1
    },
    maxDefenseDice: 6
  }
};
