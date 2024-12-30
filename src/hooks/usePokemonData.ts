// src/hooks/usePokemonData.ts
import { useState, useEffect } from 'react';
import { Pokemon } from '@/types/pokemon';

export const usePokemonData = (selectedGame: string) => {
  const [availablePokemon, setAvailablePokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      if (!selectedGame) return;

      setLoading(true);
      setError(null);

      try {
        // For now, let's fetch first 151 Pokémon as a test
        const pokemonPromises = Array.from({ length: 151 }, async (_, index) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`);
          if (!response.ok) throw new Error(`Failed to fetch Pokémon #${index + 1}`);
          return response.json();
        });

        const results = await Promise.all(pokemonPromises);
        setAvailablePokemon(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch Pokémon data');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [selectedGame]);

  return { availablePokemon, loading, error };
};