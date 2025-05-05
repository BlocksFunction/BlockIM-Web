import { getTheme } from "@/actions/theme";
import RegisterForm from "@/componets/Auth/RegisterForm";
import Welcome from "@/componets/Auth/Welcome";
import SwitchTheme from "@/componets/SwitchTheme";
import Link from "next/link";

export default async function RegisterPage() {
	return (
		<div className={`flex w-full h-screen overflow-hidden`}>
			<SwitchTheme />
			<Welcome />
			<div className="w-full md:w-1/2 bg-gray-50 dark:bg-[#1c2735ff] flex items-center justify-center">
				<div className="w-full max-w-sm mx-4 md:mx-0">
					<h1 className="text-4xl font-medium mb-8 text-center bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">
						注册
					</h1>
					<RegisterForm />
					<div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
						<p>
							已经有了账号？
							<Link
								href="/auth/login"
								className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 ml-1"
							>
								前去登录
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
