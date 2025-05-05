import { setCookie } from "@/actions/cookie";
import { getTheme } from "@/actions/theme";
import { create } from "zustand/react";

interface ThemeStore {
	theme: string | null;
	getTheme: () => string | null;
	toggleTheme: () => void;
	setTheme: (newTheme: string) => void;
	initializeTheme: () => void;
}

const useTheme = create<ThemeStore>((set, get) => ({
	theme: null,
	getTheme: () => get().theme,
	toggleTheme: async () => {
		if (get().theme == "light") {
			await setCookie("theme", "dark");
			set((state) => ({ ...state, theme: "dark" }));
		} else {
			await setCookie("theme", "light");
			set((state) => ({ ...state, theme: "light" }));
		}
	},
	setTheme: async (newTheme) => {
		await setCookie("theme", newTheme);
		set((state) => ({ ...state, theme: newTheme }));
	},
	initializeTheme: async () => {
		const initialTheme = await getTheme();
		useTheme.setState({ theme: initialTheme });
	},
}));

export default useTheme;
