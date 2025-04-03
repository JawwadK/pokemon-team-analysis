// src/types/pokemon.ts

export type PokemonType = 
  | 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice'
  | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic'
  | 'bug' | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel'
  | 'fairy';

export interface Pokemon {
  id: number;
  name: string;
  types: {
    slot: number;
    type: {
      name: PokemonType;
      url: string;
    };
  }[];
  sprites: {
    front_default: string;
    back_default: string;
    other?: {
      "official-artwork"?: {
        front_default: string;
      };
      home?: {
        front_default: string;
      };
    };
  };
}

export interface GameData {
  name: string;
  generation: number;
  regionalDex: number[];
  nationalDex: boolean;
  availablePokemon: number[];
}