<template>
  <div :class="`min-h-screen transition-colors duration-200 ${theme.bgClass}`">
    <div class="flex h-screen">
      <!-- Sidebar -->
      <aside
        class="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col"
      >
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-center mb-4">
            <div class="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
              <User size="28" class="text-gray-600 dark:text-gray-300" />
            </div>
          </div>
          <div class="text-center">
            <p class="font-medium text-gray-700 dark:text-gray-200 truncate">
              {{ getUserInfo().name }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
              {{ getUserInfo().email }}
            </p>
          </div>
        </div>

        <div class="flex-1 p-4 overflow-y-auto">
          <button
            class="w-full mb-2 px-4 py-3 flex items-center space-x-3 rounded-lg bg-blue-100 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Plus size="20" class="text-blue-500 dark:text-blue-400" />
            <span class="text-gray-700 dark:text-gray-200">
              创建一个新对话
            </span>
          </button>

          <div class="mt-6">
            <h3
              class="px-2 text-sm font-medium text-gray-500 dark:text-gray-400 mb-2"
            >
              对话历史
            </h3>
            <div class="space-y-1">
              <button
                v-for="item in 3"
                :key="item"
                class="w-full px-3 py-2 flex items-center space-x-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <MessageCircle
                  size="16"
                  class="text-gray-500 dark:text-gray-400"
                />
                <span class="text-gray-600 dark:text-gray-300">
                  {{ item }}号记录
                </span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      <main class="flex-1 flex flex-col dark:bg-gray-800 bg-white">
        <div class="flex justify-end p-4">
          <SwitchTheme />
        </div>

        <div class="flex-1 flex flex-col items-center justify-center p-8">
          <div class="max-w-2xl text-center space-y-4">
            <div
              class="p-4 bg-white dark:bg-gray-700 rounded-xl shadow-lg inline-block"
            >
              <MessageCircle
                size="48"
                class="text-blue-500 dark:text-blue-400"
              />
            </div>
            <h1 class="text-3xl font-bold text-gray-700 dark:text-gray-200">
              今天我能帮些什么?
            </h1>
            <p class="text-gray-500 dark:text-gray-400">
              开始一个新的对话或者继续之前的对话
            </p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import SwitchTheme from "@/components/SwitchTheme.vue";
import { MessageCircle, Plus, User } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const theme = ref({ bgClass: "bg-gray-50" });
const userInfo = ref(null);

const getUserInfo = () => {
  return { name: "Guest User", email: "guest@example.com" };
};

onMounted(async () => {
  const fetchedTheme = await getTheme();
  theme.value = fetchedTheme;

  const fetchedUserInfo = await getUserInfo();
  if (!fetchedUserInfo) {
    await router.push("/auth/login");
  } else {
    userInfo.value = fetchedUserInfo;
  }
});
</script>
