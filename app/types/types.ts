export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Pokemon {
  id: number;
  name: string;
  url: string;
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
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: ApiCharacter[];
}

export interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  image: string;
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
