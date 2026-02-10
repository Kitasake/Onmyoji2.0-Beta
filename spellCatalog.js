// spellCatalog.js

export const spellCatalog = {
  Fire: {
    attack: [
      { name: "Cinder Talisman", dice: "1d6", type: "attack", element: "Fire" },
      { name: "Cinder Talisman", dice: "1d6", type: "attack", element: "Fire" },

      { name: "Blazing Ofuda", dice: "2d6", type: "attack", element: "Fire" },
      { name: "Blazing Ofuda", dice: "2d6", type: "attack", element: "Fire" },

      { name: "Ritual of the Thousand Flames", dice: "3d6", type: "attack", element: "Fire" }
    ],
    defense: [
      { name: "Scorching Seal", dice: "1d3", type: "defense", element: "Fire" },
      { name: "Scorching Seal", dice: "1d3", type: "defense", element: "Fire" },

      { name: "Rite of Burning Ash", dice: "2d3", type: "defense", element: "Fire" },
      { name: "Rite of Burning Ash", dice: "2d3", type: "defense", element: "Fire" }
    ]
  },

  Ice: {
    attack: [
      { name: "Frostbind Talisman", dice: "1d6", type: "attack", element: "Ice" },
      { name: "Frostbind Talisman", dice: "1d6", type: "attack", element: "Ice" },

      { name: "Freezing Ofuda", dice: "2d6", type: "attack", element: "Ice" },
      { name: "Freezing Ofuda", dice: "2d6", type: "attack", element: "Ice" },

      { name: "Heaven Frost Cataclysm", dice: "3d6", type: "attack", element: "Ice" }
    ],
    defense: [
      { name: "Winter Seal", dice: "1d3", type: "defense", element: "Ice" },
      { name: "Winter Seal", dice: "1d3", type: "defense", element: "Ice" },

      { name: "Eternal Winter Rite", dice: "2d3", type: "defense", element: "Ice" },
      { name: "Eternal Winter Rite", dice: "2d3", type: "defense", element: "Ice" }
    ]
  },

  Wind: {
    attack: [
      { name: "Razorwind Talisman", dice: "1d6", type: "attack", element: "Wind" },
      { name: "Razorwind Talisman", dice: "1d6", type: "attack", element: "Wind" },

      { name: "Howling Ofuda", dice: "2d6", type: "attack", element: "Wind" },
      { name: "Howling Ofuda", dice: "2d6", type: "attack", element: "Wind" },

      { name: "Thousand Blade Cyclone", dice: "3d6", type: "attack", element: "Wind" }
    ],
    defense: [
      { name: "Gale Seal", dice: "1d3", type: "defense", element: "Wind" },
      { name: "Gale Seal", dice: "1d3", type: "defense", element: "Wind" },

      { name: "Rite of the Unbound Tempest", dice: "2d3", type: "defense", element: "Wind" },
      { name: "Rite of the Unbound Tempest", dice: "2d3", type: "defense", element: "Wind" }
    ]
  },

  Lightning: {
    attack: [
      { name: "Stormcall Talisman", dice: "1d6", type: "attack", element: "Lightning" },
      { name: "Stormcall Talisman", dice: "1d6", type: "attack", element: "Lightning" },

      { name: "Storm-Touched Ofuda", dice: "2d6", type: "attack", element: "Lightning" },
      { name: "Storm-Touched Ofuda", dice: "2d6", type: "attack", element: "Lightning" },

      { name: "Raijin's Judgment", dice: "3d6", type: "attack", element: "Lightning" }
    ],
    defense: [
      { name: "Static Seal", dice: "1d3", type: "defense", element: "Lightning" },
      { name: "Static Seal", dice: "1d3", type: "defense", element: "Lightning" },

      { name: "Cataclysmic Storm Rite", dice: "2d3", type: "defense", element: "Lightning" },
      { name: "Cataclysmic Storm Rite", dice: "2d3", type: "defense", element: "Lightning" }
    ]
  }

  // Ice, Wind, Lightning follow same structure
};


