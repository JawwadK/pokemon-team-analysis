// src/components/TeamMatchupAnalysis.tsx
import { useMemo } from "react";
import { Pokemon, PokemonType } from "@/types/pokemon";
import { TYPE_CHART } from "@/data/typeChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TeamMatchupAnalysisProps {
  team: Pokemon[];
}

// Common type combinations for analysis
const COMMON_MATCHUPS = [
  { name: "Fire/Flying", types: ["fire", "flying"] },
  { name: "Water/Ground", types: ["water", "ground"] },
  { name: "Grass/Poison", types: ["grass", "poison"] },
  { name: "Electric/Steel", types: ["electric", "steel"] },
  { name: "Psychic/Fairy", types: ["psychic", "fairy"] },
  { name: "Dark/Ghost", types: ["dark", "ghost"] },
  { name: "Fighting/Rock", types: ["fighting", "rock"] },
  { name: "Ice/Dragon", types: ["ice", "dragon"] },
];

// Notable trainers across games
const NOTABLE_TRAINERS = [
  {
    name: "Champion Leon",
    pokemon: [
      { name: "Charizard", types: ["fire", "flying"] },
      { name: "Aegislash", types: ["steel", "ghost"] },
      { name: "Dragapult", types: ["dragon", "ghost"] },
      { name: "Mr. Rime", types: ["ice", "psychic"] },
      { name: "Haxorus", types: ["dragon"] },
      { name: "Cinderace", types: ["fire"] },
    ],
  },
  {
    name: "Champion Cynthia",
    pokemon: [
      { name: "Spiritomb", types: ["ghost", "dark"] },
      { name: "Roserade", types: ["grass", "poison"] },
      { name: "Gastrodon", types: ["water", "ground"] },
      { name: "Lucario", types: ["fighting", "steel"] },
      { name: "Milotic", types: ["water"] },
      { name: "Garchomp", types: ["dragon", "ground"] },
    ],
  },
  {
    name: "Champion Steven",
    pokemon: [
      { name: "Skarmory", types: ["steel", "flying"] },
      { name: "Claydol", types: ["ground", "psychic"] },
      { name: "Aggron", types: ["steel", "rock"] },
      { name: "Cradily", types: ["rock", "grass"] },
      { name: "Armaldo", types: ["rock", "bug"] },
      { name: "Metagross", types: ["steel", "psychic"] },
    ],
  },
  {
    name: "Elite Four Lorelei",
    pokemon: [
      { name: "Dewgong", types: ["water", "ice"] },
      { name: "Cloyster", types: ["water", "ice"] },
      { name: "Slowbro", types: ["water", "psychic"] },
      { name: "Jynx", types: ["ice", "psychic"] },
      { name: "Lapras", types: ["water", "ice"] },
    ],
  },
];

export const TeamMatchupAnalysis = ({ team }: TeamMatchupAnalysisProps) => {
  // Calculate offensive coverage (what types your team can hit super effectively)
  const offensiveCoverage = useMemo(() => {
    const coverage: Record<PokemonType, boolean> = {} as Record<
      PokemonType,
      boolean
    >;

    // Initialize all types as not covered
    Object.keys(TYPE_CHART).forEach((type) => {
      coverage[type as PokemonType] = false;
    });

    // Mark types that can be hit super effectively by your team
    team.forEach((pokemon) => {
      pokemon.types.forEach((typeInfo) => {
        const attackerType = typeInfo.type.name as PokemonType;

        Object.entries(TYPE_CHART[attackerType] || {}).forEach(
          ([defenderType, effectiveness]) => {
            if (effectiveness > 1) {
              coverage[defenderType as PokemonType] = true;
            }
          }
        );
      });
    });

    return coverage;
  }, [team]);

  // Calculate common matchup effectiveness
  const matchupAnalysis = useMemo(() => {
    return COMMON_MATCHUPS.map((matchup) => {
      // For each defensive type, calculate how your team fares
      const teamEffectiveness = team.map((pokemon) => {
        // Calculate the effectiveness of this matchup against your Pokémon
        let totalEffectiveness = 1;

        matchup.types.forEach((attackType) => {
          pokemon.types.forEach((defenderTypeInfo) => {
            const defenderType = defenderTypeInfo.type.name as PokemonType;
            const effectiveness =
              TYPE_CHART[attackType as PokemonType]?.[defenderType] || 1;
            totalEffectiveness *= effectiveness;
          });
        });

        return {
          pokemon,
          effectiveness: totalEffectiveness,
        };
      });

      // Count how many Pokémon are weak, neutral, or resistant
      const weakCount = teamEffectiveness.filter(
        (t) => t.effectiveness > 1
      ).length;
      const resistCount = teamEffectiveness.filter(
        (t) => t.effectiveness < 1
      ).length;
      const immuneCount = teamEffectiveness.filter(
        (t) => t.effectiveness === 0
      ).length;

      // Calculate an overall score (-10 to 10, negative means disadvantage)
      const score = resistCount * 2 + immuneCount * 3 - weakCount * 2;

      return {
        matchup,
        teamEffectiveness,
        stats: {
          weakCount,
          resistCount,
          immuneCount,
        },
        score,
        assessment: getAssessment(score),
      };
    }).sort((a, b) => a.score - b.score); // Sort from worst to best matchups
  }, [team]);

  // Analyze matchups against notable trainers
  const trainerMatchups = useMemo(() => {
    return NOTABLE_TRAINERS.map((trainer) => {
      // For each trainer, analyze how your team fares against each of their Pokémon
      const pokemonMatchups = trainer.pokemon.map((trainerPokemon) => {
        // Find your best counters to this Pokémon
        const counters = team
          .map((yourPokemon) => {
            // Calculate the effectiveness of your Pokémon's types against the trainer's Pokémon
            let yourOffensiveEff = 1;
            let theirOffensiveEff = 1;

            // Your offensive effectiveness against their Pokémon
            yourPokemon.types.forEach((yourType) => {
              trainerPokemon.types.forEach((theirType) => {
                const eff =
                  TYPE_CHART[yourType.type.name as PokemonType]?.[
                    theirType as PokemonType
                  ] || 1;
                yourOffensiveEff *= eff;
              });
            });

            // Their offensive effectiveness against your Pokémon
            trainerPokemon.types.forEach((theirType) => {
              yourPokemon.types.forEach((yourType) => {
                const eff =
                  TYPE_CHART[theirType as PokemonType]?.[
                    yourType.type.name as PokemonType
                  ] || 1;
                theirOffensiveEff *= eff;
              });
            });

            // Calculate an advantage score (positive means you have advantage)
            const score =
              (yourOffensiveEff > 1 ? 1 : 0) - (theirOffensiveEff > 1 ? 1 : 0);

            return {
              pokemon: yourPokemon,
              yourOffensiveEff,
              theirOffensiveEff,
              score,
            };
          })
          .sort((a, b) => b.score - a.score); // Sort by best counters

        return {
          pokemon: trainerPokemon,
          counters,
          bestCounter: counters[0]?.pokemon,
          hasCounter: counters.some((c) => c.score > 0),
        };
      });

      // Calculate an overall advantage score
      const counterCount = pokemonMatchups.filter((m) => m.hasCounter).length;
      const score = (counterCount / trainer.pokemon.length) * 10;

      return {
        trainer,
        pokemonMatchups,
        counterCount,
        score,
        assessment: getTrainerAssessment(score),
      };
    }).sort((a, b) => a.score - b.score); // Sort from most difficult to easiest
  }, [team]);

  // Helper function for assessment text
  function getAssessment(score: number): string {
    if (score < -5) return "Severe Disadvantage";
    if (score < -2) return "Disadvantage";
    if (score < 2) return "Neutral";
    if (score < 5) return "Advantage";
    return "Strong Advantage";
  }

  // Helper for trainer assessment
  function getTrainerAssessment(score: number): string {
    if (score < 3) return "Very Difficult";
    if (score < 5) return "Challenging";
    if (score < 7) return "Balanced";
    if (score < 9) return "Favorable";
    return "Easy Victory";
  }

  // Get color class based on assessment
  function getAssessmentColor(assessment: string): string {
    switch (assessment) {
      case "Severe Disadvantage":
      case "Very Difficult":
        return "text-red-600";
      case "Disadvantage":
      case "Challenging":
        return "text-orange-600";
      case "Neutral":
      case "Balanced":
        return "text-blue-600";
      case "Advantage":
      case "Favorable":
        return "text-green-600";
      case "Strong Advantage":
      case "Easy Victory":
        return "text-emerald-600";
      default:
        return "text-gray-600";
    }
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Matchup Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="types">
          <TabsList className="mb-4">
            <TabsTrigger value="types">Type Matchups</TabsTrigger>
            <TabsTrigger value="trainers">Notable Trainers</TabsTrigger>
          </TabsList>

          <TabsContent value="types">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Common Type Matchups</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchupAnalysis.map(
                  ({ matchup, stats, score, assessment }) => (
                    <div
                      key={matchup.name}
                      className="border rounded-lg p-4 flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-medium">{matchup.name}</h4>
                        <div className="flex gap-1 mt-1">
                          {matchup.types.map((type) => (
                            <span
                              key={type}
                              className="px-2 py-0.5 rounded-full text-xs bg-slate-200 capitalize"
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                        <div className="text-sm mt-2">
                          <span className="text-red-500 mr-2">
                            Weak: {stats.weakCount}
                          </span>
                          <span className="text-blue-500 mr-2">
                            Neutral:{" "}
                            {team.length -
                              stats.weakCount -
                              stats.resistCount -
                              stats.immuneCount}
                          </span>
                          <span className="text-green-500 mr-2">
                            Resist: {stats.resistCount}
                          </span>
                          <span className="text-gray-500">
                            Immune: {stats.immuneCount}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`text-right ${getAssessmentColor(
                          assessment
                        )}`}
                      >
                        <div className="text-2xl font-bold">
                          {score > 0 ? `+${score}` : score}
                        </div>
                        <div className="text-sm">{assessment}</div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trainers">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Matchups Against Notable Trainers
              </h3>

              {trainerMatchups.map(
                ({ trainer, pokemonMatchups, score, assessment }) => (
                  <div key={trainer.name} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-lg font-medium">{trainer.name}</h4>
                      <div
                        className={`text-right ${getAssessmentColor(
                          assessment
                        )}`}
                      >
                        <span className="mr-2">{Math.round(score)}/10</span>
                        <span>{assessment}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      {pokemonMatchups.map(
                        ({ pokemon, bestCounter, hasCounter }) => (
                          <div
                            key={pokemon.name}
                            className="flex justify-between bg-slate-50 p-2 rounded"
                          >
                            <div>
                              <div className="font-medium capitalize">
                                {pokemon.name}
                              </div>
                              <div className="flex gap-1 mt-1">
                                {pokemon.types.map((type) => (
                                  <span
                                    key={type}
                                    className="px-2 py-0.5 rounded-full text-xs bg-slate-200 capitalize"
                                  >
                                    {type}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {bestCounter && (
                              <div className="flex items-center">
                                <div className="text-right mr-2">
                                  <div className="text-sm">Best counter:</div>
                                  <div className="text-xs capitalize">
                                    {bestCounter.name}
                                  </div>
                                </div>
                                <div
                                  className={`w-8 h-8 rounded-full ${
                                    hasCounter ? "bg-green-100" : "bg-red-100"
                                  }`}
                                >
                                  <img
                                    src={getBestSprite(bestCounter)}
                                    alt={bestCounter.name}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
