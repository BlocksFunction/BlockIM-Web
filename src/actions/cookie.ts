"use server";
import { cookies } from "next/headers";

export async function getCookie(name: string) {
	try {
		const cookieStore = await cookies();
		const cookie = cookieStore.get(name);
		return cookie?.value;
	} catch (error) {
		console.error("获取 cookie 失败:", error);
		return undefined;
	}
}

export async function setCookie(name: string, value: string) {
	try {
		const cookieStore = await cookies();
		cookieStore.set(name, value);
		return true;
	} catch (error) {
		console.error("设置 cookie 失败:", error);
		return false;
	}
}
