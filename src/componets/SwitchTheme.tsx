"use client";
import useTheme from "@/store/useTheme";
import React, { useEffect, useState } from "react";

export default function SwitchTheme() {
	const [theme, setTheme] = useState<string | null>(null);
	const toggleTheme = useTheme((state) => state.toggleTheme);
	const storeTheme = useTheme((state) => state.theme);
	const initializeTheme = useTheme((state) => state.initializeTheme);

	useEffect(() => {
		initializeTheme();
		setTheme(storeTheme);
	}, [initializeTheme, storeTheme]);

	const handleThemeToggle = (event: React.MouseEvent) => {
		const { clientX: x, clientY: y } = event;
		const endRadius = Math.hypot(
			Math.max(x, window.innerWidth - x),
			Math.max(y, window.innerHeight - y),
		);

		const transitionEffect = () => {
			if (document.startViewTransition) {
				const transition = document.startViewTransition(() => {
					toggleTheme();
				});

				transition.ready.then(() => {
					const clipPath = [
						`circle(0px at ${x}px ${y}px)`,
						`circle(${endRadius}px at ${x}px ${y}px)`,
					];
					document.documentElement.animate(
						{ clipPath },
						{
							duration: 800,
							easing: "ease-in",
							pseudoElement: "::view-transition-new(root)",
						},
					);
				});
			} else {
				toggleTheme();
			}
		};

		if ("startViewTransition" in document) {
			transitionEffect();
		} else {
			toggleTheme();
		}
	};

	if (!theme) return null;

	const buttonStyle =
		`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`;

	return (
		<div className="fixed top-4 right-4 z-50">
			<button onClick={handleThemeToggle} className={buttonStyle}>
				{theme === "dark"
					? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-yellow-500"
						>
							<circle cx="12" cy="12" r="4" />
							<path d="M12 2v2" />
							<path d="M12 20v2" />
							<path d="m4.93 4.93 1.41 1.41" />
							<path d="m17.66 17.66 1.41 1.41" />
							<path d="M2 12h2" />
							<path d="M20 12h2" />
							<path d="m6.34 17.66-1.41 1.41" />
							<path d="m19.07 4.93-1.41 1.41" />
						</svg>
					)
					: (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-blue-500"
						>
							<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9" />
							<path d="M20 3v4" />
							<path d="M22 5h-4" />
						</svg>
					)}
			</button>
		</div>
	);
}
