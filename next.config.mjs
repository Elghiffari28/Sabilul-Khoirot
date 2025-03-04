/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
      {
        hostname: "placehold.co",
      },
      {
        hostname: "tailwindui.com",
      },
      {
        hostname: "https://flowbite.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
