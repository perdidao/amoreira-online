/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  i18n: {
    defaultLocale: 'pt-br',
    locales: ['pt-br'],
    localeDetection: false,
  },
  images: {
    domains: ['i.imgur.com'],
  },
  swcMinify: true,
}

export default nextConfig
