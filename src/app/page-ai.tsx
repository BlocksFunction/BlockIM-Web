import { getTheme } from "@/actions/theme";
import { getUserInfo } from "@/actions/user-info";
import SwitchTheme from "@/componets/SwitchTheme";
import { MessageSquare, Plus, User } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ChatPage() {
	const theme = await getTheme();
	const userInfo = await getUserInfo();
	if (!userInfo) {
		redirect("/auth/login");
	}
	return (
		<div
			className={`min-h-screen ${theme} bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}
		>
			<div className="flex h-screen">
				<aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
					<div className="p-6 border-b border-gray-200 dark:border-gray-700">
						<div className="flex items-center justify-center mb-4">
							<div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
								<User
									size={28}
									className="text-gray-600 dark:text-gray-300"
								/>
							</div>
						</div>
						<div className="text-center">
							<p className="font-medium text-gray-700 dark:text-gray-200 truncate">
								{userInfo.name}
							</p>
							<p className="text-sm text-gray-500 dark:text-gray-400 truncate">
								{userInfo.email}
							</p>
						</div>
					</div>

					<div className="flex-1 p-4 overflow-y-auto">
						<button className="w-full mb-2 px-4 py-3 flex items-center space-x-3 rounded-lg bg-blue-100 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors">
							<Plus
								size={20}
								className="text-blue-500 dark:text-blue-400"
							/>
							<span className="text-gray-700 dark:text-gray-200">
								创建一个新的对话
							</span>
						</button>

						<div className="mt-6">
							<h3 className="px-2 text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
								对话历史
							</h3>
							<div className="space-y-1">
								{[1, 2, 3].map((item) => (
									<button
										key={item}
										className="w-full px-3 py-2 flex items-center space-x-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
									>
										<MessageSquare
											size={16}
											className="text-gray-500 dark:text-gray-400"
										/>
										<span className="text-gray-600 dark:text-gray-300">
											聊天 {item}
										</span>
									</button>
								))}
							</div>
						</div>
					</div>
				</aside>

				<main className="flex-1 flex flex-col">
					<div className="flex justify-end p-4">
						<SwitchTheme />
					</div>

					<div className="flex-1 flex flex-col items-center justify-center p-8">
						<div className="max-w-2xl text-center space-y-4">
							<div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg inline-block">
								<MessageSquare
									size={48}
									className="text-blue-500 dark:text-blue-400"
								/>
							</div>
							<h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
								我今天能帮你什么吗？
							</h1>
							<p className="text-gray-500 dark:text-gray-400">
								开始一个新的对话或继续之前的对话
							</p>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
