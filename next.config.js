const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa")({
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    sw: "service-worker.gen.js",
  },
});
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withPlugins([withPWA, withBundleAnalyzer], {
  reactStrictMode: true,
  experimental: {
    reactMode: "concurrent",
  },
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
  images: {
    domains: ["www.gravatar.com"],
  },
});
