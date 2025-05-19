<script setup lang="ts">
import ChatInterface from "@/components/Chat/ChatInterface.vue";
import FriendInterface from "@/components/Friend/FriendInterface.vue";
import {
	MessageCircle,
	MessageCircleMore,
	Settings,
	Users,
} from "lucide-vue-next";
import { ref } from "vue";

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
