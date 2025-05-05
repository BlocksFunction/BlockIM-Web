"use client";
import { sendMail } from '@/actions/mail';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface FormValues {
	email: string;
	password: string;
	isSubmitting: boolean;
}

export default function LostPasswordForm() {
	const [formValues, setFormValues] = useState<FormValues>({
		email: "",
		password: "",
		isSubmitting: false,
	});

	const [canSendEmail, setCanSendEmail] = useState(false);

	useEffect(() => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		setCanSendEmail(emailRegex.test(formValues.email));
	}, [formValues.email]);

	function handleSubmit(
		formValues: FormValues,
		setFormValuesFunction: React.Dispatch<React.SetStateAction<FormValues>>,
	) {
		setFormValuesFunction((prev) => ({
			...prev,
			isSubmitting: true,
		}));

		// axios
		// 	.post<LoginAPI>("http://localhost:8080/api/auth/login", {
		// 		openid: formValues.email,
		// 		password: formValues.password,
		// 	})
		// 	.then((response) => {
		// 		console.log(response.data);
		// 		setCookie("clientId", response.data.clientId ?? "").then(
		// 			(r) => {
		// 				console.log(r);
		// 			},
		// 		);
		// 	})
		// 	.catch((error) => {
		// 		toast.error("发送了一些错误", {
		// 			description: error.response.data.reason
		// 				?? "未知错误, 请联系网站管理员",
		// 		});
		// 	})
		// 	.finally(() => {
		// 		setFormValuesFunction((prev) => ({
		// 			...prev,
		// 			isSubmitting: false,
		// 		}));
		// 	});
	}

	async function sendCaptcha(email: string) {
		try {
			const respone = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/api/captcha/getCaptcha`,
			);

			if (respone.data.code) {
				const to = `${email}`;
				const subject = "BlockIm - 找回密码";

				const html = `<h1>你的验证码是</h1><p>${respone.data.code}</p>`;
				await sendMail({ to, subject, html });
			}
		} catch (error: any) {
			toast.error("发送了一些错误", {
				description: error.response.data.reason
					?? "未知错误, 请联系网站管理员",
			});
		} finally {
			setCanSendEmail(true);
		}
	}

	return (
		<form
			onSubmit={(event) => event.preventDefault()}
			className="space-y-6"
		>
			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300"
				>
					邮箱
				</label>
				<input
					id="email"
					type="email"
					value={formValues.email}
					onChange={(e) =>
						setFormValues((prev) => ({
							...prev,
							email: e.target.value,
						}))}
					className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg w-full py-3 px-4 text-gray-700 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					placeholder="请输入绑定帐号的邮箱"
					required
				/>
			</div>

			<div>
				<label
					htmlFor="password"
					className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300"
				>
					验证码
				</label>
				<div className={"flex items-center gap-0.5"}>
					<input
						id="password"
						type="password"
						value={formValues.password}
						onChange={(e) =>
							setFormValues((prev) => ({
								...prev,
								password: e.target.value,
							}))}
						className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-tl-lg rounded-bl-lg w-full py-3 px-4 text-gray-700 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						placeholder="请输入验证码"
						required
						disabled={!canSendEmail}
					/>
					<button
						type="button"
						className={"cursor-pointer w-35 py-3 px-2 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium rounded-tr-lg rounded-br-lg ml-0 text-sm text-center focus:ring-4 focus:ring-blue-300 hover:bg-blue-800 transition-colors dark:focus:ring-blue-800 disabled:opacity-50"}
						onClick={event => sendCaptcha(formValues.email)}
						disabled={!canSendEmail}
					>
						发送验证码
					</button>
				</div>
			</div>

			<button
				type="submit"
				onClick={event => handleSubmit(formValues, setFormValues)}
				className="cursor-pointer bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full focus:ring-4 focus:ring-blue-300 hover:bg-blue-800 transition-colors dark:focus:ring-blue-800 disabled:opacity-50"
			>
				{formValues.isSubmitting ? "登录中..." : "登录"}
			</button>
		</form>
	);
}
