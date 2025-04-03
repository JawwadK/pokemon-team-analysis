"use client";

import { useState, useEffect } from "react";
import { GameSelect } from "@/components/GameSelect";
import { TeamSlots } from "@/components/TeamSlots";
import { TypeAnalysis } from "@/components/TypeAnalysis";
import { TypeRecommendations } from "@/components/TypeRecommendations";
import { TeamMatchupAnalysis } from "@/components/TeamMatchupAnalysis";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { Pokeball } from "@/components/Pokeball";
import { APP_THEMES, ThemeName } from "@/utils/PokemonTheme";
import { usePokemonData } from "@/hooks/usePokemonData";
import { useTeam } from "@/hooks/useTeam";
import { Card, CardContent } from "@/components/ui/card";
import { Pokemon } from "@/types/pokemon";
import { ExternalLink, Sparkles } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Toaster, toast } from "sonner";
import { cn } from "@/lib/utils";
import SidePanels from "@/components/SidePanels";
import TextureOverlay from "@/components/TextureOverlay";
import Confetti from "@/components/Confetti";
import "@/animations.css";

export default function Home() {
  const [selectedGame, setSelectedGame] = useState("");
  const [theme, setTheme] = useState<ThemeName>("default");
  const [pageLoaded, setPageLoaded] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const { availablePokemon, loading, error, progress } =
    usePokemonData(selectedGame);
  const {
    team,
    addPokemonToSlot,
    removePokemonFromSlot,
    getActiveTeam,
  } = useTeam();

  const currentTheme = APP_THEMES[theme];

  // Enhanced add Pokemon function with animation and toast
  const handleAddPokemon = (pokemon: Pokemon, slot: number) => {
    addPokemonToSlot(pokemon, slot);

    // Check if team is now complete (6 Pokémon)
    const newTeamSize = team.filter((p) => p !== null).length + 1;
    if (newTeamSize === 6) {
      setShowConfetti(true);
      // Hide confetti after 5 seconds
      setTimeout(() => setShowConfetti(false), 5000);

      toast.success("Team Complete!", {
        description: "You've assembled a full team of 6 Pokémon!",
        duration: 5000,
        icon: <Sparkles className="h-4 w-4 text-yellow-400" />,
      });
    } else {
      toast.success(
        `${
          pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
        } added to team!`,
        {
          description: "Your team is getting stronger!",
          duration: 3000,
          icon: <Sparkles className="h-4 w-4 text-yellow-400" />,
        }
      );
    }
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

  // Page loaded animation effect
  useEffect(() => {
    setPageLoaded(true);
  }, []);

  return (
    <TooltipProvider>
      <main
        className={cn(
          "min-h-screen dark-mode-transition",
          `${currentTheme.secondary}`,
          "dark:bg-gray-900"
        )}
      >
        <div
          className={cn(
            "bg-gradient-to-b py-8 mb-8 shadow-md dark-mode-transition",
            `${currentTheme.primary} ${currentTheme.headerText}`,
            "dark:from-gray-800 dark:to-gray-900 dark:text-white",
            pageLoaded ? "animate-slide-in-right" : "opacity-0"
          )}
        >
          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2 flex items-center">
                  <Pokeball
                    variant="normal"
                    size="md"
                    className="mr-3"
                    float={true}
                  />
                  Pokémon Team Builder
                  <Sparkles className="ml-2 h-5 w-5 text-yellow-300 animate-pulse" />
                </h1>
                <p
                  className={cn(
                    "max-w-3xl opacity-90",
                    currentTheme.headerText === "text-white"
                      ? "text-blue-100"
                      : "text-gray-700",
                    "dark:text-gray-300"
                  )}
                >
                  Create and analyze your perfect Pokémon team. Get
                  recommendations based on type coverage and see how your team
                  performs against common matchups.
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-2">
                <DarkModeToggle />
                <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm opacity-80 dark:text-gray-400">
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
          <div
            className={cn(
              "space-y-8",
              pageLoaded ? "animate-slide-up" : "opacity-0"
            )}
          >
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
              <Card className="border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-900 animate-pop-in">
                <CardContent className="pt-6">
                  <div className="text-red-600 dark:text-red-400 animate-shake">
                    <p className="font-medium">Error loading Pokémon data</p>
                    <p className="mt-1">{error}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {loading ? (
              <Card className="dark:bg-gray-800 dark:border-gray-700 animate-pop-in">
                <CardContent className="pt-6">
                  <div className="text-center p-8">
                    <Pokeball
                      variant="normal"
                      spinning
                      size="xl"
                      className="mx-auto mb-6 animate-pulse"
                    />
                    <div className="mb-4 font-medium dark:text-white">
                      Loading Pokémon... ({progress.current}/{progress.total})
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 max-w-md mx-auto overflow-hidden">
                      <div
                        className={cn(
                          `${currentTheme.accent} h-2.5 rounded-full transition-all duration-300 ease-in-out`,
                          "dark:bg-blue-500"
                        )}
                        style={{
                          width: `${
                            (progress.current / progress.total) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
                      This may take a moment depending on your connection
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              selectedGame && (
                <div className="space-y-8 stagger-children">
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
                          selectedGame={selectedGame}
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
                    <Card className="pokemon-card dark:bg-gray-800 dark:border-gray-700 animate-pop-in">
                      <CardContent className="p-12 text-center">
                        <Pokeball
                          variant="normal"
                          size="lg"
                          className="mx-auto mb-4 animate-float"
                        />
                        <div className="text-gray-500 dark:text-gray-400">
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
                <div className="text-center text-gray-500 dark:text-gray-400 animate-pop-in">
                  <Pokeball
                    variant="premier"
                    size="xl"
                    className="mx-auto mb-6 animate-float"
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

        <footer
          className={cn(
            "bg-slate-900 text-white py-8 dark-mode-transition",
            "dark:bg-black"
          )}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {["normal", "great", "ultra", "master", "premier"].map(
                (variant, index) => (
                  <Tooltip key={variant}>
                    <TooltipTrigger>
                      <Pokeball
                        variant={
                          variant as
                            | "normal"
                            | "great"
                            | "ultra"
                            | "master"
                            | "premier"
                        }
                        size="md"
                        className={cn(
                          "transform hover:scale-125 transition-transform",
                          index % 2 === 0 ? "animate-float" : ""
                        )}
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

        {/* Confetti celebration effect when team is completed */}
        <Confetti active={showConfetti} duration={5000} />

        <Toaster richColors position="top-center" />
        <TextureOverlay currentTheme={theme} />
        <SidePanels currentTheme={theme} />
      </main>
    </TooltipProvider>
  );
}
