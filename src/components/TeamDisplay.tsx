// src/components/TeamDisplay.tsx
import { Pokemon } from "@/types/pokemon";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface TeamDisplayProps {
  team: Pokemon[];
  onRemove: (pokemonId: number) => void;
  onClear: () => void;
}

export const TeamDisplay = ({ team, onRemove, onClear }: TeamDisplayProps) => {
  if (team.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-gray-500">
            Your team is empty. Click on Pokémon to add them to your team!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Team ({team.length}/6)</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={onClear}
            className="text-red-500 hover:text-red-700"
          >
            Clear Team
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {team.map((pokemon) => (
            <div
              key={pokemon.id}
              className="relative bg-slate-50 rounded-lg p-2 flex flex-col items-center"
            >
              <button
                onClick={() => onRemove(pokemon.id)}
                className="absolute top-1 right-1 text-gray-400 hover:text-red-500"
              >
                <X size={16} />
              </button>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-20 h-20"
              />
              <p className="text-sm font-medium capitalize">{pokemon.name}</p>
              <div className="flex gap-1 mt-1">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className="px-2 py-0.5 rounded-full text-xs bg-slate-200"
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
          {Array.from({ length: 6 - team.length }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="border-2 border-dashed border-gray-200 rounded-lg p-2 flex items-center justify-center h-[132px]"
            >
              <span className="text-gray-400">Empty</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
