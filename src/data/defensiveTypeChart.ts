// src/data/defensiveTypeChart.ts
import { PokemonType } from "@/types/pokemon";

// Adding Fairy to PokemonType if needed
export type PokemonTypeWithFairy = PokemonType | "fairy";

/**
 * DEFENSIVE_TYPE_CHART - Shows how much damage a Pokémon of a certain type takes from each attacking type
 *
 * Key structure:
 * [defenseType][attackType] = effectiveness multiplier
 *
 * Example:
 * DEFENSIVE_TYPE_CHART.fire.water = 2 means a Fire-type Pokémon takes 2x damage from Water attacks
 */
export const DEFENSIVE_TYPE_CHART: Record<
  PokemonTypeWithFairy,
  Partial<Record<PokemonTypeWithFairy, number>>
> = {
  normal: {
    fighting: 2,
    ghost: 0,
  },
  fire: {
    water: 2,
    ground: 2,
    rock: 2,
    fire: 0.5,
    grass: 0.5,
    ice: 0.5,
    bug: 0.5,
    steel: 0.5,
    fairy: 0.5,
  },
  water: {
    electric: 2,
    grass: 2,
    fire: 0.5,
    water: 0.5,
    ice: 0.5,
    steel: 0.5,
  },
  electric: {
    ground: 2,
    electric: 0.5,
    flying: 0.5,
    steel: 0.5,
  },
  grass: {
    fire: 2,
    ice: 2,
    poison: 2,
    flying: 2,
    bug: 2,
    water: 0.5,
    electric: 0.5,
    grass: 0.5,
    ground: 0.5,
  },
  ice: {
    fire: 2,
    fighting: 2,
    rock: 2,
    steel: 2,
    ice: 0.5,
  },
  fighting: {
    flying: 2,
    psychic: 2,
    fairy: 2,
    bug: 0.5,
    rock: 0.5,
    dark: 0.5,
  },
  poison: {
    ground: 2,
    psychic: 2,
    fighting: 0.5,
    poison: 0.5,
    bug: 0.5,
    grass: 0.5,
    fairy: 0.5,
  },
  ground: {
    water: 2,
    grass: 2,
    ice: 2,
    poison: 0.5,
    rock: 0.5,
    electric: 0,
  },
  flying: {
    electric: 2,
    ice: 2,
    rock: 2,
    fighting: 0.5,
    bug: 0.5,
    grass: 0.5,
    ground: 0,
  },
  psychic: {
    bug: 2,
    ghost: 2,
    dark: 2,
    fighting: 0.5,
    psychic: 0.5,
  },
  bug: {
    fire: 2,
    flying: 2,
    rock: 2,
    fighting: 0.5,
    ground: 0.5,
    grass: 0.5,
  },
  rock: {
    water: 2,
    grass: 2,
    fighting: 2,
    ground: 2,
    steel: 2,
    normal: 0.5,
    fire: 0.5,
    poison: 0.5,
    flying: 0.5,
  },
  ghost: {
    ghost: 2,
    dark: 2,
    poison: 0.5,
    bug: 0.5,
    normal: 0,
    fighting: 0,
  },
  dragon: {
    ice: 2,
    dragon: 2,
    fairy: 2,
    fire: 0.5,
    water: 0.5,
    electric: 0.5,
    grass: 0.5,
  },
  dark: {
    fighting: 2,
    bug: 2,
    fairy: 2,
    ghost: 0.5,
    dark: 0.5,
    psychic: 0,
  },
  steel: {
    fire: 2,
    fighting: 2,
    ground: 2,
    normal: 0.5,
    grass: 0.5,
    ice: 0.5,
    flying: 0.5,
    psychic: 0.5,
    bug: 0.5,
    rock: 0.5,
    dragon: 0.5,
    steel: 0.5,
    fairy: 0.5,
    poison: 0,
  },
  fairy: {
    poison: 2,
    steel: 2,
    fighting: 0.5,
    bug: 0.5,
    dark: 0.5,
    dragon: 0,
  },
};

/**
 * Helper function to calculate defensive effectiveness for a Pokémon with multiple types
 * Takes all defensive types of a Pokémon and calculates effectiveness against all attacking types
 */
export function calculateDefensiveEffectiveness(
  defensiveTypes: PokemonTypeWithFairy[]
): Record<PokemonTypeWithFairy, number> {
  // Start with neutral effectiveness for all types
  const allAttackTypes = Object.keys(
    DEFENSIVE_TYPE_CHART
  ) as PokemonTypeWithFairy[];
  const result: Record<PokemonTypeWithFairy, number> = {} as Record<
    PokemonTypeWithFairy,
    number
  >;

  allAttackTypes.forEach((attackType) => {
    result[attackType] = 1;
  });

  // Calculate effectiveness for each defensive type
  defensiveTypes.forEach((defenseType) => {
    const typeDefenses = DEFENSIVE_TYPE_CHART[defenseType];
    if (typeDefenses) {
      Object.entries(typeDefenses).forEach(([attackType, multiplier]) => {
        result[attackType as PokemonTypeWithFairy] *= multiplier;
      });
    }
  });

  return result;
}
