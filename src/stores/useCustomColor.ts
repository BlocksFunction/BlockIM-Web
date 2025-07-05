import { defineStore } from "pinia";
import { computed, ref } from "vue";
import useCookie from "@/lib/tool/useTools/useCookie.ts";

const colorClassMap = {
	blue: {
		themeBorder: "border-blue-500",
		themeBgLight: "bg-blue-50",
		themeBgDark: "dark:bg-blue-900/20",
		themeIconText: "text-blue-500",
		themeText: "text-blue-500",
		bubbleBg: "bg-blue-500",
		mobileBgLight: "bg-blue-100",
		mobileBgDark: "dark:bg-blue-900/30",
		mobileAvatarBg: "bg-blue-300",
		mobileAvatarBgDark: "dark:bg-blue-700",
		colorButtonRing: "ring-blue-500",
		groupHover: "group-hover:text-blue-500",
		focusBorder: "focus:border-blue-500",
		focusRing: "focus:ring-blue-500",
		hoverDark: "hover:bg-blue-600",
	},
	green: {
		themeBorder: "border-green-500",
		themeBgLight: "bg-green-50",
		themeBgDark: "dark:bg-green-900/20",
		themeIconText: "text-green-500",
		themeText: "text-green-500",
		bubbleBg: "bg-green-500",
		mobileBgLight: "bg-green-100",
		mobileBgDark: "dark:bg-green-900/30",
		mobileAvatarBg: "bg-green-300",
		mobileAvatarBgDark: "dark:bg-green-700",
		colorButtonRing: "ring-green-500",
		groupHover: "group-hover:text-green-500",
		focusBorder: "focus:border-green-500",
		focusRing: "focus:ring-green-500",
		hoverDark: "hover:bg-green-600",
	},
	purple: {
		themeBorder: "border-purple-500",
		themeBgLight: "bg-purple-50",
		themeBgDark: "dark:bg-purple-900/20",
		themeIconText: "text-purple-500",
		themeText: "text-purple-500",
		bubbleBg: "bg-purple-500",
		mobileBgLight: "bg-purple-100",
		mobileBgDark: "dark:bg-purple-900/30",
		mobileAvatarBg: "bg-purple-300",
		mobileAvatarBgDark: "dark:bg-purple-700",
		colorButtonRing: "ring-purple-500",
		groupHover: "group-hover:text-purple-500",
		focusBorder: "focus:border-purple-500",
		focusRing: "focus:ring-purple-500",
		hoverDark: "hover:bg-purple-600",
	},
	red: {
		themeBorder: "border-red-500",
		themeBgLight: "bg-red-50",
		themeBgDark: "dark:bg-red-900/20",
		themeIconText: "text-red-500",
		themeText: "text-red-500",
		bubbleBg: "bg-red-500",
		mobileBgLight: "bg-red-100",
		mobileBgDark: "dark:bg-red-900/30",
		mobileAvatarBg: "bg-red-300",
		mobileAvatarBgDark: "dark:bg-red-700",
		colorButtonRing: "ring-red-500",
		groupHover: "group-hover:text-red-500",
		focusBorder: "focus:border-red-500",
		focusRing: "focus:ring-red-500",
		hoverDark: "hover:bg-red-600",
	},
	orange: {
		themeBorder: "border-orange-500",
		themeBgLight: "bg-orange-50",
		themeBgDark: "dark:bg-orange-900/20",
		themeIconText: "text-orange-500",
		themeText: "text-orange-500",
		bubbleBg: "bg-orange-500",
		mobileBgLight: "bg-orange-100",
		mobileBgDark: "dark:bg-orange-900/30",
		mobileAvatarBg: "bg-orange-300",
		mobileAvatarBgDark: "dark:bg-orange-700",
		colorButtonRing: "ring-orange-500",
		groupHover: "group-hover:text-orange-500",
		focusBorder: "focus:border-orange-500",
		focusRing: "focus:ring-orange-500",
		hoverDark: "hover:bg-orange-600",
	},
	pink: {
		themeBorder: "border-pink-500",
		themeBgLight: "bg-pink-50",
		themeBgDark: "dark:bg-pink-900/20",
		themeIconText: "text-pink-500",
		themeText: "text-pink-500",
		bubbleBg: "bg-pink-500",
		mobileBgLight: "bg-pink-100",
		mobileBgDark: "dark:bg-pink-900/30",
		mobileAvatarBg: "bg-pink-300",
		mobileAvatarBgDark: "dark:bg-pink-700",
		colorButtonRing: "ring-pink-500",
		groupHover: "group-hover:text-pink-500",
		focusBorder: "focus:border-pink-500",
		focusRing: "focus:ring-pink-500",
		hoverDark: "hover:bg-pink-600",
	},
};

type ColorType = keyof typeof colorClassMap;

export const useCustomColor = defineStore("useCustomColor", () => {
	const selectedColor = useCookie("color", "blue");

	const getCurrentColorClass = computed(() => {
		return colorClassMap[selectedColor.cookie.value];
	});

	function setSelectedColor(color: ColorType) {
		selectedColor.cookie.value = color;
	}

	return {
		selectedColor,
		getCurrentColorClass,
		setSelectedColor,
	};
});
