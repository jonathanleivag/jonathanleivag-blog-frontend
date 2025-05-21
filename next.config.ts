import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                pathname: '/**'
            },
        ],
    },
    experimental: {
        viewTransition: true,
    },
};

export default nextConfig;
