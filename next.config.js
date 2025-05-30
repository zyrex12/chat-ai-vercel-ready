/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { serverActions: true },
};
module.exports = nextConfig;

// ======== vercel.json ========
{
  "version": 2,
  "builds": [
    { "src": "next.config.js", "use": "@vercel/next" }
  ]
}
