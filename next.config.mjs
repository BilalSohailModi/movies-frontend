/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "s3-movies-poster.s3.amazonaws.com"], // List of allowed domains for external images
  },
};

export default nextConfig;
