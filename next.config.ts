import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Linting runs in CI rather than inside `next build`
  eslint: { ignoreDuringBuilds: true },
}

export default nextConfig
