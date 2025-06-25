/** @type {import('next').NextConfig} */
const nextConfig = {

  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {}, // <- debe ser un objeto (aunque esté vacío)
  }, // <-- agrega esta coma

  compiler: {
    emotion: true,
  },
};

module.exports = nextConfig;
