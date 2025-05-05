import './globals.css';
import { getTheme } from '@/actions/theme';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import React from 'react';

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "BlockIm",
	description: "一个由Next.js驱动的聊天模板",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const theme = await getTheme();

	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${theme} antialiased`}
			>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
