import { useCookie } from "@/lib/useTools";
import { defineStore } from "pinia";
import { computed } from "vue";

const useUser = defineStore("useUser", () => {
	const token = useCookie("token", "");
	const clientId = useCookie("clientId", "");

	const getToken = computed(() => token.cookie.value);
	const getClientId = computed(() => clientId.cookie.value);

	function setUser(tokenValue: string, clientIdValue: string) {
		token.cookie.value = tokenValue;
		clientId.cookie.value = clientIdValue;
	}
	function updateToken(tokenValue: string) {
		token.cookie.value = tokenValue;
	}
	function updateClientId(clientIdValue: string) {
		clientId.cookie.value = clientIdValue;
	}

	return {
		getToken,
		getClientId,
		setUser,
		updateToken,
		updateClientId,
	};
});

export default useUser;
