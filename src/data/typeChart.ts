// src/data/typeChart.ts
import { PokemonType } from '@/types/pokemon';

// Adding Fairy to PokemonType
export type PokemonTypeWithFairy = PokemonType | 'fairy';

export const TYPE_CHART: Record<PokemonTypeWithFairy, Partial<Record<PokemonTypeWithFairy, number>>> = {
  normal: { ghost: 0, rock: 0.5, steel: 0.5, fighting: 2 },
  fire: {
    fire: 0.5, water: 2, grass: 0.5, ice: 0.5, bug: 0.5, 
    rock: 2, dragon: 0.5, steel: 0.5, ground: 2
  },
  water: {
    fire: 0.5, water: 0.5, grass: 2, ground: 0.5, 
    rock: 0.5, dragon: 0.5, electric: 2
  },
  electric: {
    water: 0.5, electric: 0.5, grass: 0.5, ground: 2, 
    flying: 0.5, dragon: 0.5
  },
  grass: {
    fire: 2, water: 0.5, grass: 0.5, poison: 2, ground: 0.5, 
    flying: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2, ice: 2
  },
  ice: {
    fire: 2, water: 0.5, grass: 0.5, ice: 0.5, ground: 2, 
    flying: 2, dragon: 2, steel: 2, fighting: 2, rock: 2
  },
  fighting: {
    normal: 0.5, ice: 0.5, poison: 2, flying: 2, psychic: 2, 
    bug: 0.5, rock: 0.5, ghost: 0, steel: 0.5, dark: 0.5
  },
  poison: {
    grass: 0.5, poison: 0.5, ground: 2, rock: 2, 
    ghost: 0.5, steel: 0, psychic: 2
  },
  ground: {
    fire: 0.5, electric: 0, grass: 2, poison: 0.5, 
    flying: 0, bug: 0.5, rock: 0.5, steel: 2, water: 2
  },
  flying: {
    electric: 2, grass: 0.5, fighting: 0.5, bug: 0.5, 
    rock: 2, steel: 2, ice: 2
  },
  psychic: {
    fighting: 0.5, poison: 0.5, psychic: 0.5, dark: 2, 
    steel: 2, ghost: 2
  },
  bug: {
    fire: 2, grass: 0.5, fighting: 0.5, poison: 2, flying: 2,
    psychic: 0.5, ghost: 0.5, dark: 0.5, steel: 2
  },
  rock: {
    fire: 0.5, ice: 0.5, fighting: 2, ground: 2, 
    flying: 0.5, bug: 0.5, steel: 2, water: 2, grass: 2
  },
  ghost: {
    normal: 0, psychic: 0.5, ghost: 2, dark: 2, 
    steel: 2, poison: 0.5
  },
  dragon: {
    dragon: 2, steel: 2, ice: 2, fairy: 2
  },
  dark: {
    fighting: 2, psychic: 0, ghost: 0.5, dark: 0.5, 
    steel: 2, fairy: 2
  },
  steel: {
    fire: 2, water: 2, electric: 2, ice: 0.5, 
    rock: 0.5, steel: 0.5, fighting: 2, ground: 2,
    fairy: 0.5
  },
  fairy: {
    poison: 2, steel: 2,
    fighting: 0.5, dragon: 0,
    dark: 0.5, bug: 0.5
  }
} as const;

export type TypeEffectiveness = {
  [type in PokemonTypeWithFairy]: number;
};