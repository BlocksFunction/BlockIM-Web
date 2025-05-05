import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},
	experimental: {
		optimizeCss: true,
	},
	compress: true,
	images: {
		formats: ["image/webp"],
	},
};

export default nextConfig;
