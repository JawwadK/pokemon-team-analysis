// src/components/PokemonSelectDialog.tsx
import { useState, useEffect } from "react";
import { Pokemon, PokemonType } from "@/types/pokemon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Filter, X } from "lucide-react";
import { TypeBadge } from "./TypeBadge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  const [selectedTypes, setSelectedTypes] = useState<PokemonType[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredPokemon, setHoveredPokemon] = useState<number | null>(null);

  // Reset states when dialog opens
  useEffect(() => {
    if (open) {
      setIsLoaded(false);
      setTimeout(() => setIsLoaded(true), 100);
    } else {
      setSearchQuery("");
      setSelectedTypes([]);
      setShowFilters(false);
    }
  }, [open]);

  // Get all available types from the available Pokemon
  const allTypes = Array.from(
    new Set(
      availablePokemon.flatMap((pokemon) =>
        pokemon.types.map((t) => t.type.name)
      )
    )
  ) as PokemonType[];

  // Toggle a type filter
  const toggleType = (type: PokemonType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  // Filter Pokemon based on search query and selected types
  const filteredPokemon = availablePokemon.filter((pokemon) => {
    // Search by name or ID
    const matchesSearch =
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pokemon.id.toString().includes(searchQuery);

    // Filter by selected types if any
    const matchesTypes =
      selectedTypes.length === 0 ||
      pokemon.types.some((t) => selectedTypes.includes(t.type.name));

    return matchesSearch && matchesTypes;
  });

  // Get best sprite for display
  const getBestSprite = (pokemon: Pokemon) => {
    // @ts-ignore - These properties exist on the API response but might not be in your type definition
    const officialArtwork =
      pokemon.sprites?.other?.["official-artwork"]?.front_default;
    // @ts-ignore
    const homeArtwork = pokemon.sprites?.other?.home?.front_default;
    return officialArtwork || homeArtwork || pokemon.sprites.front_default;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] dark:bg-gray-800 dark-mode-transition">
        <DialogHeader>
          <DialogTitle className="dark:text-white">
            Select Pokémon for Slot{" "}
            {selectedSlot !== null ? selectedSlot + 1 : ""}
          </DialogTitle>
          <DialogDescription className="dark:text-gray-300">
            Choose a Pokémon to add to your team
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or number..."
              className="pl-8 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute right-1 top-1 h-8 w-8"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Type filters */}
          {showFilters && (
            <div
              className={cn(
                "p-2 border rounded-md dark:border-gray-600",
                "animate-slide-up"
              )}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium dark:text-white">
                  Filter by Type
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTypes([])}
                  className="h-7 text-xs"
                  disabled={selectedTypes.length === 0}
                >
                  Clear
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {allTypes.map((type) => (
                  <TypeBadge
                    key={type}
                    type={type}
                    size="sm"
                    className={cn(
                      "cursor-pointer",
                      selectedTypes.includes(type)
                        ? "ring-2 ring-offset-2 ring-blue-500 dark:ring-blue-400"
                        : "opacity-70"
                    )}
                    onClick={() => toggleType(type)}
                  />
                ))}
              </div>
            </div>
          )}

          <div
            className={cn(
              "overflow-y-auto max-h-[50vh] rounded-md",
              isLoaded ? "animate-pop-in" : "opacity-0"
            )}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-1">
              {filteredPokemon.map((pokemon) => (
                <div
                  key={pokemon.id}
                  className={cn(
                    "border rounded p-2 flex flex-col items-center cursor-pointer",
                    "transition-all duration-200",
                    "dark:border-gray-600 dark:bg-gray-700/50",
                    hoveredPokemon === pokemon.id
                      ? "bg-blue-50 dark:bg-blue-900/20 shadow-md scale-105"
                      : "hover:bg-slate-50 dark:hover:bg-gray-700"
                  )}
                  onClick={() => onSelect(pokemon)}
                  onMouseEnter={() => setHoveredPokemon(pokemon.id)}
                  onMouseLeave={() => setHoveredPokemon(null)}
                >
                  <img
                    src={getBestSprite(pokemon)}
                    alt={pokemon.name}
                    className={cn(
                      "w-16 h-16 transition-transform duration-300",
                      hoveredPokemon === pokemon.id ? "animate-float" : ""
                    )}
                  />
                  <p className="text-xs font-medium capitalize dark:text-white">
                    {pokemon.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    #{pokemon.id}
                  </p>
                  <div className="flex gap-1 mt-1">
                    {pokemon.types.map((type) => (
                      <TypeBadge
                        key={type.type.name}
                        type={type.type.name}
                        size="sm"
                        className={cn(
                          hoveredPokemon === pokemon.id
                            ? "animate-badge-pop"
                            : ""
                        )}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {filteredPokemon.length === 0 && (
                <div className="col-span-3 text-center p-4 text-muted-foreground dark:text-gray-400 animate-slide-up">
                  No Pokémon match your search
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
