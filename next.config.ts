import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        port: '',
        pathname: '/api/character/avatar/**',
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: '',
        pathname: "/PokeAPI/sprites/master/sprites/pokemon/**",
      },
      {
        protocol: "https",
        hostname: "cdn2.thedogapi.com",
        port: '',
        pathname: "/images/**", // la API de perros devuelve URLs como cdn2.thedogapi.com/images/ID.jpg
      },
       {
        protocol: "https",
        hostname: "media.api-sports.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
