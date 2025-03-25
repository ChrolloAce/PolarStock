/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disabling ESLint during production builds
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'images.pexels.com',
    ],
  },
}

module.exports = nextConfig 