/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {}, // <- debe ser un objeto (aunque esté vacío)
  }, // <-- agrega esta coma

  compiler: {
    emotion: true,
  },
};

module.exports = nextConfig;
