// src/components/PokemonCard.tsx
import { Pokemon } from "@/types/pokemon";
import { Card, CardContent } from "@/components/ui/card";

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: (pokemon: Pokemon) => void;
}

export const PokemonCard = ({ pokemon, onClick }: PokemonCardProps) => {
  return (
    <Card
      className="cursor-pointer hover:bg-slate-100 transition-colors"
      onClick={() => onClick?.(pokemon)}
    >
      <CardContent className="p-4">
        <div className="flex flex-col items-center">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-24 h-24"
          />
          <h3 className="text-lg font-medium capitalize mt-2">
            {pokemon.name}
          </h3>
          <div className="flex gap-2 mt-2">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className="px-2 py-1 rounded text-sm bg-slate-200"
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
