import LostPasswordForm from "@/componets/Auth/LostPasswordForm";
import Welcome from "@/componets/Auth/Welcome";
import SwitchTheme from "@/componets/SwitchTheme";

export default async function LostPasswordPage() {
	return (
		<div className={`flex w-full h-screen overflow-hidden`}>
			<SwitchTheme />
			<Welcome />
			<div className="w-full md:w-1/2 bg-gray-50 dark:bg-[#1c2735ff] flex items-center justify-center">
				<div className="w-full max-w-sm mx-4 md:mx-0">
					<h1 className="text-4xl font-medium mb-8 text-center bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">
						找回密码
					</h1>
					<LostPasswordForm />
				</div>
			</div>
		</div>
	);
}
