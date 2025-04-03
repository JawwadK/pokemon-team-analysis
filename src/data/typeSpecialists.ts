// src/data/typeSpecialists.ts

export interface TypeSpecialist {
  name: string;
  type: string;
  game?: string;
  description?: string;
}

export interface TrainerData {
  name: string;
  game?: string;
  pokemon: {
    name: string;
    types: string[];
  }[];
  description?: string;
}

// Elite 4 and Gym Leader type specialists by generation
export const TYPE_SPECIALISTS: Record<number, TypeSpecialist[]> = {
  // Gen 1
  1: [
    { name: "Brock", type: "rock", game: "Red/Blue/Yellow" },
    { name: "Misty", type: "water", game: "Red/Blue/Yellow" },
    { name: "Lt. Surge", type: "electric", game: "Red/Blue/Yellow" },
    { name: "Erika", type: "grass", game: "Red/Blue/Yellow" },
    { name: "Koga", type: "poison", game: "Red/Blue/Yellow" },
    { name: "Sabrina", type: "psychic", game: "Red/Blue/Yellow" },
    { name: "Blaine", type: "fire", game: "Red/Blue/Yellow" },
    { name: "Giovanni", type: "ground", game: "Red/Blue/Yellow" },
    { name: "Lorelei", type: "ice", game: "Red/Blue/Yellow" },
    { name: "Bruno", type: "fighting", game: "Red/Blue/Yellow" },
    { name: "Agatha", type: "ghost", game: "Red/Blue/Yellow" },
    { name: "Lance", type: "dragon", game: "Red/Blue/Yellow" },
  ],
  // Gen 2
  2: [
    { name: "Falkner", type: "flying", game: "Gold/Silver/Crystal" },
    { name: "Bugsy", type: "bug", game: "Gold/Silver/Crystal" },
    { name: "Whitney", type: "normal", game: "Gold/Silver/Crystal" },
    { name: "Morty", type: "ghost", game: "Gold/Silver/Crystal" },
    { name: "Chuck", type: "fighting", game: "Gold/Silver/Crystal" },
    { name: "Jasmine", type: "steel", game: "Gold/Silver/Crystal" },
    { name: "Pryce", type: "ice", game: "Gold/Silver/Crystal" },
    { name: "Clair", type: "dragon", game: "Gold/Silver/Crystal" },
    { name: "Will", type: "psychic", game: "Gold/Silver/Crystal" },
    { name: "Koga", type: "poison", game: "Gold/Silver/Crystal" },
    { name: "Bruno", type: "fighting", game: "Gold/Silver/Crystal" },
    { name: "Karen", type: "dark", game: "Gold/Silver/Crystal" },
  ],
  // Gen 3
  3: [
    { name: "Roxanne", type: "rock", game: "Ruby/Sapphire/Emerald" },
    { name: "Brawly", type: "fighting", game: "Ruby/Sapphire/Emerald" },
    { name: "Wattson", type: "electric", game: "Ruby/Sapphire/Emerald" },
    { name: "Flannery", type: "fire", game: "Ruby/Sapphire/Emerald" },
    { name: "Norman", type: "normal", game: "Ruby/Sapphire/Emerald" },
    { name: "Winona", type: "flying", game: "Ruby/Sapphire/Emerald" },
    { name: "Tate & Liza", type: "psychic", game: "Ruby/Sapphire/Emerald" },
    { name: "Wallace", type: "water", game: "Ruby/Sapphire/Emerald" },
    { name: "Sidney", type: "dark", game: "Ruby/Sapphire/Emerald" },
    { name: "Phoebe", type: "ghost", game: "Ruby/Sapphire/Emerald" },
    { name: "Glacia", type: "ice", game: "Ruby/Sapphire/Emerald" },
    { name: "Drake", type: "dragon", game: "Ruby/Sapphire/Emerald" },
  ],
  // Gen 4
  4: [
    { name: "Roark", type: "rock", game: "Diamond/Pearl/Platinum" },
    { name: "Gardenia", type: "grass", game: "Diamond/Pearl/Platinum" },
    { name: "Maylene", type: "fighting", game: "Diamond/Pearl/Platinum" },
    { name: "Wake", type: "water", game: "Diamond/Pearl/Platinum" },
    { name: "Fantina", type: "ghost", game: "Diamond/Pearl/Platinum" },
    { name: "Byron", type: "steel", game: "Diamond/Pearl/Platinum" },
    { name: "Candice", type: "ice", game: "Diamond/Pearl/Platinum" },
    { name: "Volkner", type: "electric", game: "Diamond/Pearl/Platinum" },
    { name: "Aaron", type: "bug", game: "Diamond/Pearl/Platinum" },
    { name: "Bertha", type: "ground", game: "Diamond/Pearl/Platinum" },
    { name: "Flint", type: "fire", game: "Diamond/Pearl/Platinum" },
    { name: "Lucian", type: "psychic", game: "Diamond/Pearl/Platinum" },
  ],
  // Gen 5
  5: [
    { name: "Chili", type: "fire", game: "Black/White" },
    { name: "Cress", type: "water", game: "Black/White" },
    { name: "Cilan", type: "grass", game: "Black/White" },
    { name: "Lenora", type: "normal", game: "Black/White" },
    { name: "Burgh", type: "bug", game: "Black/White" },
    { name: "Elesa", type: "electric", game: "Black/White" },
    { name: "Clay", type: "ground", game: "Black/White" },
    { name: "Skyla", type: "flying", game: "Black/White" },
    { name: "Brycen", type: "ice", game: "Black/White" },
    { name: "Drayden", type: "dragon", game: "Black/White" },
    { name: "Shauntal", type: "ghost", game: "Black/White" },
    { name: "Marshal", type: "fighting", game: "Black/White" },
    { name: "Grimsley", type: "dark", game: "Black/White" },
    { name: "Caitlin", type: "psychic", game: "Black/White" },
  ],
  // Gen 6
  6: [
    { name: "Viola", type: "bug", game: "X/Y" },
    { name: "Grant", type: "rock", game: "X/Y" },
    { name: "Korrina", type: "fighting", game: "X/Y" },
    { name: "Ramos", type: "grass", game: "X/Y" },
    { name: "Clemont", type: "electric", game: "X/Y" },
    { name: "Valerie", type: "fairy", game: "X/Y" },
    { name: "Olympia", type: "psychic", game: "X/Y" },
    { name: "Wulfric", type: "ice", game: "X/Y" },
    { name: "Malva", type: "fire", game: "X/Y" },
    { name: "Siebold", type: "water", game: "X/Y" },
    { name: "Wikstrom", type: "steel", game: "X/Y" },
    { name: "Drasna", type: "dragon", game: "X/Y" },
  ],
  // Gen 7
  7: [
    { name: "Ilima", type: "normal", game: "Sun/Moon" },
    { name: "Lana", type: "water", game: "Sun/Moon" },
    { name: "Kiawe", type: "fire", game: "Sun/Moon" },
    { name: "Mallow", type: "grass", game: "Sun/Moon" },
    { name: "Sophocles", type: "electric", game: "Sun/Moon" },
    { name: "Acerola", type: "ghost", game: "Sun/Moon" },
    { name: "Hala", type: "fighting", game: "Sun/Moon" },
    { name: "Olivia", type: "rock", game: "Sun/Moon" },
    { name: "Nanu", type: "dark", game: "Sun/Moon" },
    { name: "Hapu", type: "ground", game: "Sun/Moon" },
    { name: "Molayne", type: "steel", game: "Sun/Moon" },
    { name: "Kahili", type: "flying", game: "Sun/Moon" },
  ],
  // Gen 8
  8: [
    { name: "Milo", type: "grass", game: "Sword/Shield" },
    { name: "Nessa", type: "water", game: "Sword/Shield" },
    { name: "Kabu", type: "fire", game: "Sword/Shield" },
    { name: "Bea", type: "fighting", game: "Sword/Shield" },
    { name: "Allister", type: "ghost", game: "Sword/Shield" },
    { name: "Opal", type: "fairy", game: "Sword/Shield" },
    { name: "Gordie", type: "rock", game: "Sword/Shield" },
    { name: "Melony", type: "ice", game: "Sword/Shield" },
    { name: "Piers", type: "dark", game: "Sword/Shield" },
    { name: "Raihan", type: "dragon", game: "Sword/Shield" },
  ],
  // Gen 9
  9: [
    { name: "Katy", type: "bug", game: "Scarlet/Violet" },
    { name: "Brassius", type: "grass", game: "Scarlet/Violet" },
    { name: "Iono", type: "electric", game: "Scarlet/Violet" },
    { name: "Kofu", type: "water", game: "Scarlet/Violet" },
    { name: "Ryme", type: "ghost", game: "Scarlet/Violet" },
    { name: "Larry", type: "normal", game: "Scarlet/Violet" },
    { name: "Tulip", type: "psychic", game: "Scarlet/Violet" },
    { name: "Grusha", type: "ice", game: "Scarlet/Violet" },
    { name: "Rika", type: "fairy", game: "Scarlet/Violet" },
  ],
};

// Notable trainers across games
export const NOTABLE_TRAINERS: TrainerData[] = [
  {
    name: "Champion Leon",
    game: "Sword/Shield",
    pokemon: [
      { name: "Charizard", types: ["fire", "flying"] },
      { name: "Aegislash", types: ["steel", "ghost"] },
      { name: "Dragapult", types: ["dragon", "ghost"] },
      { name: "Mr. Rime", types: ["ice", "psychic"] },
      { name: "Haxorus", types: ["dragon"] },
      { name: "Cinderace", types: ["fire"] },
    ],
  },
  {
    name: "Champion Cynthia",
    game: "Diamond/Pearl/Platinum",
    pokemon: [
      { name: "Spiritomb", types: ["ghost", "dark"] },
      { name: "Roserade", types: ["grass", "poison"] },
      { name: "Gastrodon", types: ["water", "ground"] },
      { name: "Lucario", types: ["fighting", "steel"] },
      { name: "Milotic", types: ["water"] },
      { name: "Garchomp", types: ["dragon", "ground"] },
    ],
  },
  {
    name: "Champion Steven",
    game: "Ruby/Sapphire/Emerald",
    pokemon: [
      { name: "Skarmory", types: ["steel", "flying"] },
      { name: "Claydol", types: ["ground", "psychic"] },
      { name: "Aggron", types: ["steel", "rock"] },
      { name: "Cradily", types: ["rock", "grass"] },
      { name: "Armaldo", types: ["rock", "bug"] },
      { name: "Metagross", types: ["steel", "psychic"] },
    ],
  },
  {
    name: "Champion Blue",
    game: "Red/Blue/Yellow",
    pokemon: [
      { name: "Pidgeot", types: ["normal", "flying"] },
      { name: "Alakazam", types: ["psychic"] },
      { name: "Rhydon", types: ["ground", "rock"] },
      { name: "Gyarados", types: ["water", "flying"] },
      { name: "Arcanine", types: ["fire"] },
      { name: "Exeggutor", types: ["grass", "psychic"] },
    ],
  },
  {
    name: "Elite Four Lorelei",
    game: "Red/Blue/Yellow",
    pokemon: [
      { name: "Dewgong", types: ["water", "ice"] },
      { name: "Cloyster", types: ["water", "ice"] },
      { name: "Slowbro", types: ["water", "psychic"] },
      { name: "Jynx", types: ["ice", "psychic"] },
      { name: "Lapras", types: ["water", "ice"] },
    ],
  },
  {
    name: "Champion Diantha",
    game: "X/Y",
    pokemon: [
      { name: "Hawlucha", types: ["fighting", "flying"] },
      { name: "Tyrantrum", types: ["rock", "dragon"] },
      { name: "Aurorus", types: ["rock", "ice"] },
      { name: "Gourgeist", types: ["ghost", "grass"] },
      { name: "Goodra", types: ["dragon"] },
      { name: "Gardevoir", types: ["psychic", "fairy"] },
    ],
  },
  {
    name: "Champion Alder",
    game: "Black/White",
    pokemon: [
      { name: "Accelgor", types: ["bug"] },
      { name: "Bouffalant", types: ["normal"] },
      { name: "Druddigon", types: ["dragon"] },
      { name: "Vanilluxe", types: ["ice"] },
      { name: "Escavalier", types: ["bug", "steel"] },
      { name: "Volcarona", types: ["bug", "fire"] },
    ],
  },
  {
    name: "Champion Lance",
    game: "Gold/Silver/Crystal",
    pokemon: [
      { name: "Gyarados", types: ["water", "flying"] },
      { name: "Dragonite", types: ["dragon", "flying"] },
      { name: "Dragonite", types: ["dragon", "flying"] },
      { name: "Aerodactyl", types: ["rock", "flying"] },
      { name: "Charizard", types: ["fire", "flying"] },
      { name: "Dragonite", types: ["dragon", "flying"] },
    ],
  },
  {
    name: "Elite Four Wikstrom",
    game: "X/Y",
    pokemon: [
      { name: "Klefki", types: ["steel", "fairy"] },
      { name: "Probopass", types: ["rock", "steel"] },
      { name: "Scizor", types: ["bug", "steel"] },
      { name: "Aegislash", types: ["steel", "ghost"] },
    ],
  },
  {
    name: "Elite Four Marshal",
    game: "Black/White",
    pokemon: [
      { name: "Throh", types: ["fighting"] },
      { name: "Sawk", types: ["fighting"] },
      { name: "Conkeldurr", types: ["fighting"] },
      { name: "Mienshao", types: ["fighting"] },
    ],
  }
];

// Common type combinations for analysis
export const COMMON_MATCHUPS = [
  { name: "Fire/Flying", types: ["fire", "flying"] },
  { name: "Water/Ground", types: ["water", "ground"] },
  { name: "Grass/Poison", types: ["grass", "poison"] },
  { name: "Electric/Steel", types: ["electric", "steel"] },
  { name: "Psychic/Fairy", types: ["psychic", "fairy"] },
  { name: "Dark/Ghost", types: ["dark", "ghost"] },
  { name: "Fighting/Rock", types: ["fighting", "rock"] },
  { name: "Ice/Dragon", types: ["ice", "dragon"] },
  { name: "Bug/Flying", types: ["bug", "flying"] },
  { name: "Normal/Flying", types: ["normal", "flying"] },
  { name: "Water/Ice", types: ["water", "ice"] },
  { name: "Grass/Dragon", types: ["grass", "dragon"] },
];