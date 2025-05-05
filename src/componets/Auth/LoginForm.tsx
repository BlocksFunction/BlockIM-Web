"use client";
import { setUserInfo } from '@/actions/user-info';
import useTheme from '@/store/useTheme';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

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

export default function LoginForm() {
	const router = useRouter();
	const theme = useTheme();
	const [formValues, setFormValues] = useState<FormValues>({
		input: "",
		password: "",
		isSubmitting: false,
		inputType: "userid",
	});

	async function handleSubmit(
		formValues: FormValues,
		setFormValuesFunction: React.Dispatch<React.SetStateAction<FormValues>>,
	) {
		setFormValuesFunction((prev) => ({
			...prev,
			isSubmitting: true,
		}));

		try {
			const respone = await axios.post<LoginAPI>(
				`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
				formValues,
			);

			if (respone.data.token && respone.data.clientId) {
				await setUserInfo(respone.data.token, respone.data.clientId);
				router.push("/");
			}
		} catch (error: any) {
			toast.error("发送了一些错误", {
				description: error.response.data.reason
					?? "未知错误, 请联系网站管理员",
			});
		} finally {
			setFormValuesFunction((prev) => ({
				...prev,
				isSubmitting: false,
			}));
		}
	}

	return (
		<form
			onSubmit={(event) => event.preventDefault()}
			className="space-y-6"
		>
			<div>
				<label
					htmlFor="inputType"
					className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300"
				>
					登录方式
				</label>
				<select
					id="inputType"
					value={formValues.inputType}
					onChange={(e) =>
						setFormValues((prev) => ({
							...prev,
							inputType: e.target
								.value as FormValues["inputType"],
						}))}
					className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg w-full py-3 px-4 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				>
					<option value="userid">UserID</option>
					<option value="email">Email</option>
				</select>
			</div>
			<div>
				<label
					htmlFor="input"
					className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300"
				>
					{formValues.inputType === "userid" ? "UserID" : "Email"}
				</label>
				<input
					id="input"
					type={formValues.inputType === "userid" ? "text" : "email"}
					value={formValues.input}
					onChange={(e) =>
						setFormValues((prev) => ({
							...prev,
							input: e.target.value,
						}))}
					className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg w-full py-3 px-4 text-gray-700 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					placeholder={formValues.inputType === "userid"
						? "请输入UserID"
						: "请输入邮箱"}
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
				onClick={() => handleSubmit(formValues, setFormValues)}
				disabled={formValues.isSubmitting}
				className="bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full focus:ring-4 focus:ring-blue-300 hover:bg-blue-800 transition-colors dark:focus:ring-blue-800 disabled:opacity-50"
			>
				{formValues.isSubmitting ? "登录中..." : "登录"}
			</button>
		</form>
	);
}
