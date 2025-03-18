// src/components/TypeAnalysis.tsx
import { Pokemon, PokemonType } from "@/types/pokemon";
import { TYPE_CHART } from "@/data/typeChart";
import { TYPE_COLORS } from "@/utils/PokemonTheme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TypeBadge } from "./TypeBadge";

interface TypeAnalysisProps {
  team: Pokemon[];
}

export const TypeAnalysis = ({ team }: TypeAnalysisProps) => {
  // Calculate effectiveness for a single Pokémon
  const calculatePokemonDefense = (
    pokemon: Pokemon
  ): Record<PokemonType, number> => {
    const effectiveness: Record<PokemonType, number> = Object.keys(
      TYPE_CHART
    ).reduce(
      (acc, type) => ({ ...acc, [type]: 1 }),
      {} as Record<PokemonType, number>
    );

    pokemon.types.forEach((typeInfo) => {
      const defenderType = typeInfo.type.name as PokemonType;
      Object.entries(TYPE_CHART).forEach(([attackType, relations]) => {
        const multiplier = relations[defenderType] || 1;
        effectiveness[attackType] *= multiplier;
      });
    });

    return effectiveness;
  };

  // Calculate team totals
  const calculateTeamTotals = (
    allEffectiveness: Record<PokemonType, number>[]
  ) => {
    const types = Object.keys(TYPE_CHART) as PokemonType[];
    return types.reduce((acc, type) => {
      const weakCount = allEffectiveness.filter((e) => e[type] > 1).length;
      const resistCount = allEffectiveness.filter((e) => e[type] < 1).length;
      return {
        ...acc,
        [type]: { weak: weakCount, resist: resistCount },
      };
    }, {} as Record<PokemonType, { weak: number; resist: number }>);
  };

  const formatEffectiveness = (value: number): string => {
    if (value === 0) return "immune";
    if (value === 0.25) return "¼";
    if (value === 0.5) return "½";
    if (value === 1) return "";
    if (value === 2) return "2x";
    if (value === 4) return "4x";
    return value.toString();
  };

  const getEffectivenessClass = (value: number): string => {
    if (value === 0) return "bg-gray-500 text-white px-2 rounded text-sm";
    if (value > 1) return "text-red-500 dark:text-red-400 font-bold";
    if (value < 1) return "text-green-500 dark:text-green-400 font-bold";
    return "";
  };

  // Get the best available sprite for display
  const getBestSprite = (pokemon: Pokemon) => {
    // Try to get official artwork first (highest quality)
    // @ts-ignore
    const officialArtwork =
      pokemon.sprites?.other?.["official-artwork"]?.front_default;
    // @ts-ignore
    const homeArtwork = pokemon.sprites?.other?.home?.front_default;
    // If none of the high-quality options are available, fall back to regular sprite
    return officialArtwork || homeArtwork || pokemon.sprites.front_default;
  };

  const pokemonEffectiveness = team.map((pokemon) =>
    calculatePokemonDefense(pokemon)
  );
  const teamTotals = calculateTeamTotals(pokemonEffectiveness);

  return (
    <Card className="w-full dark:bg-gray-800 dark:border-gray-700 animate-pop-in">
      <CardHeader>
        <CardTitle className="dark:text-white">Defensive Coverage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-center">
            <thead>
              <tr>
                <th className="px-2 py-1 text-left dark:text-gray-300">
                  Move ↓
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
                      </div>
                    </th>
                  );
                })}
                <th className="px-2 py-1 dark:text-gray-300">Total Weak</th>
                <th className="px-2 py-1 dark:text-gray-300">Total Resist</th>
              </tr>
            </thead>
            <tbody>
              {(Object.keys(TYPE_CHART) as PokemonType[]).map((type) => {
                const typeColors = TYPE_COLORS[type];

                return (
                  <tr key={type} className="border-t dark:border-gray-700">
                    <td
                      className={cn(
                        "px-2 py-1 text-left font-medium capitalize",
                        "transition-colors duration-150",
                        typeColors.bg,
                        typeColors.text
                      )}
                    >
                      {type}
                    </td>
                    {team.map((_, idx) => (
                      <td key={idx} className="px-2 py-1 dark:text-gray-200">
                        <span
                          className={getEffectivenessClass(
                            pokemonEffectiveness[idx][type]
                          )}
                        >
                          {formatEffectiveness(pokemonEffectiveness[idx][type])}
                        </span>
                      </td>
                    ))}
                    <td
                      className={cn(
                        "px-2 py-1",
                        teamTotals[type].weak > 0
                          ? "text-red-500 dark:text-red-400 font-bold"
                          : "dark:text-gray-300"
                      )}
                    >
                      {teamTotals[type].weak || ""}
                    </td>
                    <td
                      className={cn(
                        "px-2 py-1",
                        teamTotals[type].resist > 0
                          ? "text-green-500 dark:text-green-400 font-bold"
                          : "dark:text-gray-300"
                      )}
                    >
                      {teamTotals[type].resist || ""}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
