/** @type {import('next').NextConfig} */
module.exports = {
  basePath: '',
  eslint: {
    // Disabling on production builds because we're running checks on PRs via GitHub Actions.
    ignoreDuringBuilds: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      }
    ]
  },

  experimental: {
    appDir: true,
    fontLoaders: [{ loader: '@next/font/google', options: { subsets: ['latin'] } }]
  },

  async redirects() {
    return [
      {
        source: '/password',
        destination: '/',
        permanent: true
      },
      {
        source: '/shop',
        destination: '/shop/all',
        permanent: true
      }
    ];
  }
};
