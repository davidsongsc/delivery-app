import nextPwa from 'next-pwa';

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "maps.googleapis.com",
      "lojave.com.br"
    ],
    remotePatterns: [
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
