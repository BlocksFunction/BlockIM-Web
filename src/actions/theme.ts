"use server";
import { getCookie, setCookie } from "@/actions/cookie";

export async function getTheme() {
	return (await getCookie("theme")) ?? "light";
}

export async function toggleTheme(newTheme: string) {
	await setCookie("theme", newTheme);
	return newTheme;
}
