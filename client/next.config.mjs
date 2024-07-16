/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatar.iran.liara.run" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "cloudflare-ipfs.com" },
      { protocol: "http", hostname: "localhost" },
    ]
  },
  reactStrictMode: false,
};

export default nextConfig;
