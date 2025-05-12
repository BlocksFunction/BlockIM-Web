import { useCookie } from "@/lib/useTools.ts";
import Auth from "@/router/modules/Auth.ts";
import ChatView from "@/views/ChatView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "Chat",
			component: ChatView,
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

		if (token && clientId) {
			next();
		} else {
			next({ name: "Login" });
		}
	}
});

export default router;
