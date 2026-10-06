/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so the site deploys to S3 + CloudFront like the previous Talkys build.
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  transpilePackages: ['gsap', 'swiper'],
};

export default nextConfig;
