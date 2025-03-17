// src/components/PokemonSelectDialog.tsx
import { useState } from "react";
import { Pokemon } from "@/types/pokemon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface PokemonSelectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availablePokemon: Pokemon[];
  onSelect: (pokemon: Pokemon) => void;
  selectedSlot: number | null;
}

export const PokemonSelectDialog = ({
  open,
  onOpenChange,
  availablePokemon,
  onSelect,
  selectedSlot,
}: PokemonSelectDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPokemon = availablePokemon.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pokemon.id.toString().includes(searchQuery)
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>
            Select Pokémon for Slot{" "}
            {selectedSlot !== null ? selectedSlot + 1 : ""}
          </DialogTitle>
          <DialogDescription>
            Choose a Pokémon to add to your team
          </DialogDescription>
        </DialogHeader>

        <div className="relative my-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or number..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="overflow-y-auto max-h-[50vh]">
          <div className="grid grid-cols-2 gap-2 p-1">
            {filteredPokemon.map((pokemon) => (
              <div
                key={pokemon.id}
                className="border rounded p-2 flex flex-col items-center cursor-pointer hover:bg-slate-50"
                onClick={() => onSelect(pokemon)}
              >
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="w-16 h-16"
                />
                <p className="text-xs font-medium capitalize">{pokemon.name}</p>
                <p className="text-xs text-gray-500">#{pokemon.id}</p>
                <div className="flex gap-1 mt-1">
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className="px-1 py-0.5 rounded text-xs bg-slate-200"
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {filteredPokemon.length === 0 && (
              <div className="col-span-2 text-center p-4 text-muted-foreground">
                No Pokémon match your search
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
