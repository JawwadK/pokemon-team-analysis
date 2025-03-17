// src/components/TypeRecommendations.tsx
import { useState, useMemo } from "react";
import { Pokemon, PokemonType } from "@/types/pokemon";
import { TYPE_CHART } from "@/data/typeChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface TypeRecommendationsProps {
  team: Pokemon[];
  availablePokemon: Pokemon[];
  onAddPokemon: (pokemon: Pokemon, slot: number) => void;
}

export const TypeRecommendations = ({
  team,
  availablePokemon,
  onAddPokemon,
}: TypeRecommendationsProps) => {
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<Pokemon | null>(null);

  // Find team weaknesses
  const teamWeaknesses = useMemo(() => {
    if (team.length === 0) return [];

    // Calculate the defensive coverage for the whole team
    const typeWeaknesses: Record<PokemonType, number> = {};

    // Initialize all types with 0 count
    Object.keys(TYPE_CHART).forEach((type) => {
      typeWeaknesses[type as PokemonType] = 0;
    });

    // Count how many team members are weak to each type
    team.forEach((pokemon) => {
      const pokemonDefense = calculatePokemonDefense(pokemon);

      Object.entries(pokemonDefense).forEach(([type, effectiveness]) => {
        if (effectiveness > 1) {
          typeWeaknesses[type as PokemonType]++;
        }
      });
    });

    // Sort types by weakness count (descending)
    return Object.entries(typeWeaknesses)
      .filter(([_, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([type, count]) => ({
        type: type as PokemonType,
        count,
        percentage: Math.round((count / team.length) * 100),
      }));
  }, [team]);

  // Find Pokémon that help cover the top weaknesses
  const recommendations = useMemo(() => {
    if (team.length === 0 || team.length >= 6 || teamWeaknesses.length === 0) {
      return [];
    }

    const topWeaknesses = teamWeaknesses.slice(0, 3).map((w) => w.type);
    const teamIds = new Set(team.map((p) => p.id));

    // Find Pokémon that resist or are immune to top weaknesses
    return availablePokemon
      .filter((pokemon) => !teamIds.has(pokemon.id))
      .map((pokemon) => {
        const defenses = calculatePokemonDefense(pokemon);
        const resistCount = topWeaknesses.filter(
          (type) => defenses[type] < 1
        ).length;
        const immuneCount = topWeaknesses.filter(
          (type) => defenses[type] === 0
        ).length;

        return {
          pokemon,
          resistCount,
          immuneCount,
          score: resistCount + immuneCount * 2, // Immunity is worth double
        };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [team, availablePokemon, teamWeaknesses]);

  // Helper function to calculate type effectiveness for a Pokémon
  function calculatePokemonDefense(
    pokemon: Pokemon
  ): Record<PokemonType, number> {
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
        effectiveness[attackType as PokemonType] *= multiplier;
      });
    });

    return effectiveness;
  }

  // Get best sprite for display
  const getBestSprite = (pokemon: Pokemon) => {
    // @ts-ignore
    const officialArtwork =
      pokemon.sprites?.other?.["official-artwork"]?.front_default;
    // @ts-ignore
    const homeArtwork = pokemon.sprites?.other?.home?.front_default;
    return officialArtwork || homeArtwork || pokemon.sprites.front_default;
  };

  if (team.length === 0) {
    return null;
  }

  if (team.length >= 6) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Team Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500">
            Your team is full. Remove a Pokémon to get recommendations.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        {teamWeaknesses.length > 0 ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Team Weaknesses</h3>
              <div className="flex flex-wrap gap-2">
                {teamWeaknesses.slice(0, 5).map((weakness) => (
                  <div
                    key={weakness.type}
                    className="flex items-center bg-red-100 text-red-800 px-3 py-1 rounded-full"
                  >
                    <span className="capitalize">{weakness.type}</span>
                    <span className="ml-1 text-xs">
                      ({weakness.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {recommendations.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Recommended Pokémon
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                  {recommendations.map(
                    ({ pokemon, resistCount, immuneCount }) => (
                      <div
                        key={pokemon.id}
                        className="border rounded-lg p-2 flex flex-col items-center hover:bg-slate-50 cursor-pointer"
                        onClick={() => {
                          setSelectedRecommendation(pokemon);
                        }}
                      >
                        <img
                          src={getBestSprite(pokemon)}
                          alt={pokemon.name}
                          className="w-20 h-20 object-contain"
                        />
                        <p className="text-sm font-medium capitalize">
                          {pokemon.name}
                        </p>
                        <div className="flex gap-1 my-1">
                          {pokemon.types.map((type) => (
                            <span
                              key={type.type.name}
                              className="px-2 py-0.5 rounded-full text-xs bg-slate-200"
                            >
                              {type.type.name}
                            </span>
                          ))}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          {resistCount > 0 && (
                            <span className="text-green-600 mr-2">
                              Resists: {resistCount}
                            </span>
                          )}
                          {immuneCount > 0 && (
                            <span className="text-blue-600">
                              Immune: {immuneCount}
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>

                {selectedRecommendation && (
                  <div className="mt-4 p-3 bg-slate-50 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={getBestSprite(selectedRecommendation)}
                        alt={selectedRecommendation.name}
                        className="w-12 h-12 mr-2"
                      />
                      <div>
                        <p className="font-medium capitalize">
                          {selectedRecommendation.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Would improve your team's coverage against{" "}
                          {teamWeaknesses
                            .slice(0, 2)
                            .map((w) => w.type)
                            .join(" and ")}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        // Find the first empty slot
                        const emptySlot = Array(6)
                          .fill(null)
                          .findIndex((_, i) => team.length <= i);

                        if (emptySlot !== -1) {
                          onAddPokemon(selectedRecommendation, emptySlot);
                          setSelectedRecommendation(null);
                        }
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Add to Team <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No significant weaknesses detected in your team. Great job!
          </p>
        )}
      </CardContent>
    </Card>
  );
};
