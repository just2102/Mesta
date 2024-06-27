/** @type {import("next").NextConfig} */
const config = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname: `${process.env.THIRDWEB_CLIENT_ID}.ipfscdn.io`,
      },
    ],
  },
};

export default config;
