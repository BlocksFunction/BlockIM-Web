import useCookie from "@/lib/tool/useTools/useCookie";
import { defineStore } from "pinia";
import { computed } from "vue";

const useTheme = defineStore("useTheme", () => {
	const theme = useCookie("theme", "light");

	const getTheme = computed(() => theme.cookie.value);

	function toggleTheme() {
		if (theme.cookie.value == "dark") theme.cookie.value = "light";
		else theme.cookie.value = "dark";
	}

	return { getTheme, toggleTheme };
});

export default useTheme;
