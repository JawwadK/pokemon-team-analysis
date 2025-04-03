// src/components/TypeAnalysis.tsx
import { Pokemon, PokemonType } from "@/types/pokemon";
import {
  DEFENSIVE_TYPE_CHART,
  calculateDefensiveEffectiveness,
  PokemonTypeWithFairy,
} from "@/data/defensiveTypeChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TypeBadge } from "./TypeBadge";

interface TypeAnalysisProps {
  team: Pokemon[];
}

export const TypeAnalysis = ({ team }: TypeAnalysisProps) => {
  // Format effectiveness values for display
  const formatEffectiveness = (value: number): string => {
    if (value === 0) return "0";
    if (value === 0.25) return "¼×";
    if (value === 0.5) return "½×";
    if (value === 1) return "";
    if (value === 2) return "2×";
    if (value === 4) return "4×";
    return value.toString() + "×";
  };

  // Get CSS class for each effectiveness value
  const getEffectivenessClass = (value: number): string => {
    if (value === 0)
      return "bg-purple-500 text-white px-2 rounded-full text-sm";
    if (value === 4) return "text-red-600 dark:text-red-500 font-bold";
    if (value === 2) return "text-red-500 dark:text-red-400 font-bold";
    if (value === 0.5) return "text-green-500 dark:text-green-400 font-bold";
    if (value === 0.25) return "text-green-600 dark:text-green-500 font-bold";
    return "";
  };

  // Get the best available sprite for display
const getBestSprite = (pokemon: Pokemon) => {
  // Using a more specific type assertion instead of 'any'
  interface ExtendedSprites {
    front_default: string;
    back_default: string;
    other?: {
      "official-artwork"?: {
        front_default: string;
      };
      home?: {
        front_default: string;
      };
    };
  }

  const sprites = pokemon.sprites as ExtendedSprites;
  const officialArtwork = sprites?.other?.["official-artwork"]?.front_default;
  const homeArtwork = sprites?.other?.home?.front_default;
  return officialArtwork || homeArtwork || pokemon.sprites.front_default;
};

  // Calculate defensive effectiveness for each Pokémon
  const pokemonDefensiveEffectiveness = team.map((pokemon) => {
    const defensiveTypes = pokemon.types.map((t) => t.type.name);
    return calculateDefensiveEffectiveness(defensiveTypes);
  });

  // Calculate team totals
  const calculateTeamTotals = () => {
    const allAttackTypes = Object.keys(DEFENSIVE_TYPE_CHART);
    const result: Record<
      string,
      { weak: number; resist: number; immune: number }
    > = {};

      allAttackTypes.forEach((attackType) => {
        const weakCount = pokemonDefensiveEffectiveness.filter(
          (poke) => poke[attackType as PokemonTypeWithFairy] > 1
        ).length;

        const resistCount = pokemonDefensiveEffectiveness.filter(
          (poke) => poke[attackType as PokemonTypeWithFairy] < 1 && poke[attackType as PokemonTypeWithFairy] > 0
        ).length;

        const immuneCount = pokemonDefensiveEffectiveness.filter(
          (poke) => poke[attackType as PokemonTypeWithFairy] === 0
        ).length;

        result[attackType as PokemonTypeWithFairy] = {
          weak: weakCount,
          resist: resistCount,
          immune: immuneCount,
        };
      });

    return result;
  };

  const teamTotals = calculateTeamTotals();

  return (
    <Card className="w-full dark:bg-gray-800 dark:border-gray-700 animate-pop-in">
      <CardHeader>
        <CardTitle className="dark:text-white">
          Defensive Type Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-center">
            <thead>
              <tr>
                <th className="px-2 py-1 text-left dark:text-gray-300">
                  Attack ↓
                </th>
                {team.map((pokemon, idx) => {
                  const spriteUrl = getBestSprite(pokemon);

                  return (
                    <th key={idx} className="px-2 py-1">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 flex items-center justify-center">
                          <img
                            src={spriteUrl}
                            alt={pokemon.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="text-xs capitalize mt-1 dark:text-white">
                          {pokemon.name}
                        </div>
                        <div className="flex gap-1 mt-1">
                          {pokemon.types.map((type) => (
                            <TypeBadge
                              key={type.type.name}
                              type={type.type.name}
                              size="sm"
                            />
                          ))}
                        </div>
                      </div>
                    </th>
                  );
                })}
                <th className="px-2 py-1 dark:text-gray-300">Weak</th>
                <th className="px-2 py-1 dark:text-gray-300">Resist</th>
                <th className="px-2 py-1 dark:text-gray-300">Immune</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(DEFENSIVE_TYPE_CHART).map((attackType) => (
                <tr
                  key={attackType}
                  className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td
                    className={cn(
                      "px-3 py-2 text-left font-medium capitalize",
                      "transition-colors duration-150 flex items-center"
                    )}
                  >
                    <TypeBadge type={attackType as PokemonType} size="sm" />
                  </td>
                  {team.map((_, idx) => (
                    <td key={idx} className="px-2 py-1 dark:text-gray-200">
                      <span
                        className={getEffectivenessClass(
                          pokemonDefensiveEffectiveness[idx][attackType as PokemonTypeWithFairy]
                        )}
                      >
                        {formatEffectiveness(
                          pokemonDefensiveEffectiveness[idx][attackType  as PokemonTypeWithFairy]
                        )}
                      </span>
                    </td>
                  ))}
                  <td
                    className={cn(
                      "px-2 py-1",
                      teamTotals[attackType].weak > 0
                        ? "text-red-500 dark:text-red-400 font-bold"
                        : "dark:text-gray-300"
                    )}
                  >
                    {teamTotals[attackType].weak || "-"}
                  </td>
                  <td
                    className={cn(
                      "px-2 py-1",
                      teamTotals[attackType].resist > 0
                        ? "text-green-500 dark:text-green-400 font-bold"
                        : "dark:text-gray-300"
                    )}
                  >
                    {teamTotals[attackType].resist || "-"}
                  </td>
                  <td
                    className={cn(
                      "px-2 py-1",
                      teamTotals[attackType].immune > 0
                        ? "text-purple-500 dark:text-purple-400 font-bold"
                        : "dark:text-gray-300"
                    )}
                  >
                    {teamTotals[attackType].immune || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800">
            <div className="text-sm font-medium text-red-800 dark:text-red-300 mb-1">
              Type Weaknesses
            </div>
            <div className="text-xs text-red-700 dark:text-red-400">
              Shows how many of your Pokémon take super-effective damage (2× or
              4×) from each type of attack
            </div>
          </div>

          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
            <div className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">
              Type Resistances
            </div>
            <div className="text-xs text-green-700 dark:text-green-400">
              Shows how many of your Pokémon resist damage (½× or ¼×) from each
              type of attack
            </div>
          </div>

          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
            <div className="text-sm font-medium text-purple-800 dark:text-purple-300 mb-1">
              Type Immunities
            </div>
            <div className="text-xs text-purple-700 dark:text-purple-400">
              Shows how many of your Pokémon are completely immune (0×) to each
              type of attack
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
