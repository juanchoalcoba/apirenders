export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

// types/types.ts

// Tipo básico para la lista de Pokémon
export interface Pokemon {
  id?: number;
  name: string;
  url: string;
}

// Tipo detallado para un Pokémon individual
export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface Dog {
  id: number;
  name: string;
  life_span: string;
  temperament?: string;
  image?: { url: string };
  bred_for?: string;
  breed_group: string;
  weight?: {
    imperial?: string;
    metric?: string;
  };
  height?: {
    imperial?: string;
    metric?: string;
  };
}

export interface ApiCharacter {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string; // ✅ Agrega esta
  gender: "Female" | "Male" | "Genderless" | "unknown";
  image: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  episode?: string[]; // ✅ Agrega esta
}

export interface ApiResponse {
  results: ApiCharacter[];
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
}

export interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string; // ✅ Agrega esta
  gender: "Female" | "Male" | "Genderless" | "unknown";
  image: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  episode?: string[]; // ✅ Agrega esta (array de URLs de episodios)
}

export type ApiLeaguesResponse = {
  response: {
    league: {
      id: number;
      name: string;
      type: string;
      logo?: string;
    };
    country: {
      name: string;
      code?: string;
      flag?: string;
    };
    seasons: {
      year: number;
      current: boolean;
    }[];
  }[];
};

export interface League {
  id: number;
  name: string;
  type: string;
  logo?: string;
  country: string;
  countryCode?: string;
  flag?: string;
  currentSeason?: number;
}

export type ApiTeamsResponse = {
  response: {
    team: {
      id: number;
      name: string;
      code?: string;
      country?: string;
      founded?: number;
      logo?: string;
    };
    venue?: {
      name?: string;
      city?: string;
    };
  }[];
};

export interface Team {
  id: number;
  name: string;
  code?: string;
  country?: string;
  founded?: number;
  logo?: string;
  venue?: {
    name?: string;
    city?: string;
  };
}

export interface RouteItem {
  href: string;
  label: string;
  icon: React.ElementType;
}
