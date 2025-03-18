"use client";

import { useState, useEffect } from "react";
import { GameSelect } from "@/components/GameSelect";
import { TeamSlots } from "@/components/TeamSlots";
import { TypeAnalysis } from "@/components/TypeAnalysis";
import { TypeRecommendations } from "@/components/TypeRecommendations";
import { TeamMatchupAnalysis } from "@/components/TeamMatchupAnalysis";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Pokeball } from "@/components/Pokeball";
import { APP_THEMES, ThemeName } from "@/utils/PokemonTheme";
import { usePokemonData } from "@/hooks/usePokemonData";
import { useTeam } from "@/hooks/useTeam";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Toaster, toast } from "sonner";
import "@/animations.css";

export default function Home() {
  const [selectedGame, setSelectedGame] = useState("");
  const [theme, setTheme] = useState<ThemeName>("default");
  const { availablePokemon, loading, error, progress } =
    usePokemonData(selectedGame);
  const {
    team,
    addPokemonToSlot,
    removePokemonFromSlot,
    getActiveTeam,
    clearTeam,
  } = useTeam();

  const currentTheme = APP_THEMES[theme];

  // Enhanced add Pokemon function with animation and toast
  const handleAddPokemon = (pokemon: any, slot: number) => {
    addPokemonToSlot(pokemon, slot);

    toast.success(
      `${
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
      } added to team!`,
      {
        description: "Your team is getting stronger!",
        duration: 3000,
      }
    );
  };

  // Enhanced remove Pokemon function with animation and toast
  const handleRemovePokemon = (slot: number) => {
    const pokemonToRemove = team[slot];
    if (!pokemonToRemove) return;

    removePokemonFromSlot(slot);

    toast.error(
      `${
        pokemonToRemove.name.charAt(0).toUpperCase() +
        pokemonToRemove.name.slice(1)
      } removed from team`,
      {
        description: "You can always add them back later.",
        duration: 3000,
      }
    );
  };

  // Change theme based on game selection
  useEffect(() => {
    if (!selectedGame) return;

    // Map games to themes
    const gameThemeMap: Record<string, ThemeName> = {
      "Red/Blue/Yellow": "default",
      "Gold/Silver/Crystal": "gold",
      "Ruby/Sapphire/Emerald": "emerald",
      "FireRed/LeafGreen": "ruby",
      "Diamond/Pearl/Platinum": "diamond",
      "HeartGold/SoulSilver": "gold",
      "Black/White": "black",
      "Black 2/White 2": "black",
      "X/Y": "default",
      "Omega Ruby/Alpha Sapphire": "ruby",
      "Sun/Moon": "default",
      "Ultra Sun/Ultra Moon": "default",
      "Sword/Shield": "default",
      "Brilliant Diamond/Shining Pearl": "diamond",
      "Legends: Arceus": "default",
      "Scarlet/Violet": "ruby",
    };

    setTheme(gameThemeMap[selectedGame] || "default");
  }, [selectedGame]);

  return (
    <TooltipProvider>
      <main className={`min-h-screen ${currentTheme.secondary}`}>
        <div
          className={`bg-gradient-to-b ${currentTheme.primary} ${currentTheme.headerText} py-8 mb-8 shadow-md`}
        >
          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2 flex items-center">
                  <Pokeball variant="normal" size="md" className="mr-3" />
                  Pokémon Team Builder
                </h1>
                <p
                  className={`${
                    currentTheme.headerText === "text-white"
                      ? "text-blue-100"
                      : "text-gray-700"
                  } max-w-3xl opacity-90`}
                >
                  Create and analyze your perfect Pokémon team. Get
                  recommendations based on type coverage and see how your team
                  performs against common matchups.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm opacity-80">
              <span>Powered by</span>
              <a
                href="https://pokeapi.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center ml-2 hover:underline"
              >
                PokéAPI <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-16">
          <div className="space-y-8">
            <GameSelect
              selectedGame={selectedGame}
              onGameSelect={(game) => {
                setSelectedGame(game);
                toast.info(`${game} selected!`, {
                  description: "Loading Pokémon data...",
                });
              }}
            />

            {error && (
              <Card className="border-red-300 bg-red-50">
                <CardContent className="pt-6">
                  <div className="text-red-600">
                    <p className="font-medium">Error loading Pokémon data</p>
                    <p className="mt-1">{error}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {loading ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center p-8">
                    <Pokeball
                      variant="normal"
                      spinning
                      size="xl"
                      className="mx-auto mb-6"
                    />
                    <div className="mb-4 font-medium">
                      Loading Pokémon... ({progress.current}/{progress.total})
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 max-w-md mx-auto">
                      <div
                        className={`${currentTheme.accent} h-2.5 rounded-full transition-all duration-300 ease-in-out`}
                        style={{
                          width: `${
                            (progress.current / progress.total) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-gray-500 text-sm mt-4">
                      This may take a moment depending on your connection
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              selectedGame && (
                <div className="space-y-8">
                  <TeamSlots
                    team={team}
                    availablePokemon={availablePokemon}
                    onAddPokemon={handleAddPokemon}
                    onRemovePokemon={handleRemovePokemon}
                  />

                  {getActiveTeam().length > 0 ? (
                    <>
                      <TypeAnalysis team={getActiveTeam()} />

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <TypeRecommendations
                          team={getActiveTeam()}
                          availablePokemon={availablePokemon}
                          onAddPokemon={(pokemon) => {
                            // Find the first empty slot
                            const emptySlot = Array(6)
                              .fill(null)
                              .findIndex(
                                (_, i) => team.length <= i || team[i] === null
                              );

                            if (emptySlot !== -1) {
                              handleAddPokemon(pokemon, emptySlot);
                            }
                          }}
                        />

                        <TeamMatchupAnalysis team={getActiveTeam()} />
                      </div>
                    </>
                  ) : (
                    <Card className="pokemon-card">
                      <CardContent className="p-12 text-center">
                        <Pokeball
                          variant="normal"
                          size="lg"
                          className="mx-auto mb-4"
                        />
                        <div className="text-gray-500">
                          <p className="text-lg">Your team is empty</p>
                          <p className="mt-2">
                            Start by adding Pokémon to your team using the slots
                            above
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )
            )}

            {!selectedGame && !loading && (
              <div className="h-[300px] flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Pokeball
                    variant="premier"
                    size="xl"
                    className="mx-auto mb-6 animate-[spin_10s_linear_infinite]"
                  />
                  <p className="text-lg">Select a game above to get started</p>
                  <p className="mt-2">
                    Your Pokémon journey begins with choosing your game!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="bg-slate-900 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {["normal", "great", "ultra", "master", "premier"].map(
                (variant) => (
                  <Tooltip key={variant}>
                    <TooltipTrigger>
                      <Pokeball
                        variant={variant as any}
                        size="md"
                        className="transform hover:scale-125 transition-transform"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="capitalize">{variant} Ball</p>
                    </TooltipContent>
                  </Tooltip>
                )
              )}
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-sm">
                Pokémon and all related names are trademark of Nintendo, Game
                Freak, and The Pokémon Company. This application is for
                educational purposes only.
              </p>
            </div>
          </div>
        </footer>
        <Toaster richColors />
      </main>
    </TooltipProvider>
  );
}
