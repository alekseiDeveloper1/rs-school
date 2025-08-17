/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/StarWars',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
