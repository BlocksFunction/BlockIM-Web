<script setup lang="ts">
import { useToggleThemeViewTransition } from "@/lib/useToggleThemeViewTransition.ts";
import useTheme from "@/stores/useTheme.ts";
import { MoonStar, Sun } from "lucide-vue-next";

const theme = useTheme();
const { executeTransition, transitionEvent } = useToggleThemeViewTransition();

function handleThemeToggle(event: MouseEvent) {
	transitionEvent.value = event;
	executeTransition(() => {
		theme.toggleTheme();
	});
}
</script>

<template>
	<button @click="handleThemeToggle" class="cursor-pointer">
		<Sun
			:size="30"
			class="text-yellow-500"
			v-if="theme.getTheme == 'light'"
		/>
		<MoonStar
			class="text-blue-500"
			:size="30"
			v-else
		/>
	</button>
</template>

<style>
:root {
	&::view-transition-old(root),
	&::view-transition-new(root) {
		animation: none;
		mix-blend-mode: normal;
		z-index: 1;
	}

	&::view-transition-old(root) {
		z-index: 999;
	}
}
</style>
