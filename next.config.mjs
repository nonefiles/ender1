import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Resim optimizasyonunu devre dışı bırak (Static export veya özel sunucu ayarları için gerekebilir)
    // Eğer Vercel kullanıyorsanız bunu false yapıp optimizasyonu açabilirsiniz.
    unoptimized: true, 
    
    // Dış kaynaklardan (Instagram, Unsplash vb.) gelen resimlere izin ver
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'scontent.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
}

export default withNextIntl(nextConfig);