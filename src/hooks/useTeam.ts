// src/hooks/useTeam.ts
import { useState, useCallback } from 'react';
import { Pokemon } from '@/types/pokemon';

export const useTeam = (maxTeamSize: number = 6) => {
  // Initialize with array of null values for empty slots
  const [team, setTeam] = useState<(Pokemon | null)[]>(Array(maxTeamSize).fill(null));

  const addPokemonToSlot = useCallback((pokemon: Pokemon, slot: number) => {
    if (slot < 0 || slot >= maxTeamSize) return;
    
    setTeam(currentTeam => {
      const newTeam = [...currentTeam];
      newTeam[slot] = pokemon;
      return newTeam;
    });
  }, [maxTeamSize]);

  const removePokemonFromSlot = useCallback((slot: number) => {
    if (slot < 0 || slot >= maxTeamSize) return;
    
    setTeam(currentTeam => {
      const newTeam = [...currentTeam];
      newTeam[slot] = null;
      return newTeam;
    });
  }, [maxTeamSize]);

  const clearTeam = useCallback(() => {
    setTeam(Array(maxTeamSize).fill(null));
  }, [maxTeamSize]);

  // Get non-null pokemon for components that don't handle null values
  const getActiveTeam = useCallback(() => {
    return team.filter((pokemon): pokemon is Pokemon => pokemon !== null);
  }, [team]);

  return {
    team,
    addPokemonToSlot,
    removePokemonFromSlot,
    clearTeam,
    getActiveTeam,
    isEmpty: team.every(slot => slot === null)
  };
};