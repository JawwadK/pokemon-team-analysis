// src/hooks/useTeam.ts
import { useState, useCallback } from 'react';
import { Pokemon } from '@/types/pokemon';

export const useTeam = (maxTeamSize: number = 6) => {
  const [team, setTeam] = useState<Pokemon[]>([]);

  const addToTeam = useCallback((pokemon: Pokemon) => {
    setTeam(currentTeam => {
      if (currentTeam.length >= maxTeamSize) {
        alert('Team is full!');
        return currentTeam;
      }
      
      if (currentTeam.some(p => p.id === pokemon.id)) {
        alert('This Pokémon is already in your team!');
        return currentTeam;
      }
      
      return [...currentTeam, pokemon];
    });
  }, [maxTeamSize]);

  const removeFromTeam = useCallback((pokemonId: number) => {
    setTeam(currentTeam => currentTeam.filter(p => p.id !== pokemonId));
  }, []);

  const clearTeam = useCallback(() => {
    setTeam([]);
  }, []);

  return {
    team,
    addToTeam,
    removeFromTeam,
    clearTeam,
    isFull: team.length >= maxTeamSize,
    isEmpty: team.length === 0
  };
};