import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thumb.viva.co.id',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ratemyprofessors.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'apps.ub.ac.id',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.gravatar.com',
        port: '',
        pathname: '/**',
      },

    ]
  }
};

export default nextConfig;
