import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "http", hostname: "localhost" }]
  },
  reactStrictMode: false
};

export default withNextIntl(nextConfig);
