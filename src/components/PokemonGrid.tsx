// src/components/PokemonGrid.tsx
import { Pokemon } from "@/types/pokemon";
import { PokemonCard } from "./PokemonCard";

interface PokemonGridProps {
  pokemon: Pokemon[];
  onPokemonSelect?: (pokemon: Pokemon) => void;
}

export const PokemonGrid = ({ pokemon, onPokemonSelect }: PokemonGridProps) => {
  return (
    <div className="stagger-children grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {pokemon.map((poke, index) => (
        <PokemonCard
          key={poke.id}
          pokemon={poke}
          onClick={onPokemonSelect}
          animationDelay={index * 50} // Stagger the animation of each card
        />
      ))}
    </div>
  );
};
