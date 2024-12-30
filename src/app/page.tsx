"use client";

import { useState } from "react";
import { GameSelect } from "@/components/GameSelect";
import { PokemonGrid } from "@/components/PokemonGrid";
import { TeamDisplay } from "@/components/TeamDisplay";
import { TypeAnalysis } from "@/components/TypeAnalysis";
import { usePokemonData } from "@/hooks/usePokemonData";
import { useTeam } from "@/hooks/useTeam";

export default function Home() {
  const [selectedGame, setSelectedGame] = useState("");
  const { availablePokemon, loading, error } = usePokemonData(selectedGame);
  const { team, addToTeam, removeFromTeam, clearTeam } = useTeam();

  return (
    <main className="container mx-auto p-4">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Pokémon Team Builder</h1>
          <GameSelect
            selectedGame={selectedGame}
            onGameSelect={setSelectedGame}
          />
        </div>

        {/* Team Display */}
        <TeamDisplay
          team={team}
          onRemove={removeFromTeam}
          onClear={clearTeam}
        />

        {/* Type Analysis */}
        <TypeAnalysis team={team} />

        {error && <div className="text-red-500">Error: {error}</div>}

        {loading ? (
          <div className="text-center">Loading Pokémon...</div>
        ) : (
          <PokemonGrid pokemon={availablePokemon} onPokemonSelect={addToTeam} />
        )}
      </div>
    </main>
  );
}
