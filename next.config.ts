import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	bundlePagesRouterDependencies: true,
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},
	experimental: {
		optimizeCss: true,
		ppr: "incremental",
	},
	compress: true,
	images: {
		formats: ["image/webp"],
	},
};

export default nextConfig;
