<script setup lang="ts">
import ChatInterface from "@/components/Chat/ChatInterface.vue";
import FriendList from "@/components/Chat/FriendList.vue";
import FriendInterface from "@/components/Friend/FriendInterface.vue";
import Dexie from "dexie";
import {
	MessageCircle,
	MessageCircleMore,
	Settings,
	Users,
} from "lucide-vue-next";
import { ref } from "vue";

interface Category {
	id: string;
	name: string;
	collapsed: boolean;
}

interface GroupItem {
	id: number;
	categoryId: string;
	name: string;
	avatar: string;
	members: number;
	lastMessage: string;
}

class GroupDatabase extends Dexie {
	categories: Dexie.Table<Category, string>;
	groupItems: Dexie.Table<GroupItem, number>;

	constructor() {
		super("GroupDatabase");
		this.version(1).stores({
			categories: "id",
			groupItems: "id",
		});
		this.categories = this.table("categories");
		this.groupItems = this.table("groupItems");
	}
}

const db = new GroupDatabase();

const groupCategories = [
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
];

// 插入分类数据
db.categories.bulkAdd(
	groupCategories.map(category => ({
		id: category.id,
		name: category.name,
		collapsed: category.collapsed,
	})),
).then(() => {
	console.log("Categories added successfully");
}).catch((error) => {
	console.error("Error adding categories:", error);
});

// 插入群组数据
db.groupItems.bulkAdd(
	groupCategories.flatMap(category =>
		category.items.map(item => ({
			id: item.id,
			categoryId: category.id,
			name: item.name,
			avatar: item.avatar,
			members: item.members,
			lastMessage: item.lastMessage,
		}))
	),
).then(() => {
	console.log("Group items added successfully");
}).catch((error) => {
	console.error("Error adding group items:", error);
});

const currentPage = ref("chat");
</script>

<template>
	<div class="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
		<div class="flex h-screen">
			<aside class="w-20 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col flex-none items-center py-4 space-y-4">
				<button
					class="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
					@click="currentPage = 'chat'"
				>
					<MessageCircle class="text-gray-600 dark:text-gray-300" />
				</button>
				<button
					class="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
					@click="currentPage = 'friend'"
				>
					<Users
						class="text-gray-600 dark:text-gray-300"
						:size="24"
					/>
				</button>
				<button class="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
					<MessageCircleMore
						class="text-gray-600 dark:text-gray-300"
						:size="24"
					/>
				</button>
				<button class="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
					<Settings
						class="text-gray-600 dark:text-gray-300"
						:size="24"
					/>
				</button>
			</aside>
			<template v-if="currentPage === 'chat'">
				<FriendList />
				<ChatInterface />
			</template>

			<template v-if="currentPage === 'friend'">
				<FriendInterface />
			</template>
		</div>
	</div>
</template>
