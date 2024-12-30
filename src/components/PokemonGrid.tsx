// src/components/PokemonGrid.tsx
import { Pokemon } from "@/types/pokemon";
import { PokemonCard } from "./PokemonCard";

interface PokemonGridProps {
  pokemon: Pokemon[];
  onPokemonSelect?: (pokemon: Pokemon) => void;
}

export const PokemonGrid = ({ pokemon, onPokemonSelect }: PokemonGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {pokemon.map((poke) => (
        <PokemonCard key={poke.id} pokemon={poke} onClick={onPokemonSelect} />
      ))}
    </div>
  );
};
