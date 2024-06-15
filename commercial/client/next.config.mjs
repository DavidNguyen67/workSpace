/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['salt.tikicdn.com', 'vcdn.tikicdn.com'],
  },
  async headers() {
    return [
      {
        source: '/login',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
