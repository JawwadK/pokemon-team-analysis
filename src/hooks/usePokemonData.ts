// src/hooks/usePokemonData.ts
import { useState, useEffect } from 'react';
import { Pokemon } from '@/types/pokemon';
import { GAME_DATA } from '@/data/games';

// Cache to avoid re-fetching the same Pokemon
const pokemonCache: Record<number, Pokemon> = {};

export const usePokemonData = (selectedGame: string) => {
  const [availablePokemon, setAvailablePokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  useEffect(() => {
    const fetchPokemon = async () => {
      if (!selectedGame) return;

      setLoading(true);
      setError(null);
      
      try {
        const gameData = GAME_DATA[selectedGame];
        if (!gameData) {
          throw new Error(`Game data not found for ${selectedGame}`);
        }

        const pokemonIds = gameData.availablePokemon;
        setProgress({ current: 0, total: pokemonIds.length });
        
        // Fetch in batches to avoid overwhelming the API
        const batchSize = 20;
        const results: Pokemon[] = [];
        
        for (let i = 0; i < pokemonIds.length; i += batchSize) {
          const batchIds = pokemonIds.slice(i, i + batchSize);
          const batchPromises = batchIds.map(async (id) => {
            // Use cache if available
            if (pokemonCache[id]) {
              return pokemonCache[id];
            }
            
            try {
              const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
              if (!response.ok) throw new Error(`Failed to fetch Pokémon #${id}`);
              const pokemon = await response.json();
              // Store in cache
              pokemonCache[id] = pokemon;
              return pokemon;
            } catch (error) {
              console.error(`Error fetching Pokemon #${id}:`, error);
              return null;
            }
          });
          
          const batchResults = await Promise.all(batchPromises);
          const validResults = batchResults.filter((p): p is Pokemon => p !== null);
          results.push(...validResults);
          
          // Update progress
          setProgress({ current: results.length, total: pokemonIds.length });
          
          // Update available Pokemon progressively
          setAvailablePokemon([...results]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch Pokémon data');
        console.error('Error fetching Pokémon:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [selectedGame]);

  return { availablePokemon, loading, error, progress };
};