import { getTheme } from "@/actions/theme";
import LoginForm from "@/componets/Auth/LoginForm";
import Welcome from "@/componets/Auth/Welcome";
import SwitchTheme from "@/componets/SwitchTheme";
import Link from "next/link";

export default async function LoginPage() {
	return (
		<div className={`flex w-full h-screen overflow-hidden`}>
			<SwitchTheme />
			<Welcome />
			<div className="w-full md:w-1/2 bg-gray-50 dark:bg-[#1c2735ff] flex items-center justify-center">
				<div className="w-full max-w-sm mx-4 md:mx-0">
					<h1 className="cursor-pointer text-4xl font-medium mb-8 text-center bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">
						登录
					</h1>
					<LoginForm />
					<div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
						<p>
							还没有账号？
							<Link
								href="/auth/register"
								className="cursor-pointer text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 ml-1"
							>
								立即注册
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
