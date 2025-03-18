// src/components/TypeRecommendations.tsx
import { useState, useMemo } from "react";
import { Pokemon, PokemonType } from "@/types/pokemon";
import { TYPE_CHART } from "@/data/typeChart";
import { GAME_DATA } from "@/data/games";
import { TYPE_COLORS } from "@/utils/PokemonTheme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Info, Star, Shield, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { TypeBadge } from "./TypeBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TypeRecommendationsProps {
  team: Pokemon[];
  availablePokemon: Pokemon[];
  onAddPokemon: (pokemon: Pokemon) => void;
  selectedGame?: string;
}

export const TypeRecommendations = ({
  team,
  availablePokemon,
  onAddPokemon,
  selectedGame = "",
}: TypeRecommendationsProps) => {
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<Pokemon | null>(null);
  const [activeTab, setActiveTab] = useState("coverage");

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

  // Get coverage recommendations (Pokémon that help cover team weaknesses)
  const coverageRecommendations = useMemo(() => {
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

  // Get game-specific recommendations
  const gameSpecificRecommendations = useMemo(() => {
    if (!selectedGame || team.length === 0 || team.length >= 6) {
      return [];
    }

    const gameData = GAME_DATA[selectedGame];
    if (!gameData) return [];

    const teamIds = new Set(team.map((p) => p.id));
    const teamTypes = new Set(
      team.flatMap((p) => p.types.map((t) => t.type.name))
    );

    // Determine game generation and version-specific strong Pokémon
    const generationSignaturePokemon = getGenerationSignaturePokemon(
      gameData.generation
    );

    // Get recommendations based on:
    // 1. Game mascots and signature Pokémon for that generation
    // 2. Strong Pokémon for that generation by type coverage
    // 3. Popular competitive Pokémon from that generation
    return availablePokemon
      .filter(
        (pokemon) =>
          !teamIds.has(pokemon.id) &&
          gameData.availablePokemon.includes(pokemon.id)
      )
      .map((pokemon) => {
        // Calculate base score
        let score = 0;

        // Add points for signature Pokémon
        if (generationSignaturePokemon.includes(pokemon.id)) {
          score += 5;
        }

        // Add points for type diversity
        const newTypes = pokemon.types.filter(
          (t) => !teamTypes.has(t.type.name)
        ).length;
        score += newTypes * 2;

        // Add points for certain types based on the game version
        if (
          selectedGame.includes("Ruby") ||
          selectedGame.includes("Sapphire") ||
          selectedGame.includes("Emerald")
        ) {
          // Gen 3 games tend to have many water routes
          if (pokemon.types.some((t) => t.type.name === "water")) {
            score += 1;
          }
        } else if (
          selectedGame.includes("Diamond") ||
          selectedGame.includes("Pearl") ||
          selectedGame.includes("Platinum")
        ) {
          // Gen 4 Sinnoh has many ground, rock and steel types
          if (
            pokemon.types.some((t) =>
              ["ground", "rock", "steel"].includes(t.type.name)
            )
          ) {
            score += 1;
          }
        } else if (
          selectedGame.includes("Black") ||
          selectedGame.includes("White")
        ) {
          // Gen 5 has many dragon and electric types
          if (
            pokemon.types.some((t) =>
              ["dragon", "electric"].includes(t.type.name)
            )
          ) {
            score += 1;
          }
        } else if (selectedGame.includes("X") || selectedGame.includes("Y")) {
          // Gen 6 introduced fairy types
          if (pokemon.types.some((t) => t.type.name === "fairy")) {
            score += 2;
          }
        }

        // Add points for higher Pokémon ID (generally stronger in later generations)
        if (pokemon.id > 600) score += 0.5;

        return {
          pokemon,
          score,
          reason: getRecommendationReason(
            pokemon,
            generationSignaturePokemon,
            newTypes
          ),
        };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [selectedGame, team, availablePokemon]);

  // Helper function to get recommendation reason
  function getRecommendationReason(
    pokemon: Pokemon,
    signaturePokemon: number[],
    newTypes: number
  ): string {
    if (signaturePokemon.includes(pokemon.id)) {
      return "Signature Pokémon for this game";
    }
    if (newTypes > 0) {
      return `Adds ${newTypes} new type${newTypes > 1 ? "s" : ""} to your team`;
    }
    return "Strong choice for this game";
  }

  // Helper function to get signature Pokémon for each generation
  function getGenerationSignaturePokemon(generation: number): number[] {
    switch (generation) {
      case 1:
        return [3, 6, 9, 25, 150, 151]; // Charizard, Blastoise, Venusaur, Pikachu, Mewtwo, Mew
      case 2:
        return [196, 197, 248, 249, 250, 251]; // Espeon, Umbreon, Tyranitar, Lugia, Ho-Oh, Celebi
      case 3:
        return [254, 257, 260, 384, 383, 382, 386]; // Sceptile, Blaziken, Swampert, Rayquaza, Groudon, Kyogre, Deoxys
      case 4:
        return [448, 445, 389, 485, 486, 487, 493]; // Lucario, Garchomp, Torterra, Heatran, Regigigas, Giratina, Arceus
      case 5:
        return [635, 638, 639, 640, 646, 649]; // Hydreigon, Cobalion, Terrakion, Virizion, Kyurem, Genesect
      case 6:
        return [700, 701, 718, 719, 720, 721]; // Sylveon, Hawlucha, Zygarde, Diancie, Hoopa, Volcanion
      case 7:
        return [786, 791, 792, 800, 802]; // Tapu Lele, Solgaleo, Lunala, Necrozma, Marshadow
      case 8:
        return [879, 884, 890, 892, 898]; // Copperajah, Duraludon, Eternatus, Urshifu, Calyrex
      case 9:
        return [906, 908, 910, 964, 994, 1000]; // Sprigatito Quaxly, Crocalor, Palafin, Ting-Lu, Miraidon
      default:
        return [];
    }
  }

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
      <Card className="dark:bg-gray-800 dark:border-gray-700 animate-pop-in">
        <CardHeader>
          <CardTitle className="dark:text-white">
            Team Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 dark:text-gray-400">
            Your team is full. Remove a Pokémon to get recommendations.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700 animate-pop-in overflow-hidden">
      <CardHeader>
        <CardTitle className="dark:text-white">Team Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        {teamWeaknesses.length > 0 ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2 dark:text-white">
                Team Weaknesses
              </h3>
              <div className="flex flex-wrap gap-2">
                {teamWeaknesses.slice(0, 5).map((weakness) => {
                  const typeData = TYPE_COLORS[weakness.type];
                  return (
                    <div
                      key={weakness.type}
                      className={cn(
                        "flex items-center px-3 py-1 rounded-full capitalize",
                        typeData.bg,
                        typeData.text
                      )}
                    >
                      <span>{weakness.type}</span>
                      <span className="ml-1 text-xs opacity-90">
                        ({weakness.percentage}%)
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full dark:bg-gray-700 mb-4">
                <TabsTrigger
                  value="coverage"
                  className="dark:text-gray-200 dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white"
                >
                  <Shield className="w-4 h-4 mr-1" />
                  Type Coverage
                </TabsTrigger>
                {selectedGame && (
                  <TabsTrigger
                    value="game"
                    className="dark:text-gray-200 dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white"
                  >
                    <Star className="w-4 h-4 mr-1" />
                    Game Specific
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="coverage" className="mt-0">
                {coverageRecommendations.length > 0 ? (
                  <div>
                    <div className="flex items-center mb-2">
                      <Shield className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" />
                      <h3 className="text-md font-medium dark:text-white">
                        Defensive Recommendations
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                      {coverageRecommendations.map(
                        ({ pokemon, resistCount, immuneCount }) => (
                          <div
                            key={pokemon.id}
                            className={cn(
                              "border rounded-lg p-2 flex flex-col items-center cursor-pointer",
                              "dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600",
                              "hover:bg-slate-50 hover:shadow-md transition-all duration-200",
                              "animate-pop-in"
                            )}
                            onClick={() => {
                              setSelectedRecommendation(pokemon);
                            }}
                          >
                            <img
                              src={getBestSprite(pokemon)}
                              alt={pokemon.name}
                              className="w-20 h-20 object-contain"
                            />
                            <p className="text-sm font-medium capitalize dark:text-white">
                              {pokemon.name}
                            </p>
                            <div className="flex gap-1 my-1">
                              {pokemon.types.map((type) => (
                                <TypeBadge
                                  key={type.type.name}
                                  type={type.type.name}
                                  size="sm"
                                />
                              ))}
                            </div>
                            <div className="text-xs mt-1 flex items-center justify-center space-x-2">
                              {resistCount > 0 && (
                                <span className="text-green-600 dark:text-green-400 flex items-center">
                                  <Shield className="h-3 w-3 mr-1" />
                                  {resistCount}
                                </span>
                              )}
                              {immuneCount > 0 && (
                                <span className="text-blue-600 dark:text-blue-400 flex items-center">
                                  <Zap className="h-3 w-3 mr-1" />
                                  {immuneCount}
                                </span>
                              )}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    No coverage recommendations available.
                  </p>
                )}
              </TabsContent>

              <TabsContent value="game" className="mt-0">
                {gameSpecificRecommendations.length > 0 ? (
                  <div>
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 mr-2 text-yellow-500 dark:text-yellow-400" />
                      <h3 className="text-md font-medium dark:text-white">
                        {selectedGame} Recommendations
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                      {gameSpecificRecommendations.map(
                        ({ pokemon, reason }) => (
                          <div
                            key={pokemon.id}
                            className={cn(
                              "border rounded-lg p-2 flex flex-col items-center cursor-pointer",
                              "dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600",
                              "hover:bg-slate-50 hover:shadow-md transition-all duration-200",
                              "animate-pop-in"
                            )}
                            onClick={() => {
                              setSelectedRecommendation(pokemon);
                            }}
                          >
                            <img
                              src={getBestSprite(pokemon)}
                              alt={pokemon.name}
                              className="w-20 h-20 object-contain"
                            />
                            <p className="text-sm font-medium capitalize dark:text-white">
                              {pokemon.name}
                            </p>
                            <div className="flex gap-1 my-1">
                              {pokemon.types.map((type) => (
                                <TypeBadge
                                  key={type.type.name}
                                  type={type.type.name}
                                  size="sm"
                                />
                              ))}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-300 mt-1 text-center">
                              {reason}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    No game-specific recommendations available.
                  </p>
                )}
              </TabsContent>
            </Tabs>

            {selectedRecommendation && (
              <div className="mt-4 p-3 bg-slate-50 dark:bg-gray-700 rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={getBestSprite(selectedRecommendation)}
                    alt={selectedRecommendation.name}
                    className="w-12 h-12 mr-2"
                  />
                  <div>
                    <p className="font-medium capitalize dark:text-white">
                      {selectedRecommendation.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {activeTab === "coverage"
                        ? `Would improve your team's coverage against ${teamWeaknesses
                            .slice(0, 2)
                            .map((w) => w.type)
                            .join(" and ")}`
                        : `Great choice for ${selectedGame}`}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    onAddPokemon(selectedRecommendation);
                    setSelectedRecommendation(null);
                  }}
                  className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                >
                  Add to Team <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No significant weaknesses detected in your team. Great job!
          </p>
        )}
      </CardContent>
    </Card>
  );
};
