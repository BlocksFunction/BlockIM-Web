"use server";
import { getCookie, setCookie } from "@/actions/cookie";

export async function getUserInfo() {
	const tokenCookie = await getCookie("token");
	const clientIdCookie = await getCookie("clientId");
	if (tokenCookie && clientIdCookie) {
		return {
			token: tokenCookie,
			clientId: clientIdCookie,
		};
	}
	return null;
}

export async function setUserInfo(token: string, clientId: string) {
	await setCookie("token", token);
	await setCookie("clientId", clientId);
}
