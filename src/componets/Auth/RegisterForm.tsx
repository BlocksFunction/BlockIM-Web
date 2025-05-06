"use client";
import { setUserInfo } from "@/actions/user-info";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface FormValues {
	username: string;
	email: string;
	password: string;
	isSubmitting: boolean;
}

interface RegisterAPI {
	status: string;
	clientId?: string;
	token?: string;
}

function handleSubmit(
	event: React.FormEvent,
	formValues: FormValues,
	setFormValuesFunction: React.Dispatch<React.SetStateAction<FormValues>>,
) {
	event.preventDefault();
	setFormValuesFunction((prev) => ({
		...prev,
		isSubmitting: true,
	}));

	axios
		.post<RegisterAPI>("http://localhost:8080/api/auth/register", {
			username: formValues.username,
			password: formValues.password,
		})
		.then(async (response) => {
			await setUserInfo(
				response.data.token ?? "",
				response.data.clientId ?? "",
			);
			redirect("/");
		})
		.catch((error) => {
			toast.error("发送了一些错误", {
				description: error.response.data.reason
					?? "未知错误, 请联系网站管理员",
			});
		})
		.finally(() => {
			setFormValuesFunction((prev) => ({
				...prev,
				isSubmitting: false,
			}));
		});
}

export default function RegisterForm() {
	const [formValues, setFormValues] = useState<FormValues>({
		username: "",
		email: "",
		password: "",
		isSubmitting: false,
	});

	return (
		<form
			onSubmit={(event) => handleSubmit(event, formValues, setFormValues)}
			className="space-y-6"
		>
			<div>
				<label
					htmlFor="userid"
					className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300"
				>
					帐号名称
				</label>
				<input
					id="userid"
					type="text"
					value={formValues.username}
					onChange={(e) =>
						setFormValues((prev) => ({
							...prev,
							username: e.target.value,
						}))}
					className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg w-full py-3 px-4 text-gray-700 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					placeholder="请输入帐号名称"
					required
				/>
			</div>

			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300"
				>
					邮箱
				</label>
				<input
					id="email"
					type="text"
					value={formValues.email}
					onChange={(e) =>
						setFormValues((prev) => ({
							...prev,
							email: e.target.value,
						}))}
					className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg w-full py-3 px-4 text-gray-700 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					placeholder="请输入邮箱地址"
					required
				/>
			</div>

			<div>
				<label
					htmlFor="password"
					className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300"
				>
					密码
				</label>
				<input
					id="password"
					type="password"
					value={formValues.password}
					onChange={(e) =>
						setFormValues((prev) => ({
							...prev,
							password: e.target.value,
						}))}
					className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg w-full py-3 px-4 text-gray-700 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					placeholder="请输入密码"
					required
				/>
			</div>

			<button
				type="submit"
				disabled={formValues.isSubmitting}
				className="cursor-pointer bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full focus:ring-4 focus:ring-blue-300 hover:bg-blue-800 transition-colors dark:focus:ring-blue-800 disabled:opacity-50"
			>
				{formValues.isSubmitting ? "注册中..." : "注册"}
			</button>
		</form>
	);
}
