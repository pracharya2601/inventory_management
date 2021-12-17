/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
    distDir: 'build',
    publicRuntimeConfig: {
        // add your public runtime environment variables here with NEXT_PUBLIC_*** prefix
    },
    images: {
        domains: [
            'imgs.michaels.com',
            'cdn.shopify.com',
            'www.google.com',
            'www.openbsd.org',
            'storage.googleapis.com',
        ],
    },
    webpack: (config) => {
        // extend your webpack configuration here
        return config;
    },
});
