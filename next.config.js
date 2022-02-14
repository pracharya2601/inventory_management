/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
    distDir: 'build',
    publicRuntimeConfig: {
        // add your public runtime environment variables here with NEXT_PUBLIC_*** prefix
    },
    env: {
        SHARING_IMAGE_API_KEY: 'AIzaSyC48M6kJwSUHCGrKaeQWOIf5M7TEtBWg4k',
        SHARING_IMAGE_AUTH_DOMAIN: 'my-own-project-661c3.firebaseapp.com',
        SHARING_IMAGE_PROJECT_ID: 'my-own-project-661c3',
        NEXT_PUBLIC_API_HOST: 'http://localhost:3000',
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
