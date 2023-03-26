const baseMaterial = {
  "ironOre": {
    "name": "Iron Ore",
    "produced": 0,
    "used": 0,
    "remaining": 0,
  },
  "copperOre": {
    "name": "Copper Ore",
    "produced": 0,
    "used": 0,
    "remaining": 0,
  },
  "cateriumOre": {
    "name": "Caterium Ore",
    "produced": 0,
    "used": 0,
    "remaining": 0,
  },
  "coal": {
    "name": "Coal",
    "produced": 0,
    "used": 0,
    "remaining": 0,
  },
  "limsestone": {
    "name": "Limestone",
    "produced": 0,
    "used": 0,
    "remaining": 0,
  },
  "water": {
    "name": "Water",
    "produced": 0,
    "used": 0,
    "remaining": 0,
  },
  "bauxite": {
    "name": "Bauxite",
    "produced": 0,
    "used": 0,
    "remaining": 0,
  },
  "rawQuartz": {
    "name": "Raw Quartz",
    "produced": 0,
    "used": 0,
    "remaining": 0,
  },
  "samOre": {
    "name": "SAM Ore",
    "produced": 0,
    "used": 0,
    "remaining": 0,
  },
  "sulfur": {
    "name": "Sulfur",
    "produced": 0,
    "used": 0,
    "remaining": 0,
  },
  "uranium": {
    "name": "Uranium",
    "produced": 0,
    "used": 0,
    "remaining": 0,
  }
}

const items = {
  "ironIngot": {
    "name": "Iron Ingot",
    "produced": 0,
    "used": 0,
    "remaining": 0,
    "recipes": [
      {
        "recipeName": "Iron Ingot",
        "building": "Smelter",
        "outputQuantity": 30,
        "ingredients": {
          "ironOre": 30
        }
      }, 
      {
        "recipeName": "Pure Iron Ingot",
        "building": "Refinery",
        "outputQuantity": 65,
        "ingredients": {
          "ironOre": 35,
          "water": 20
        }
      }, 
      {
        "recipeName": "Iron Alloy Ingot",
        "building": "Foundry",
        "outputQuantity": 50,
        "ingredients": {
          "ironOre": 20,
          "copperOre": 20
        }
      }, 
    ]
  }, 
  "copperIngot": {
    "name": "Copper Ingot",
    "produced": 0,
    "used": 0,
    "remaining": 0,
    "recipes": [
      {
        "recipeName": "Copper Ingot",
        "building": "Smelter",
        "outputQuantity": 30,
        "ingredients": {
          "copperOre": 30
        }
      }, 
      {
        "recipeName": "Copper Alloy Ingot",
        "building": "Foundry",
        "outputQuantity": 100,
        "ingredients": {
          "copperOre": 50,
          "ironOre": 25
        }
      }, 
      {
        "recipeName": "Pure Copper Ingot",
        "building": "Refinery",
        "outputQuantity": 37.5,
        "ingredients": {
          "copperOre": 15,
          "water": 10
        }
      }, 
    ]
  },  
  "steelIngot": {
    "name": "Steel Ingot",
    "produced": 0,
    "used": 0,
    "remaining": 0,
    "recipes": [
      {
        "recipeName": "Steel Ingot",
        "building": "Foundry",
        "outputQuantity": 45,
        "ingredients": {
          "ironOre": 45,
          "coal": 45
        }
      },  
    ]
  },  
  "concrete": {
    "name": "Concrete",
    "produced": 0,
    "used": 0,
    "remaining": 0,
    "recipes": [
      {
        "recipeName": "Concrete",
        "building": "Constructor",
        "outputQuantity": 15,
        "ingredients": {
          "limestone": 45
        }
      },  
    ]
  }, 
  "ironRod": {
    "name": "Iron Rod",
    "produced": 0,
    "used": 0,
    "remaining": 0,
    "recipes": [
      {
        "recipeName": "Iron Rod",
        "building": "Constructor",
        "outputQuantity": 15,
        "ingredients": {
          "ironIngot": 15
        }
      }, 
      {
        "recipeName": "Steel Rod",
        "building": "Constructor",
        "outputQuantity": 48,
        "ingredients": {
          "steelIngot": 12
        }
      },
    ]
  }, 
  "screw": {
    "name": "Screw",
    "produced": 0,
    "used": 0,
    "remaining": 0,
    "recipes": [
      {
        "recipeName": "Screw",
        "building": "Constructor",
        "outputQuantity": 40,
        "ingredients": {
          "ironRod": 10
        }
      }, 
      {
        "recipeName": "Cast Screw",
        "building": "Constructor",
        "outputQuantity": 50,
        "ingredients": {
          "ironIngot": 12.5
        }
      },
    ]
  },
  "ironPlate": {
    "name": "Iron Plate",
    "produced": 0,
    "used": 0,
    "remaining": 0,
    "recipes": [
      {
        "recipeName": "Iron Plate",
        "building": "Constructor",
        "outputQuantity": 20,
        "ingredients": {
          "ironIngot": 30
        }
      },
      {
        "recipeName": "Coated Iron Plate",
        "building": "Assembler",
        "outputQuantity": 75,
        "ingredients": {
          "ironIngot": 50,
          "plastic": 10
        }
      },
      {
        "recipeName": "Steel Coated Plate",
        "building": "Assembler",
        "outputQuantity": 45,
        "ingredients": {
          "steelIngot": 7.5,
          "plastic": 5
        }
      },
    ]
  }, 
  "reinforcedIronPlate": {
    "name": "Reinforced Iron Plate",
    "produced": 0,
    "used": 0,
    "remaining": 0,
    "recipes": [
      {
        "recipeName": "Reinforced Iron Plate",
        "building": "Assembler",
        "outputQuantity": 5,
        "ingredients": {
          "ironPlate": 30,
          "screw": 60
        }
      },
      {
        "recipeName": "Stitched Iron Plate",
        "building": "Assembler",
        "outputQuantity": 5.625,
        "ingredients": {
          "ironPlate": 18.75,
          "wire": 37.5
        }
      },
    ]
  }, 
  "steelBeam": {
    "name": "Steel Beam",
    "produced": 0,
    "used": 0,
    "remaining": 0,
    "recipes": [
      {
        "recipeName": "Steel Beam",
        "building": "Constructor",
        "outputQuantity": 15,
        "ingredients": {
          "steelIngot": 60
        }
      },
    ]
  }, 
  "steelPipe": {
    "name": "Steel Pipe",
    "produced": 0,
    "used": 0,
    "remaining": 0,
    "recipes": [
      {
        "recipeName": "Steel Pipe",
        "building": "Constructor",
        "outputQuantity": 20,
        "ingredients": {
          "steelIngot": 30
        }
      },
    ]
  },
  "encasedIndustrialBeam": {
    "name": "Encased Industrial Beam",
    "produced": 0,
    "used": 0,
    "remaining": 0,
    "recipes": [
      {
        "recipeName": "Encased Industrial Beam",
        "building": "Assembler",
        "outputQuantity": 6,
        "ingredients": {
          "steelBeam": 24,
          "concrete": 30
        }
      },
      {
        "recipeName": "Encased Industrial Pipe",
        "building": "Assembler",
        "outputQuantity": 4,
        "ingredients": {
          "steelPipe": 28,
          "concrete": 20
        }
      },
    ]
  },
  "modularFrame": {
    "name": "Modular Frame",
    "produced": 0,
    "used": 0,
    "remaining": 0,
    "recipes": [
      {
        "recipeName": "Modular Frame",
        "building": "Assembler",
        "outputQuantity": 2,
        "ingredients": {
          "reinforcedIronPlate": 3,
          "ironRod": 12
        }
      },
      {
        "recipeName": "Bolted Frame",
        "building": "Assembler",
        "outputQuantity": 5,
        "ingredients": {
          "reinforcedIronPlate": 7.5,
          "screw": 140
        }
      },
      {
        "recipeName": "Steeled Frame",
        "building": "Assembler",
        "outputQuantity": 3,
        "ingredients": {
          "reinforcedIronPlate": 2,
          "steelPipe": 10
        }
      },
    ]
  }, 
  "heavyModularFrame": {
    "name": "Heavy Modular Frame",
    "produced": 0,
    "used": 0,
    "remaining": 0,
    "recipes": [
      {
        "recipeName": "Heavy Modular Frame",
        "building": "Manufacturer",
        "outputQuantity": 2,
        "ingredients": {
          "modularFrame": 10,
          "steelPipe": 30,
          "encasedIndustrialBeam": 10,
          "screw": 200
        }
      },
      {
        "recipeName": "Heavy Flexible Frame",
        "building": "Manufacturer",
        "outputQuantity": 3.75,
        "ingredients": {
          "modularFrame": 18.75,
          "encasedIndustrialBeam": 11.25,
          "rubber": 75,
          "screw": 390
        }
      },
      {
        "recipeName": "Heavy Encased Frame",
        "building": "Manufacturer",
        "outputQuantity": 2.8125,
        "ingredients": {
          "modularFrame": 7.5,
          "encasedIndustrialBeam": 9.375,
          "steelPipe": 33.75,
          "concrete": 20.625
        }
      },
    ]
  }
}

let buildings = []



let oreOptions = {
  "miners": [
    {
      "mk1": {
        "name": "Miner Mk.1",
        "speed": 1
      }
    },
    {
      "mk2": {
        "name": "Miner Mk.2",
        "speed": 2
      }
    },
    {
      "mk3": {
        "name": "Miner Mk.3",
        "speed": 4
      }
    }
  ],
  "nodePurity": {
    "impure": 30,
    "normal": 60,
    "pure": 120
  }
}



let placeHolder = {
  "copperIngot": {
  "name": "Copper Ingot",
  "produced": 0,
  "used": 0,
  "remaining": 0,
  "recipes": [
      {
        "recipeName": "Copper Ingot",
        "building": "Smelter",
        "outputQuantity": 30,
        "ingredients": {
          "copperOre": 30
        }
      }
    ]
  }
}
