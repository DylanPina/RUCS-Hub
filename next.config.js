/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: process.env.MAINTENANCE_MODE === "true" ? "/" : "/courses",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
