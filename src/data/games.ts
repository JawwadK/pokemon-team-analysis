// src/data/games.ts
import { GameData } from '@/types/pokemon';

export const GAME_DATA: Record<string, GameData> = {
  // Generation 1
  "Red/Blue/Yellow": {
    name: "Red/Blue/Yellow",
    generation: 1,
    regionalDex: Array.from({ length: 151 }, (_, i) => i + 1),
    nationalDex: false,
    availablePokemon: Array.from({ length: 151 }, (_, i) => i + 1)
  },
  
  // Generation 2
  "Gold/Silver/Crystal": {
    name: "Gold/Silver/Crystal",
    generation: 2,
    regionalDex: Array.from({ length: 251 }, (_, i) => i + 1),
    nationalDex: true,
    availablePokemon: Array.from({ length: 251 }, (_, i) => i + 1)
  },
  
  // Generation 3
  "Ruby/Sapphire/Emerald": {
    name: "Ruby/Sapphire/Emerald",
    generation: 3,
    regionalDex: Array.from({ length: 202 }, (_, i) => i + 1), // Hoenn dex
    nationalDex: true,
    availablePokemon: Array.from({ length: 386 }, (_, i) => i + 1)
  },
  "FireRed/LeafGreen": {
    name: "FireRed/LeafGreen",
    generation: 3,
    regionalDex: Array.from({ length: 151 }, (_, i) => i + 1), // Kanto dex
    nationalDex: true,
    availablePokemon: Array.from({ length: 386 }, (_, i) => i + 1)
  },
  
  // Generation 4
  "Diamond/Pearl/Platinum": {
    name: "Diamond/Pearl/Platinum",
    generation: 4,
    regionalDex: Array.from({ length: 210 }, (_, i) => i + 1), // Sinnoh dex
    nationalDex: true,
    availablePokemon: Array.from({ length: 493 }, (_, i) => i + 1)
  },
  "HeartGold/SoulSilver": {
    name: "HeartGold/SoulSilver",
    generation: 4,
    regionalDex: Array.from({ length: 256 }, (_, i) => i + 1), // Johto dex
    nationalDex: true,
    availablePokemon: Array.from({ length: 493 }, (_, i) => i + 1)
  },
  
  // Generation 5
  "Black/White": {
    name: "Black/White",
    generation: 5,
    regionalDex: Array.from({ length: 156 }, (_, i) => i + 1), // Unova dex
    nationalDex: true,
    availablePokemon: Array.from({ length: 649 }, (_, i) => i + 1)
  },
  "Black 2/White 2": {
    name: "Black 2/White 2",
    generation: 5,
    regionalDex: Array.from({ length: 301 }, (_, i) => i + 1), // Extended Unova dex
    nationalDex: true,
    availablePokemon: Array.from({ length: 649 }, (_, i) => i + 1)
  },
  
  // Generation 6
  "X/Y": {
    name: "X/Y",
    generation: 6,
    regionalDex: Array.from({ length: 457 }, (_, i) => i + 1), // Kalos dex (Central + Coastal + Mountain)
    nationalDex: true,
    availablePokemon: Array.from({ length: 721 }, (_, i) => i + 1)
  },
  "Omega Ruby/Alpha Sapphire": {
    name: "Omega Ruby/Alpha Sapphire",
    generation: 6,
    regionalDex: Array.from({ length: 211 }, (_, i) => i + 1), // Hoenn dex
    nationalDex: true,
    availablePokemon: Array.from({ length: 721 }, (_, i) => i + 1)
  },
  
  // Generation 7
  "Sun/Moon": {
    name: "Sun/Moon",
    generation: 7,
    regionalDex: Array.from({ length: 302 }, (_, i) => i + 1), // Alola dex
    nationalDex: false,
    availablePokemon: Array.from({ length: 802 }, (_, i) => i + 1)
  },
  "Ultra Sun/Ultra Moon": {
    name: "Ultra Sun/Ultra Moon",
    generation: 7,
    regionalDex: Array.from({ length: 403 }, (_, i) => i + 1), // Extended Alola dex
    nationalDex: false,
    availablePokemon: Array.from({ length: 807 }, (_, i) => i + 1)
  },
  
  // Generation 8
  "Sword/Shield": {
    name: "Sword/Shield",
    generation: 8,
    regionalDex: Array.from({ length: 400 }, (_, i) => i + 1), // Galar dex
    nationalDex: false,
    availablePokemon: [
      ...Array.from({ length: 400 }, (_, i) => i + 1),
      ...Array.from({ length: 211 }, (_, i) => i + 400 + 1) // DLC Pokémon
    ]
  },
  "Brilliant Diamond/Shining Pearl": {
    name: "Brilliant Diamond/Shining Pearl",
    generation: 8,
    regionalDex: Array.from({ length: 151 }, (_, i) => i + 1), // Sinnoh dex
    nationalDex: true,
    availablePokemon: Array.from({ length: 493 }, (_, i) => i + 1)
  },
  "Legends: Arceus": {
    name: "Legends: Arceus",
    generation: 8,
    regionalDex: Array.from({ length: 242 }, (_, i) => i + 1), // Hisui dex
    nationalDex: false,
    availablePokemon: Array.from({ length: 905 }, (_, i) => i + 1)
  },
  
  // Generation 9
  "Scarlet/Violet": {
    name: "Scarlet/Violet",
    generation: 9,
    regionalDex: Array.from({ length: 400 }, (_, i) => i + 1), // Paldea dex
    nationalDex: false,
    availablePokemon: Array.from({ length: 1025 }, (_, i) => i + 1)
  }
};