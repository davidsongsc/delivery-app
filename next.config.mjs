/** @type {import('next').NextConfig} */
const nextConfig = {
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

export default nextConfig;
