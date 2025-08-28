import nextPwa from 'next-pwa';

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "maps.googleapis.com",
      "lojave.com.br",
      "192.168.1.50"
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/files/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/files/**",
      },
      {
        protocol: "https",
        hostname: "lojave.com.br",
        pathname: "/files/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.50",
        pathname: "/media/**",
      },
    ],
  },
};

// Wrapper do PWA
const withPWA = nextPwa({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

export default withPWA(baseConfig);
