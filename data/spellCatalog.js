// spellCatalog.js

export const spellCatalog = {
  Fire: {
    attack: [
      {
        name: "Cinder Talisman",
        dice: "1d6",
        type: "attack",
        element: "Fire",
        tier: "basic",
        startingCopies: 6,
        cost: null
      },
      {
        name: "Blazing Ofuda",
        dice: "2d6",
        type: "attack",
        element: "Fire",
        tier: "advanced",
        startingCopies: 0,
        cost: { Fire: 2, Skin: 2 }
      },
      {
        name: "Ritual of the Thousand Flames",
        dice: "3d6",
        type: "attack",
        element: "Fire",
        tier: "master",
        startingCopies: 0,
        cost: { Fire: 3, Skin: 3 }
      }
    ],
    defense: [
      {
        name: "Purifying Ember",
        dice: "1d3",
        type: "defense",
        element: "Fire",
        tier: "basic",
        startingCopies: 4,
        cost: null
      },
      {
        name: "Rite of Burning Ash",
        dice: "2d3",
        type: "defense",
        element: "Fire",
        tier: "advanced",
        startingCopies: 0,
        cost: { Fire: 1, Skin: 1 }
      }
    ]
  },

  Ice: {
  attack: [
    {
      name: "Frostbind Talisman",
      dice: "1d6",
      type: "attack",
      element: "Ice",
      tier: "basic",
      startingCopies: 6,
      cost: null
    },
    {
      name: "Freezing Ofuda",
      dice: "2d6",
      type: "attack",
      element: "Ice",
      tier: "advanced",
      startingCopies: 0,
      cost: { Ice: 2, Skin: 2 }
    },
    {
      name: "Heaven Frost Cataclysm",
      dice: "3d6",
      type: "attack",
      element: "Ice",
      tier: "master",
      startingCopies: 0,
      cost: { Ice: 3, Skin: 3 }
    }
  ],
  defense: [
    {
      name: "Winter Seal",
      dice: "1d3",
      type: "defense",
      element: "Ice",
      tier: "basic",
      startingCopies: 4,
      cost: null
    },
    {
      name: "Eternal Winter Rite",
      dice: "2d3",
      type: "defense",
      element: "Ice",
      tier: "advanced",
      startingCopies: 0,
      cost: { Ice: 1, Skin: 1 }
    }
  ]
},


  Wind: {
  attack: [
    {
      name: "Razorwind Talisman",
      dice: "1d6",
      type: "attack",
      element: "Wind",
      tier: "basic",
      startingCopies: 6,
      cost: null
    },
    {
      name: "Howling Ofuda",
      dice: "2d6",
      type: "attack",
      element: "Wind",
      tier: "advanced",
      startingCopies: 0,
      cost: { Wind: 2, Skin: 2 }
    },
    {
      name: "Thousand Blade Cyclone",
      dice: "3d6",
      type: "attack",
      element: "Wind",
      tier: "master",
      startingCopies: 0,
      cost: { Wind: 3, Skin: 3 }
    }
  ],
  defense: [
    {
      name: "Gale Seal",
      dice: "1d3",
      type: "defense",
      element: "Wind",
      tier: "basic",
      startingCopies: 4,
      cost: null
    },
    {
      name: "Rite of the Unbound Tempest",
      dice: "2d3",
      type: "defense",
      element: "Wind",
      tier: "advanced",
      startingCopies: 0,
      cost: { Wind: 1, Skin: 1 }
    }
  ]
},


  Lightning: {
  attack: [
    {
      name: "Stormcall Talisman",
      dice: "1d6",
      type: "attack",
      element: "Lightning",
      tier: "basic",
      startingCopies: 6,
      cost: null
    },
    {
      name: "Storm-Touched Ofuda",
      dice: "2d6",
      type: "attack",
      element: "Lightning",
      tier: "advanced",
      startingCopies: 0,
      cost: { Lightning: 2, Skin: 2 }
    },
    {
      name: "Raijin's Judgment",
      dice: "3d6",
      type: "attack",
      element: "Lightning",
      tier: "master",
      startingCopies: 0,
      cost: { Lightning: 3, Skin: 3 }
    }
  ],
  defense: [
    {
      name: "Static Seal",
      dice: "1d3",
      type: "defense",
      element: "Lightning",
      tier: "basic",
      startingCopies: 4,
      cost: null
    },
    {
      name: "Cataclysmic Storm Rite",
      dice: "2d3",
      type: "defense",
      element: "Lightning",
      tier: "advanced",
      startingCopies: 0,
      cost: { Lightning: 1, Skin: 1 }
    }
  ]
},

  Light: {
  attack: [
    {
      name: "Amaterasu's Divine Radiance",
      dice: "3d6",
      type: "attack",
      element: "Light",
      tier: "legendary",
      startingCopies: 0,
      cost: null
    }
  ],
  defense: []
}

};





