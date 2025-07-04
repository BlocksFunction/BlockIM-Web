<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	size: {
		type: String,
		default: "md",
		validator: (value: string) => ["sm", "md", "lg"].includes(value),
	},
	label: {
		type: String,
		default: "",
	},
});

const emit = defineEmits(["update:modelValue"]);

const toggleSwitch = () => {
	if (!props.disabled) {
		emit("update:modelValue", !props.modelValue);
	}
};

const sizeClasses = computed(() => {
	switch (props.size) {
		case "sm":
			return {
				track: "w-9 h-5",
				thumb: "w-4 h-4",
				translate: "translate-x-4",
			};
		case "lg":
			return {
				track: "w-14 h-7",
				thumb: "w-6 h-6",
				translate: "translate-x-7",
			};
		default:
			return {
				track: "w-11 h-6",
				thumb: "w-5 h-5",
				translate: "translate-x-5",
			};
	}
});
</script>

<template>
	<div class="flex items-center">
		<button
			type="button"
			:disabled="disabled"
			@click="toggleSwitch"
			class="relative inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
			:class='
				[
					sizeClasses.track,
					modelValue
						? "bg-blue-500 hover:bg-blue-600"
						: "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500",
					disabled && "opacity-50 cursor-not-allowed",
				]
			'
			role="switch"
			:aria-checked="modelValue"
		>
			<span
				aria-hidden="true"
				class="inline-block bg-white rounded-full shadow transform transition-transform"
				:class='
					[
						sizeClasses.thumb,
						modelValue
							? sizeClasses.translate
							: "translate-x-1",
					]
				'
			/>
		</button>

		<span
			v-if="label"
			class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100"
		>
			{{ label }}
		</span>
	</div>
</template>
