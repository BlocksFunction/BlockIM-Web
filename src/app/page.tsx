import { getUserInfo } from "@/actions/user-info";
import SwitchTheme from "@/componets/SwitchTheme";
import {
	File,
	Image,
	MessageCircle,
	Monitor,
	Paperclip,
	Phone,
	Send,
	Settings,
	Smile,
	User,
	UserPlus,
	Users,
	Video,
} from "lucide-react";
import { redirect } from "next/navigation";

export default async function ChatPage() {
	const userInfo = await getUserInfo();
	if (!userInfo) redirect("/auth/login");

	const friends = [
		{ id: 1, name: "1号人物", avatar: "A", online: true },
		{ id: 2, name: "2号人物", avatar: "B", online: true },
		{ id: 3, name: "3号人物", avatar: "C", online: false },
	];

	const posts = [
		{
			id: 1,
			author: "1号人物",
			content: "你猜说了什么",
			likes: 12,
		},
		{
			id: 2,
			author: "2号人物",
			content: "你猜说了什么",
			likes: 8,
		},
	];

	return (
		<div
			className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}
		>
			<div className="flex h-screen">
				<aside className="w-20 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center py-4 space-y-4">
					<button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
						<MessageCircle
							className="text-blue-500 dark:text-blue-400"
							size={24}
						/>
					</button>
					<button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
						<Users
							className="text-gray-600 dark:text-gray-300"
							size={24}
						/>
					</button>
					<button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
						<MessageCircle
							className="text-gray-600 dark:text-gray-300"
							size={24}
						/>
					</button>
					<button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
						<Settings
							className="text-gray-600 dark:text-gray-300"
							size={24}
						/>
					</button>
				</aside>

				<aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
					<div className="p-4 border-b border-gray-200 dark:border-gray-700">
						<h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
							好友
						</h2>
						<button className="mt-2 w-full flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
							<UserPlus size={18} className="text-blue-500" />
							<span className="text-gray-700 dark:text-gray-300">
								加个好友
							</span>
						</button>
					</div>

					<div className="flex-1 overflow-y-auto p-2">
						{friends.map((friend) => (
							<div
								key={friend.id}
								className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
							>
								<div className="relative">
									<div className="w-10 h-10 bg-blue-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
										<span className="text-gray-600 dark:text-gray-300">
											{friend.avatar}
										</span>
									</div>
									{friend.online && (
										<div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
									)}
								</div>
								<div className="ml-3">
									<p className="font-medium text-gray-700 dark:text-gray-200">
										{friend.name}
									</p>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										{friend.online ? "在线" : "离线"}
									</p>
								</div>
							</div>
						))}
					</div>
				</aside>

				<main className="flex-1 flex flex-col">
					<div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
						<div className="flex items-center space-x-4">
							<div className="flex items-center space-x-2">
								<Phone className="text-gray-600 dark:text-gray-300 hover:text-blue-500 cursor-pointer" />
								<Video className="text-gray-600 dark:text-gray-300 hover:text-blue-500 cursor-pointer" />
								<Monitor className="text-gray-600 dark:text-gray-300 hover:text-blue-500 cursor-pointer" />
							</div>
							<div className="flex items-center">
								<div className="w-10 h-10 bg-blue-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
									<User
										className="text-blue-500 dark:text-blue-400"
										size={20}
									/>
								</div>
								<div className="ml-3">
									<h2 className="font-semibold text-gray-800 dark:text-gray-200">
										群聊
									</h2>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										5人
									</p>
								</div>
							</div>
						</div>
						<SwitchTheme />
					</div>

					<div className="flex-1 overflow-y-auto p-4 space-y-4"></div>

					<div className="p-4 border-t border-gray-200 dark:border-gray-700">
						<div className="flex items-center space-x-2">
							<div className="relative group">
								<button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
									<Paperclip size={20} />
								</button>
								<div className="absolute bottom-full left-0 hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 min-w-[120px]">
									<button className="w-full flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
										<Image size={16} />
										<span>图片</span>
									</button>
									<button className="w-full flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
										<File size={16} />
										<span>文档</span>
									</button>
								</div>
							</div>
							<button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
								<Smile size={20} />
							</button>
							<input
								type="text"
								placeholder="说些什么..."
								className="flex-1 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:text-white"
							/>
							<button className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
								<Send size={20} />
							</button>
						</div>
					</div>
				</main>

				<aside className="w-64 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 h-full">
					<div className={"h-1/3"}>
						<div className="p-4 border-b border-gray-200 dark:border-gray-700">
							<h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
								公告
							</h2>
						</div>
						<div className="p-2 overflow-y-auto space-y-4">
							{posts.map((post) => (
								<div
									key={post.id}
									className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
								>
									<div className="flex items-center mb-2">
										<div className="w-8 h-8 bg-blue-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
											<User
												className="text-blue-500 dark:text-blue-400"
												size={16}
											/>
										</div>
										<span className="ml-2 font-medium text-gray-700 dark:text-gray-300">
											{post.author}
										</span>
									</div>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										{post.content}
									</p>
								</div>
							))}
						</div>
					</div>
					<div>
						<div className="p-4 border-b border-gray-200 dark:border-gray-700">
							<h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
								成员
							</h2>
						</div>
					</div>
				</aside>
			</div>
		</div>
	);
}
