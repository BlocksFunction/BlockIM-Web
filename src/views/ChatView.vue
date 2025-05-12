<script setup lang="ts">
import ChatInterface from "@/components/Chat/ChatInterface.vue";
import FriendList from "@/components/Chat/FriendList.vue";
import SwitchTheme from "@/components/SwitchTheme.vue";
import { useChatState } from "@/stores/useChatState.ts";
import { MessageCircle, Settings, Users } from "lucide-vue-next";
import { ref } from "vue";

const showChatInterface = ref(true);
const showFriends = ref(false);
</script>

<template>
	<div class="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
		<div class="flex h-screen">
			<aside class="w-20 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col flex-none items-center py-4 space-y-4">
				<button
					class="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
					@click="
						() => {
							showChatInterface = true;
							showFriends = false;
						}
					"
				>
					<MessageCircle class="text-gray-600 dark:text-gray-300" />
				</button>
				<button
					class="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
					@click="
						() => {
							showChatInterface = false;
							showFriends = true;
						}
					"
				>
					<Users
						class="text-gray-600 dark:text-gray-300"
						:size="24"
					/>
				</button>
				<button class="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
					<MessageCircle
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
			<FriendList v-if="showChatInterface" />
			<ChatInterface v-if="showChatInterface" />
			<p v-if="showFriends">a</p>
		</div>
	</div>
</template>
