import useCookie from "@/lib/tool/useTools/useCookie";
import Auth from "@/router/modules/Auth";
import ChatView from "@/views/ChatView.vue";
import TestPage from "@/views/TestPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Chat",
      component: ChatView,
    },
    {
      path: "/t",
      name: "Test",
      component: TestPage,
    },
    ...Auth,
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === "Login" || to.name === "Register") {
    next();
  } else {
    const token = useCookie("token", "");
    const clientId = useCookie("clientId", "");

    if (token.cookie.value != "" && clientId.cookie.value != "") {
      next();
    } else {
      next({ name: "Login" });
    }
  }
});

export default router;
