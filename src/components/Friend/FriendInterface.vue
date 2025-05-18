<script setup>
import {
	ChevronDown,
	ChevronRight,
	Plus,
	Search,
	UserPlus,
} from "lucide-vue-next";
import { computed, ref } from "vue";

const props = defineProps({});

const activeTab = ref("friends");
const activePage = ref("");
const searchQuery = ref("");

const tabs = ref([
	{ id: "friends", label: "好友" },
	{ id: "groups", label: "群聊" },
]);

const friendGroups = ref([
	{
		id: "default",
		name: "默认分组",
		collapsed: false,
		items: [
			{
				id: 1,
				name: "张三",
				avatar: "张",
				online: true,
				status: "在线",
			},
			{
				id: 2,
				name: "李四",
				avatar: "李",
				online: false,
				status: "离线",
			},
			{
				id: 3,
				name: "王五",
				avatar: "王",
				online: true,
				status: "忙碌",
			},
		],
	},
	{
		id: "work",
		name: "工作分组",
		collapsed: true,
		items: [
			{
				id: 4,
				name: "陈工",
				avatar: "陈",
				online: true,
				status: "在线",
			},
		],
	},
]);

const groupCategories = ref([
	{
		id: "work",
		name: "工作群组",
		collapsed: false,
		items: [
			{
				id: 1,
				name: "测试群一号",
				avatar: "测试",
				members: 15,
				lastMessage: "虽然是假的",
			},
			{
				id: 2,
				name: "测试群二号",
				avatar: "PD",
				members: 8,
				lastMessage: "虽然这也是假的",
			},
		],
	},
	{
		id: "social",
		name: "社交群组",
		collapsed: true,
		items: [
			{
				id: 3,
				name: "校友群",
				avatar: "AL",
				members: 32,
				lastMessage: "周末聚会报名开始",
			},
		],
	},
]);

const filteredFriendGroups = computed(() => {
	const query = searchQuery.value.toLowerCase();
	return friendGroups.value
		.map((group) => ({
			...group,
			items: group.items.filter((friend) =>
				friend.name.toLowerCase().includes(query)
			),
		}))
		?.filter((group) => group.items.length > 0);
});

const filteredGroupCategories = computed(() => {
	const query = searchQuery.value.toLowerCase();
	return groupCategories.value
		.map((category) => ({
			...category,
			items: category.items.filter((group) =>
				group.name.toLowerCase().includes(query)
			),
		}))
		.filter((category) => category.items.length > 0);
});

const toggleGroup = (groupId) => {
	const group = friendGroups.value.find((g) => g.id === groupId);
	if (group) group.collapsed = !group.collapsed;
};

const toggleCategory = (categoryId) => {
	const category = groupCategories.value.find((c) => c.id === categoryId);
	if (category) category.collapsed = !category.collapsed;
};

const truncateText = (text, length, useEllipsis = true) => {
	if (text.length <= length) return text;
	return useEllipsis
		? text.substring(0, length) + "..."
		: text.substring(0, length);
};
</script>

<template>
	<div class="h-full flex flex-col bg-white dark:bg-gray-800 transition-colors duration-200">
		<div class="p-4">
			<div class="mt-2 flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
				<Search class="text-gray-500 dark:text-gray-400 w-5 h-5" />
				<input
					v-model="searchQuery"
					type="text"
					:placeholder="
						activeTab === 'friends'
						? '搜索好友...'
						: '搜索群聊...'
					"
					class="flex-1 bg-transparent focus:outline-none text-sm dark:text-gray-200"
				/>
				<button class="cursor-pointer w-auth flex items-center justify-center space-x-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
					<UserPlus class="w-5 h-5" />
				</button>
			</div>
		</div>

		<div class="bg-white w-auto dark:bg-gray-800">
			<div class="flex border-b border-gray-200 dark:border-gray-700">
				<button
					@click="activePage = 'pending'"
					class="cursor-pointer text-blue-500 flex p-4 text-sm font-medium transition-colors justify-between w-full"
				>
					<span>好友信息</span>
					<ChevronRight />
				</button>
			</div>
		</div>

		<div class="h-full flex flex-col bg-white dark:bg-gray-800">
			<div class="flex border-b border-gray-200 dark:border-gray-700">
				<button
					v-for="tab in tabs"
					:key="tab.id"
					@click="activeTab = tab.id"
					class="flex-1 p-4 text-sm font-medium transition-colors"
					:class="
						{
							'text-blue-500 border-b-2 border-blue-500':
								activeTab === tab.id,
							'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700':
								activeTab !== tab.id,
						}
					"
				>
					{{ tab.label }}
				</button>
			</div>

			<div class="flex-1 overflow-y-auto p-4">
				<template v-if="activeTab === 'friends'">
					<div
						v-for="group in filteredFriendGroups"
						:key="group.id"
						class="mb-6"
					>
						<div class="flex items-center justify-between mb-3">
							<h3 class="font-medium text-gray-700 dark:text-gray-300">
								{{
									group
									.name
								}} ({{
									group
									.items
									.length
								}})
							</h3>
							<button
								@click="
									toggleGroup(
										group.id,
									)
								"
								class="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
							>
								<ChevronDown
									class="w-5 h-5 transform transition-transform"
									:class="
										{
											'rotate-180':
												!group
													.collapsed,
										}
									"
								/>
							</button>
						</div>

						<div v-show="!group.collapsed" class="space-y-2">
							<div
								v-for="friend in group.items"
								:key="friend.id"
								class="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
							>
								<div class="relative flex-shrink-0">
									<div class="w-10 h-10 bg-blue-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
										<span
											class="text-gray-600 dark:text-gray-300 font-medium"
										>
											{{
												truncateText(
													friend
														.avatar,
													2,
													false,
												)
											}}
										</span>
									</div>
									<div
										v-if="
											friend
											.online
										"
										class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"
									/>
								</div>
								<div class="ml-3 flex-1 min-w-0">
									<div class="font-medium text-gray-700 dark:text-gray-300 truncate">
										{{
											truncateText(
												friend
													.name,
												6,
											)
										}}
									</div>
									<div class="text-sm text-gray-500 dark:text-gray-400">
										{{
											friend
											.status
										}}
									</div>
								</div>
							</div>
						</div>
					</div>
				</template>

				<template v-if="activeTab === 'groups'">
					<div
						v-for="category in filteredGroupCategories"
						:key="category.id"
						class="mb-6"
					>
						<div class="flex items-center justify-between mb-3">
							<h3 class="font-medium text-gray-700 dark:text-gray-300">
								{{
									category
									.name
								}} ({{
									category
									.items
									.length
								}})
							</h3>
							<button
								@click="
									toggleCategory(
										category.id,
									)
								"
								class="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
							>
								<ChevronDown
									class="w-5 h-5 transform transition-transform"
									:class="
										{
											'rotate-180':
												!category
													.collapsed,
										}
									"
								/>
							</button>
						</div>

						<div v-show="!category.collapsed" class="space-y-2">
							<div
								v-for="group in category.items"
								:key="group.id"
								class="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
							>
								<div class="relative flex-shrink-0">
									<div class="w-10 h-10 bg-blue-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
										<span
											class="text-gray-600 dark:text-gray-300 font-medium"
										>
											{{
												truncateText(
													group
														.avatar,
													2,
													false,
												)
											}}
										</span>
									</div>
								</div>

								<div class="ml-3 flex-1 min-w-0">
									<div class="font-medium text-gray-700 dark:text-gray-300 truncate mb-1">
										{{
											truncateText(
												group
													.name,
												6,
											)
										}}
									</div>

									<div class="flex items-center justify-between">
										<div class="text-sm text-gray-500 dark:text-gray-400 truncate">
											{{
												truncateText(
													group
														.lastMessage
														|| "暂无消息",
													6,
												)
											}}
										</div>
										<div class="text-sm text-gray-400 dark:text-gray-500 ml-2 whitespace-nowrap">
											{{
												group
												.members
											}}人
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</template>
			</div>

			<div class="p-4 border-t border-gray-200 dark:border-gray-700">
				<button class="w-full flex items-center justify-center space-x-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
					<Plus class="w-5 h-5" />
					<span>{{
						activeTab === "friends"
						? "新建分组"
						: "新建分类"
					}}</span>
				</button>
			</div>
		</div>
	</div>
</template>
