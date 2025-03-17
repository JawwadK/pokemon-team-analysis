"use client";

import { useState } from "react";
import { GameSelect } from "@/components/GameSelect";
import { TeamSlots } from "@/components/TeamSlots";
import { TypeAnalysis } from "@/components/TypeAnalysis";
import { TypeRecommendations } from "@/components/TypeRecommendations";
import { TeamMatchupAnalysis } from "@/components/TeamMatchupAnalysis";
import { usePokemonData } from "@/hooks/usePokemonData";
import { useTeam } from "@/hooks/useTeam";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Loader2 } from "lucide-react";

export default function Home() {
  const [selectedGame, setSelectedGame] = useState("");
  const { availablePokemon, loading, error, progress } =
    usePokemonData(selectedGame);
  const { team, addPokemonToSlot, removePokemonFromSlot, getActiveTeam } =
    useTeam();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-b from-blue-600 to-blue-500 text-white py-8 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Pokémon Team Builder</h1>
          <p className="text-blue-100 max-w-3xl">
            Create and analyze your perfect Pokémon team. Get recommendations
            based on type coverage and see how your team performs against common
            matchups.
          </p>
          <div className="flex items-center mt-4 text-blue-100 text-sm">
            <span>Powered by</span>
            <a
              href="https://pokeapi.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center ml-2 hover:text-white"
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
            onGameSelect={setSelectedGame}
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
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
                  <div className="mb-4 font-medium">
                    Loading Pokémon... ({progress.current}/{progress.total})
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 max-w-md mx-auto">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{
                        width: `${(progress.current / progress.total) * 100}%`,
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
                  onAddPokemon={addPokemonToSlot}
                  onRemovePokemon={removePokemonFromSlot}
                />

                {getActiveTeam().length > 0 ? (
                  <>
                    <TypeAnalysis team={getActiveTeam()} />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <TypeRecommendations
                        team={getActiveTeam()}
                        availablePokemon={availablePokemon}
                        onAddPokemon={addPokemonToSlot}
                      />

                      <TeamMatchupAnalysis team={getActiveTeam()} />
                    </div>
                  </>
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
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
          <div className="text-center">
            <p className="text-slate-400 text-sm">
              Pokémon and all related names are trademark of Nintendo, Game
              Freak, and The Pokémon Company. This application is for
              educational purposes only.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
