<script setup lang="ts">
// 可能会弃用
import { ref } from "vue";
import {
	AppWindow,
	LayoutDashboard,
	PanelLeft,
	PanelRight,
	Sidebar,
} from "lucide-vue-next";

const layoutOptions = ref([
	{
		id: "default",
		name: "默认布局",
		icon: LayoutDashboard,
		description: "标准三栏布局，左侧导航，中间内容，右侧信息",
		preview: "三栏",
	},
	{
		id: "compact",
		name: "紧凑布局",
		icon: Sidebar,
		description: "紧凑的两栏布局，左侧导航和内容合并",
		preview: "两栏",
	},
	{
		id: "focus",
		name: "专注布局",
		icon: AppWindow,
		description: "单栏布局，最大化内容区域",
		preview: "单栏",
	},
]);

const sidebarOptions = ref([
	{ id: "left", name: "左侧", icon: PanelLeft },
	{ id: "right", name: "右侧", icon: PanelRight },
	{ id: "hidden", name: "隐藏", icon: AppWindow },
]);

const selectedLayout = ref("default");
const selectedSidebar = ref("left");
const sidebarWidth = ref(240);
const density = ref("normal"); // compact, normal, spacious

const densityOptions = [
	{ id: "compact", name: "紧凑", description: "较小的间距和元素尺寸" },
	{ id: "normal", name: "标准", description: "默认的间距和元素尺寸" },
	{ id: "spacious", name: "宽松", description: "更大的间距和元素尺寸" },
];
</script>

<template>
	<div class="flex-1 overflow-y-auto p-6">
		<div class="max-w-3xl mx-auto">
			<div class="mb-8">
				<h1 class="text-2xl font-bold text-gray-900 dark:text-white">
					布局设置
				</h1>
				<p class="text-gray-500 dark:text-gray-400 mt-2">
					自定义应用的布局和界面结构
				</p>
			</div>

			<div
				class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6"
			>
				<div class="flex items-start mb-6">
					<LayoutDashboard class="w-6 h-6 text-blue-500 mt-1 mr-3" />
					<div class="flex-1">
						<h2
							class="text-lg font-semibold text-gray-900 dark:text-white"
						>
							布局模式
						</h2>
						<p
							class="text-sm text-gray-500 dark:text-gray-400 mt-1"
						>
							选择适合您使用习惯的布局
						</p>
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
					<button
						v-for="layout in layoutOptions"
						:key="layout.id"
						@click="selectedLayout = layout.id"
						class="p-4 border rounded-xl transition-colors group"
						:class='
							[
								selectedLayout === layout.id
									? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
									: "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700",
							]
						'
					>
						<div class="flex flex-col items-center">
							<component
								:is="layout.icon"
								class="w-8 h-8 mb-3"
								:class='
									selectedLayout ===
										layout.id
									? "text-blue-500"
									: "text-gray-400 dark:text-gray-500"
								'
							/>
							<span
								class="font-medium mb-1"
								:class='
									selectedLayout ===
										layout.id
									? "text-blue-500"
									: "text-gray-700 dark:text-gray-300"
								'
							>
								{{
									layout
									.name
								}}
							</span>
							<div
								class="text-sm text-gray-500 dark:text-gray-400 text-center"
							>
								{{
									layout
									.description
								}}
							</div>
							<div
								class="mt-3 w-full h-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center"
							>
								<span class="text-gray-500">{{
									layout
									.preview
								}}</span>
							</div>
						</div>
					</button>
				</div>
			</div>

			<div
				class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6"
			>
				<div class="flex items-start mb-6">
					<Sidebar class="w-6 h-6 text-blue-500 mt-1 mr-3" />
					<div class="flex-1">
						<h2
							class="text-lg font-semibold text-gray-900 dark:text-white"
						>
							侧边栏设置
						</h2>
						<p
							class="text-sm text-gray-500 dark:text-gray-400 mt-1"
						>
							自定义侧边栏的位置和宽度
						</p>
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
					<button
						v-for="option in sidebarOptions"
						:key="option.id"
						@click="selectedSidebar = option.id"
						class="p-4 border rounded-xl transition-colors group"
						:class='
							[
								selectedSidebar === option.id
									? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
									: "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700",
							]
						'
					>
						<div class="flex flex-col items-center">
							<component
								:is="option.icon"
								class="w-8 h-8 mb-3"
								:class='
									selectedSidebar ===
										option.id
									? "text-blue-500"
									: "text-gray-400 dark:text-gray-500"
								'
							/>
							<span
								class="font-medium"
								:class='
									selectedSidebar ===
										option.id
									? "text-blue-500"
									: "text-gray-700 dark:text-gray-300"
								'
							>
								{{
									option
									.name
								}}
							</span>
						</div>
					</button>
				</div>

				<div v-if='selectedSidebar !== "hidden"'>
					<div class="flex justify-between mb-2">
						<label
							class="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>侧边栏宽度</label>
						<span
							class="text-sm text-gray-500 dark:text-gray-400"
						>{{ sidebarWidth }}px</span>
					</div>
					<input
						v-model.number="sidebarWidth"
						type="range"
						min="180"
						max="320"
						step="10"
						class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
					/>
					<div
						class="mt-4 bg-gray-100 dark:bg-gray-900 rounded-lg h-32 flex"
					>
						<div
							class="bg-gray-300 dark:bg-gray-700 flex items-center justify-center"
							:style="
								{
									width:
										`${sidebarWidth}px`,
								}
							"
						>
							<span class="text-gray-500">侧边栏</span>
						</div>
						<div
							class="flex-1 bg-white dark:bg-gray-800 flex items-center justify-center"
						>
							<span class="text-gray-500">内容区域</span>
						</div>
					</div>
				</div>
			</div>

			<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
				<div class="flex items-start mb-6">
					<LayoutDashboard class="w-6 h-6 text-blue-500 mt-1 mr-3" />
					<div class="flex-1">
						<h2
							class="text-lg font-semibold text-gray-900 dark:text-white"
						>
							界面密度
						</h2>
						<p
							class="text-sm text-gray-500 dark:text-gray-400 mt-1"
						>
							调整界面元素的间距和大小
						</p>
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
					<button
						v-for="option in densityOptions"
						:key="option.id"
						@click="density = option.id"
						class="p-4 border rounded-xl transition-colors group"
						:class='
							[
								density === option.id
									? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
									: "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700",
							]
						'
					>
						<div class="text-left">
							<span
								class="font-medium block mb-1"
								:class='
									density ===
										option.id
									? "text-blue-500"
									: "text-gray-700 dark:text-gray-300"
								'
							>
								{{
									option
									.name
								}}
							</span>
							<div
								class="text-sm text-gray-500 dark:text-gray-400"
							>
								{{
									option
									.description
								}}
							</div>
							<div class="mt-4">
								<div
									class="h-2 bg-gray-300 dark:bg-gray-700 rounded mb-2 transition-all"
									:class='
										{
											"w-3/4":
												density ===
													"compact",
											"w-full":
												density !==
													"compact",
										}
									'
								>
								</div>
								<div
									class="h-2 bg-gray-300 dark:bg-gray-700 rounded mb-2 transition-all"
									:class='
										{
											"w-1/2":
												density ===
													"compact",
											"w-3/4":
												density ===
													"normal",
											"w-full":
												density ===
													"spacious",
										}
									'
								>
								</div>
								<div
									class="h-2 bg-gray-300 dark:bg-gray-700 rounded transition-all"
									:class='
										{
											"w-1/4":
												density ===
													"compact",
											"w-1/2":
												density ===
													"normal",
											"w-3/4":
												density ===
													"spacious",
										}
									'
								>
								</div>
							</div>
						</div>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
