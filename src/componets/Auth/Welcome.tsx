export const experimental_ppr = true;

export default function Welcome() {
	return (
		<div className="hidden md:block w-1/2 p-12 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
			<h1 className="text-5xl font-bold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent mb-8">
				BlockIm
			</h1>

			<h2 className="text-gray-600 leading-relaxed dark:text-gray-300 font-medium">
				<span className="text-xl">成熟不了一点的</span>
				<span className="font-extrabold text-3xl bg-gradient-to-t from-blue-800 to-blue-500 bg-clip-text text-transparent">
					聊天
				</span>
				<span className="text-xl">应用方案</span>
			</h2>
		</div>
	);
}
