<script setup lang="ts">
import WelcomeComponent from "@/components/Auth/WelcomeComponent.vue";
import SwitchTheme from "@/components/SwitchTheme.vue";
import useUser from "@/stores/useUser.ts";
import { ofetch } from "ofetch";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

interface FormValues {
  input: string;
  password: string;
  isSubmitting: boolean;
  inputType: "userid" | "email";
}

interface LoginAPI {
  status: string;
  clientId?: string;
  token?: string;
}

const router = useRouter();
const user = useUser();
const formValues = ref<FormValues>({
  input: "",
  password: "",
  isSubmitting: false,
  inputType: "userid",
});

async function handleSubmit() {
  formValues.value.isSubmitting = true;

  try {
    const response = await ofetch<LoginAPI>("/api/auth/login", {
      method: "POST",
      body: {
        inputType: formValues.value.inputType,
        input: formValues.value.input,
        password: formValues.value.password,
      },
    });

    if (response.token && response.clientId) {
      user.setUser(response.token, response.clientId);
      await router.push("/");
    }
  } catch (error: any) {
    toast.error("发生了一些错误!", {
      description: error.data?.reason || "未知错误, 请联系网站管理员",
    });
  } finally {
    formValues.value.isSubmitting = false;
  }
}
</script>

<template>
  <div class="flex w-full h-screen overflow-hidden">
    <SwitchTheme class="fixed mt-5 right-0 mr-5" />
    <WelcomeComponent />
    <div
      class="w-full md:w-1/2 bg-gray-50 dark:bg-[#1c2735ff] flex items-center justify-center"
    >
      <div class="w-full max-w-sm mx-4 md:mx-0">
        <h1
          class="cursor-pointer text-4xl font-medium mb-8 text-center bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent"
        >
          登录
        </h1>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label
              for="inputType"
              class="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300"
            >
              登录方式
            </label>
            <select
              id="inputType"
              v-model="formValues.inputType"
              class="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg w-full py-3 px-4 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="userid">UserID</option>
              <option value="email">Email</option>
            </select>
          </div>

          <div>
            <label
              for="input"
              class="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300"
            >
              {{ formValues.inputType === "userid" ? "UserID" : "Email" }}
            </label>
            <input
              id="input"
              :type="formValues.inputType === 'userid' ? 'text' : 'email'"
              v-model="formValues.input"
              class="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg w-full py-3 px-4 text-gray-700 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :placeholder="
                formValues.inputType === 'userid'
                  ? '请输入UserID'
                  : '请输入邮箱'
              "
              required
            />
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300"
            >
              密码
            </label>
            <input
              id="password"
              type="password"
              v-model="formValues.password"
              class="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg w-full py-3 px-4 text-gray-700 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入密码"
              required
            />
          </div>

          <button
            type="submit"
            :disabled="formValues.isSubmitting"
            class="bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full focus:ring-4 focus:ring-blue-300 hover:bg-blue-800 transition-colors dark:focus:ring-blue-800 disabled:opacity-50"
          >
            {{ formValues.isSubmitting ? "登录中..." : "登录" }}
          </button>
        </form>

        <div class="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            还没有账号？
            <RouterLink
              to="/register"
              class="cursor-pointer text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 ml-1"
            >
              立即注册
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
