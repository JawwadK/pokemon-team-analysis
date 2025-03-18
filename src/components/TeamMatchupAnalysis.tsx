// src/components/TeamMatchupAnalysis.tsx
import { useMemo, useState } from "react";
import { Pokemon, PokemonType } from "@/types/pokemon";
import { TYPE_CHART } from "@/data/typeChart";
import { TYPE_COLORS } from "@/utils/PokemonTheme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TypeBadge } from "./TypeBadge";
import { cn } from "@/lib/utils";
import { 
  Shield, 
  Swords, 
  Users, 
  Trophy, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp,
  ThumbsUp,
  ThumbsDown,
  Info
} from "lucide-react";
import { TYPE_SPECIALISTS, NOTABLE_TRAINERS, COMMON_MATCHUPS } from "@/data/typeSpecialists";
import { GAME_DATA } from "@/data/games";


interface TeamMatchupAnalysisProps {
  team: Pokemon[];
  selectedGame?: string;
}

export const TeamMatchupAnalysis = ({ team, selectedGame = "" }: TeamMatchupAnalysisProps) => {
  const [expandedTrainer, setExpandedTrainer] = useState<string | null>(null);
  const [expandedSpecialist, setExpandedSpecialist] = useState<string | null>(
    null
  );

  // Calculate offensive coverage (what types your team can hit super effectively)
  const offensiveCoverage = useMemo(() => {
    const coverage: Record<PokemonType, number> = {} as Record<
      PokemonType,
      number
    >;

    // Initialize all types as not covered
    Object.keys(TYPE_CHART).forEach((type) => {
      coverage[type as PokemonType] = 0;
    });

    // Count Pokémon that can hit each type super effectively
    team.forEach((pokemon) => {
      pokemon.types.forEach((typeInfo) => {
        const attackerType = typeInfo.type.name as PokemonType;

        Object.entries(TYPE_CHART[attackerType] || {}).forEach(
          ([defenderType, effectiveness]) => {
            if (effectiveness > 1) {
              coverage[defenderType as PokemonType]++;
            }
          }
        );
      });
    });

    return coverage;
  }, [team]);

  // Calculate defensive coverage (which types your team resists)
  const defensiveCoverage = useMemo(() => {
    const coverage: Record<PokemonType, number> = {} as Record<
      PokemonType,
      number
    >;

    // Initialize all types
    Object.keys(TYPE_CHART).forEach((type) => {
      coverage[type as PokemonType] = 0;
    });

    // Count Pokémon that resist each type
    team.forEach((pokemon) => {
      const pokemonDefense = calculatePokemonDefense(pokemon);

      Object.entries(pokemonDefense).forEach(([type, effectiveness]) => {
        if (effectiveness < 1) {
          coverage[type as PokemonType]++;
        }
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

  // Get game-relevant type specialists
  const gameTypeSpecialists = useMemo(() => {
    if (!selectedGame) return [];

    const gameData = GAME_DATA[selectedGame];
    if (!gameData) return [];

    const generation = gameData.generation;
    const specialists = TYPE_SPECIALISTS[generation] || [];

    // Filter specialists relevant to the selected game
    return specialists
      .filter(
        (specialist) => specialist.game === selectedGame || !specialist.game
      )
      .map((specialist) => {
        const specialistType = specialist.type as PokemonType;
        const typeColors = TYPE_COLORS[specialistType];

        // Calculate how well your team handles this type
        const resistCount = team.filter((pokemon) => {
          const defenses = calculatePokemonDefense(pokemon);
          return defenses[specialistType] < 1;
        }).length;

        const weakCount = team.filter((pokemon) => {
          const defenses = calculatePokemonDefense(pokemon);
          return defenses[specialistType] > 1;
        }).length;

        // Score from -10 to 10
        const score = ((resistCount * 2 - weakCount * 2) / team.length) * 10;

        return {
          ...specialist,
          resistCount,
          weakCount,
          typeColors,
          score,
          assessment: getAssessment(score),
        };
      })
      .sort((a, b) => a.score - b.score); // Sort from most difficult to easiest
  }, [selectedGame, team]);

  // Analyze matchups against notable trainers
  const trainerMatchups = useMemo(() => {
    // Filter trainers relevant to the selected game
    const relevantTrainers = selectedGame
      ? NOTABLE_TRAINERS.filter((t) => t.game === selectedGame || !t.game)
      : NOTABLE_TRAINERS;

    return relevantTrainers
      .map((trainer) => {
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
                (yourOffensiveEff > 1 ? 1 : 0) -
                (theirOffensiveEff > 1 ? 1 : 0);

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
          uncounteredCount: trainer.pokemon.length - counterCount,
          score,
          assessment: getTrainerAssessment(score),
        };
      })
      .sort((a, b) => a.score - b.score); // Sort from most difficult to easiest
  }, [team, selectedGame]);
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
        return "text-red-600 dark:text-red-400";
      case "Disadvantage":
      case "Challenging":
        return "text-orange-600 dark:text-orange-400";
      case "Neutral":
      case "Balanced":
        return "text-blue-600 dark:text-blue-500";
      case "Advantage":
      case "Favorable":
        return "text-green-600 dark:text-green-400";
      case "Strong Advantage":
      case "Easy Victory":
        return "text-emerald-600 dark:text-emerald-400";
      default:
        return "text-gray-600 dark:text-gray-400";
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

  // Find offensive coverage gaps
  const offensiveGaps = useMemo(() => {
    return Object.entries(offensiveCoverage)
      .filter(([_, count]) => count === 0)
      .map(([type]) => type as PokemonType);
  }, [offensiveCoverage]);

  // Find defensive coverage gaps
  const defensiveGaps = useMemo(() => {
    return Object.entries(defensiveCoverage)
      .filter(([_, count]) => count === 0)
      .map(([type]) => type as PokemonType);
  }, [defensiveCoverage]);

  if (team.length === 0) {
    return null;
  }
  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700 animate-pop-in overflow-hidden">
      <CardHeader>
        <CardTitle className="dark:text-white flex items-center">
          <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
          Team Matchup Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="coverage" className="w-full">
          <TabsList className="w-full dark:bg-gray-700 mb-4">
            <TabsTrigger
              value="coverage"
              className="dark:text-gray-200 dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white flex items-center"
            >
              <Shield className="w-4 h-4 mr-1" />
              Coverage
            </TabsTrigger>
            <TabsTrigger
              value="matchups"
              className="dark:text-gray-200 dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white flex items-center"
            >
              <Swords className="w-4 h-4 mr-1" />
              Type Matchups
            </TabsTrigger>
            <TabsTrigger
              value="trainers"
              className="dark:text-gray-200 dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white flex items-center"
            >
              <Users className="w-4 h-4 mr-1" />
              Trainers
            </TabsTrigger>
            {selectedGame && gameTypeSpecialists.length > 0 && (
              <TabsTrigger
                value="specialists"
                className="dark:text-gray-200 dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white flex items-center"
              >
                <Trophy className="w-4 h-4 mr-1" />
                Type Specialists
              </TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="coverage" className="mt-0 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Offensive Coverage */}
              <div className="space-y-2 p-4 border dark:border-gray-700 rounded-lg">
                <h3 className="text-lg font-medium flex items-center dark:text-white">
                  <Swords className="w-4 h-4 mr-2 text-red-500" />
                  Offensive Coverage
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Types your team can hit super-effectively
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                  {Object.entries(offensiveCoverage).map(([type, count]) => {
                    const typeData = TYPE_COLORS[type as PokemonType];
                    const isCovered = count > 0;

                    return (
                      <div
                        key={type}
                        className={cn(
                          "flex items-center justify-between px-3 py-2 rounded-lg",
                          isCovered
                            ? typeData.bg
                            : "bg-gray-100 dark:bg-gray-700",
                          isCovered
                            ? typeData.text
                            : "text-gray-500 dark:text-gray-400"
                        )}
                      >
                        <span className="capitalize">{type}</span>
                        {isCovered ? (
                          <span className="bg-white/30 dark:bg-black/20 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            {count}
                          </span>
                        ) : (
                          <AlertTriangle
                            size={16}
                            className="text-yellow-500"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {offensiveGaps.length > 0 && (
                  <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-yellow-800 dark:text-yellow-300 text-sm">
                    <AlertTriangle size={14} className="inline mr-1" />
                    <span>
                      Your team can't hit{" "}
                      {offensiveGaps.map((type, i) => (
                        <span key={type} className="font-semibold capitalize">
                          {i > 0
                            ? i === offensiveGaps.length - 1
                              ? " or "
                              : ", "
                            : ""}
                          {type}
                        </span>
                      ))}{" "}
                      super-effectively.
                    </span>
                  </div>
                )}
              </div>

              {/* Defensive Coverage */}
              <div className="space-y-2 p-4 border dark:border-gray-700 rounded-lg">
                <h3 className="text-lg font-medium flex items-center dark:text-white">
                  <Shield className="w-4 h-4 mr-2 text-blue-500" />
                  Defensive Coverage
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Types your team resists
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                  {Object.entries(defensiveCoverage).map(([type, count]) => {
                    const typeData = TYPE_COLORS[type as PokemonType];
                    const isResisted = count > 0;

                    return (
                      <div
                        key={type}
                        className={cn(
                          "flex items-center justify-between px-3 py-2 rounded-lg",
                          isResisted
                            ? "bg-blue-100 dark:bg-blue-900/30"
                            : "bg-gray-100 dark:bg-gray-700",
                          isResisted
                            ? "text-blue-800 dark:text-blue-300"
                            : "text-gray-500 dark:text-gray-400"
                        )}
                      >
                        <span className="capitalize flex items-center">
                          <div
                            className={cn(
                              "w-2 h-2 rounded-full mr-1",
                              typeData.bg
                            )}
                          ></div>
                          {type}
                        </span>
                        {isResisted ? (
                          <span className="bg-white/30 dark:bg-black/20 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            {count}
                          </span>
                        ) : (
                          <AlertTriangle
                            size={16}
                            className="text-yellow-500"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {defensiveGaps.length > 0 && (
                  <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-yellow-800 dark:text-yellow-300 text-sm">
                    <AlertTriangle size={14} className="inline mr-1" />
                    <span>
                      Your team doesn't resist{" "}
                      {defensiveGaps.map((type, i) => (
                        <span key={type} className="font-semibold capitalize">
                          {i > 0
                            ? i === defensiveGaps.length - 1
                              ? " or "
                              : ", "
                            : ""}
                          {type}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Overall Team Assessment */}
            <div className="p-4 border dark:border-gray-700 rounded-lg">
              <h3 className="text-lg font-medium dark:text-white flex items-center">
                <Info className="w-4 h-4 mr-2 text-blue-500" />
                Team Balance Assessment
              </h3>

              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className={cn(
                    "p-3 rounded-lg flex items-center",
                    offensiveGaps.length > 2
                      ? "bg-red-100 dark:bg-red-900/20"
                      : offensiveGaps.length > 0
                      ? "bg-yellow-100 dark:bg-yellow-900/20"
                      : "bg-green-100 dark:bg-green-900/20"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-full p-2 mr-2",
                      offensiveGaps.length > 2
                        ? "bg-red-200 dark:bg-red-900/50"
                        : offensiveGaps.length > 0
                        ? "bg-yellow-200 dark:bg-yellow-900/50"
                        : "bg-green-200 dark:bg-green-900/50"
                    )}
                  >
                    {offensiveGaps.length > 2 ? (
                      <ThumbsDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                    ) : offensiveGaps.length > 0 ? (
                      <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    ) : (
                      <ThumbsUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                    )}
                  </div>
                  <div>
                    <h4
                      className={cn(
                        "font-medium",
                        offensiveGaps.length > 2
                          ? "text-red-800 dark:text-red-300"
                          : offensiveGaps.length > 0
                          ? "text-yellow-800 dark:text-yellow-300"
                          : "text-green-800 dark:text-green-300"
                      )}
                    >
                      Offensive Coverage
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {offensiveGaps.length > 2
                        ? "Poor coverage, too many types uncovered"
                        : offensiveGaps.length > 0
                        ? "Decent coverage with a few gaps"
                        : "Excellent coverage across all types"}
                    </p>
                  </div>
                </div>

                <div
                  className={cn(
                    "p-3 rounded-lg flex items-center",
                    defensiveGaps.length > 4
                      ? "bg-red-100 dark:bg-red-900/20"
                      : defensiveGaps.length > 2
                      ? "bg-yellow-100 dark:bg-yellow-900/20"
                      : "bg-green-100 dark:bg-green-900/20"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-full p-2 mr-2",
                      defensiveGaps.length > 4
                        ? "bg-red-200 dark:bg-red-900/50"
                        : defensiveGaps.length > 2
                        ? "bg-yellow-200 dark:bg-yellow-900/50"
                        : "bg-green-200 dark:bg-green-900/50"
                    )}
                  >
                    {defensiveGaps.length > 4 ? (
                      <ThumbsDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                    ) : defensiveGaps.length > 2 ? (
                      <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    ) : (
                      <ThumbsUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                    )}
                  </div>
                  <div>
                    <h4
                      className={cn(
                        "font-medium",
                        defensiveGaps.length > 4
                          ? "text-red-800 dark:text-red-300"
                          : defensiveGaps.length > 2
                          ? "text-yellow-800 dark:text-yellow-300"
                          : "text-green-800 dark:text-green-300"
                      )}
                    >
                      Defensive Resistances
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {defensiveGaps.length > 4
                        ? "Too many defensive vulnerabilities"
                        : defensiveGaps.length > 2
                        ? "Some defensive gaps to address"
                        : "Strong defensive coverage"}
                    </p>
                  </div>
                </div>

                <div
                  className={cn(
                    "p-3 rounded-lg flex items-center",
                    team.length < 3
                      ? "bg-yellow-100 dark:bg-yellow-900/20"
                      : team.length < 6
                      ? "bg-blue-100 dark:bg-blue-900/20"
                      : "bg-green-100 dark:bg-green-900/20"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-full p-2 mr-2",
                      team.length < 3
                        ? "bg-yellow-200 dark:bg-yellow-900/50"
                        : team.length < 6
                        ? "bg-blue-200 dark:bg-blue-900/50"
                        : "bg-green-200 dark:bg-green-900/50"
                    )}
                  >
                    {team.length < 3 ? (
                      <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    ) : team.length < 6 ? (
                      <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <ThumbsUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                    )}
                  </div>
                  <div>
                    <h4
                      className={cn(
                        "font-medium",
                        team.length < 3
                          ? "text-yellow-800 dark:text-yellow-300"
                          : team.length < 6
                          ? "text-blue-800 dark:text-blue-300"
                          : "text-green-800 dark:text-green-300"
                      )}
                    >
                      Team Composition
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {team.length < 3
                        ? "Add more Pokémon for better coverage"
                        : team.length < 6
                        ? `Team is building well (${team.length}/6)`
                        : "Full team achieved!"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="matchups" className="mt-0">
            <div className="space-y-4">
              <h3 className="text-lg font-medium dark:text-white flex items-center">
                <Swords className="h-4 w-4 mr-2 text-orange-500" />
                Common Type Matchups
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchupAnalysis.map(
                  ({ matchup, stats, score, assessment }) => (
                    <div
                      key={matchup.name}
                      className="border dark:border-gray-700 rounded-lg p-4 flex justify-between items-center dark:bg-gray-800/50 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <div>
                        <h4 className="font-medium dark:text-white">
                          {matchup.name}
                        </h4>
                        <div className="flex gap-1 mt-1">
                          {matchup.types.map((type) => (
                            <TypeBadge
                              key={type}
                              type={type as PokemonType}
                              size="sm"
                            />
                          ))}
                        </div>
                        <div className="text-sm mt-2 dark:text-gray-300">
                          <span className="text-red-500 dark:text-red-400 mr-2">
                            Weak: {stats.weakCount}
                          </span>
                          <span className="text-blue-500 dark:text-blue-400 mr-2">
                            Neutral:{" "}
                            {team.length -
                              stats.weakCount -
                              stats.resistCount -
                              stats.immuneCount}
                          </span>
                          <span className="text-green-500 dark:text-green-400 mr-2">
                            Resist: {stats.resistCount}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">
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
          <TabsContent value="trainers" className="mt-0">
            <div className="space-y-4">
              <h3 className="text-lg font-medium dark:text-white flex items-center">
                <Users className="h-4 w-4 mr-2 text-purple-500" />
                Matchups Against Notable Trainers
              </h3>

              {trainerMatchups.length > 0 ? (
                trainerMatchups.map(
                  ({
                    trainer,
                    pokemonMatchups,
                    score,
                    assessment,
                    counterCount,
                    uncounteredCount,
                  }) => (
                    <div
                      key={trainer.name}
                      className="border dark:border-gray-700 rounded-lg overflow-hidden"
                    >
                      <div
                        className="p-4 dark:bg-gray-700/20 cursor-pointer"
                        onClick={() =>
                          setExpandedTrainer(
                            expandedTrainer === trainer.name
                              ? null
                              : trainer.name
                          )
                        }
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-lg font-medium dark:text-white flex items-center">
                              {trainer.name}
                              {trainer.game && (
                                <span className="ml-2 text-xs bg-slate-200 dark:bg-slate-600 px-2 py-0.5 rounded-full text-slate-700 dark:text-slate-300">
                                  {trainer.game}
                                </span>
                              )}
                            </h4>
                            {trainer.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {trainer.description}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center">
                            <div
                              className={`text-right mr-4 ${getAssessmentColor(
                                assessment
                              )}`}
                            >
                              <span className="text-sm font-medium">
                                {assessment}
                              </span>
                              <div className="text-xs">
                                Score: {Math.round(score)}/10
                              </div>
                            </div>
                            {expandedTrainer === trainer.name ? (
                              <ChevronUp className="h-5 w-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                        </div>

                        <div className="flex mt-2 items-center gap-2">
                          <div
                            className={cn(
                              "text-xs px-2 py-1 rounded-full",
                              counterCount === trainer.pokemon.length
                                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                                : counterCount === 0
                                ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                            )}
                          >
                            {counterCount} countered
                          </div>

                          {uncounteredCount > 0 && (
                            <div className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300">
                              {uncounteredCount} uncountered
                            </div>
                          )}
                        </div>
                      </div>

                      {expandedTrainer === trainer.name && (
                        <div className="px-4 py-3 bg-slate-50 dark:bg-gray-800/50 border-t dark:border-gray-700">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            {pokemonMatchups.map(
                              ({ pokemon, bestCounter, hasCounter }) => (
                                <div
                                  key={pokemon.name}
                                  className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded border dark:border-gray-700"
                                >
                                  <div>
                                    <div className="font-medium capitalize dark:text-white">
                                      {pokemon.name}
                                    </div>
                                    <div className="flex gap-1 mt-1">
                                      {pokemon.types.map((type) => (
                                        <TypeBadge
                                          key={type}
                                          type={type as PokemonType}
                                          size="sm"
                                        />
                                      ))}
                                    </div>
                                  </div>

                                  {bestCounter ? (
                                    <div className="flex items-center">
                                      <div className="text-right mr-2">
                                        <div className="text-sm dark:text-white">
                                          Best counter:
                                        </div>
                                        <div className="text-xs capitalize text-gray-600 dark:text-gray-400">
                                          {bestCounter.name}
                                        </div>
                                      </div>
                                      <div
                                        className={cn(
                                          "w-10 h-10 rounded-full flex items-center justify-center",
                                          hasCounter
                                            ? "bg-green-100 dark:bg-green-900/20"
                                            : "bg-red-100 dark:bg-red-900/20"
                                        )}
                                      >
                                        {hasCounter ? (
                                          <ThumbsUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                                        ) : (
                                          <ThumbsDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                                        )}
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="text-red-500 dark:text-red-400">
                                      No counter!
                                    </div>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                )
              ) : (
                <div className="text-center p-8 text-gray-500 dark:text-gray-400">
                  <p>No notable trainers available for analysis.</p>
                </div>
              )}
            </div>
          </TabsContent>
          {selectedGame && gameTypeSpecialists.length > 0 && (
            <TabsContent value="specialists" className="mt-0">
              <div className="space-y-4">
                <h3 className="text-lg font-medium dark:text-white flex items-center">
                  <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
                  Type Specialists in {selectedGame}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {gameTypeSpecialists.map((specialist) => (
                    <div
                      key={specialist.name}
                      className="border dark:border-gray-700 rounded-lg overflow-hidden"
                    >
                      {gameTypeSpecialists.map((specialist) => (
                        <div
                          key={specialist.name}
                          className="border dark:border-gray-700 rounded-lg overflow-hidden"
                        >
                          <div
                            className={cn(
                              "p-3 cursor-pointer flex justify-between items-center",
                              specialist.typeColors.light
                            )}
                            onClick={() =>
                              setExpandedSpecialist(
                                expandedSpecialist === specialist.name
                                  ? null
                                  : specialist.name
                              )
                            }
                          >
                            <div className="flex items-center">
                              <div
                                className={cn(
                                  "w-8 h-8 flex items-center justify-center rounded-full mr-3",
                                  specialist.typeColors.bg
                                )}
                              >
                                <span
                                  className={cn(
                                    "text-lg font-bold",
                                    specialist.typeColors.text
                                  )}
                                >
                                  {specialist.type.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <h4
                                  className={cn(
                                    "font-medium",
                                    specialist.typeColors.bg === "bg-white"
                                      ? "text-gray-800"
                                      : "text-gray-800"
                                  )}
                                >
                                  {specialist.name}
                                </h4>
                                <div className="flex items-center">
                                  <TypeBadge
                                    type={specialist.type as PokemonType}
                                    size="sm"
                                  />
                                  <span className="text-xs ml-2 text-gray-600">
                                    Specialist
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center">
                              <div
                                className={`text-right mr-3 ${getAssessmentColor(
                                  specialist.assessment
                                )}`}
                              >
                                <div className="text-sm font-medium">
                                  {specialist.assessment}
                                </div>
                              </div>
                              {expandedSpecialist === specialist.name ? (
                                <ChevronUp className="h-5 w-5 text-gray-500" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-gray-500" />
                              )}
                            </div>
                          </div>

                          {expandedSpecialist === specialist.name && (
                            <div className="p-3 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="flex items-center">
                                  <span className="font-medium mr-2 dark:text-white">
                                    Resisted by:
                                  </span>
                                  <span className="text-green-600 dark:text-green-400">
                                    {specialist.resistCount} Pokémon
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <span className="font-medium mr-2 dark:text-white">
                                    Weak against:
                                  </span>
                                  <span className="text-red-600 dark:text-red-400">
                                    {specialist.weakCount} Pokémon
                                  </span>
                                </div>
                              </div>

                              {specialist.description && (
                                <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                                  {specialist.description}
                                </div>
                              )}

                              <div className="mt-3 p-2 rounded bg-gray-50 dark:bg-gray-700 text-sm">
                                <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Team Coverage
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                  {team.map((pokemon) => {
                                    const defense =
                                      calculatePokemonDefense(pokemon);
                                    const effectivenessAgainstType =
                                      defense[specialist.type as PokemonType];
                                    let statusText = "";
                                    let statusClass = "";

                                    if (effectivenessAgainstType === 0) {
                                      statusText = "immune";
                                      statusClass =
                                        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
                                    } else if (effectivenessAgainstType < 1) {
                                      statusText = "resists";
                                      statusClass =
                                        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
                                    } else if (effectivenessAgainstType > 1) {
                                      statusText = "weak";
                                      statusClass =
                                        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
                                    } else {
                                      statusText = "neutral";
                                      statusClass =
                                        "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300";
                                    }

                                    return (
                                      <div
                                        key={pokemon.id}
                                        className={`px-2 py-1 rounded-full flex items-center ${statusClass}`}
                                      >
                                        <span className="capitalize mr-1">
                                          {pokemon.name}
                                        </span>
                                        <span className="text-xs">
                                          ({statusText})
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              <div className="mt-3">
                                <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-1 text-sm">
                                  Recommendation
                                </h5>
                                <p
                                  className={`text-sm ${getAssessmentColor(
                                    specialist.assessment
                                  )}`}
                                >
                                  {specialist.score < 0
                                    ? "Your team has trouble against this type specialist. Consider adding Pokémon that resist " +
                                      specialist.type +
                                      " type."
                                    : specialist.score < 5
                                    ? "Your team has a balanced matchup against this specialist."
                                    : "Your team handles this type specialist well!"}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}
