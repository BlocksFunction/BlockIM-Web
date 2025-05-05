## 开始使用

首先，运行开发服务器：

```bash
bun dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看效果。

你可以通过修改 `app/page.tsx` 文件来编辑页面内容，页面会随着文件的修改自动更新。

该项目使用 [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) 自动优化并加载 [Geist](https://vercel.com/font) 字体，这是一种为 Vercel 设计的新字体系列。

## 环境变量配置

在项目根目录下创建一个名为 `.env.local` 的文件，并添加以下内容：

```plaintext
SMTP_HOST=<SMTP服务器地址>
SMTP_PORT=<SMTP服务器端口>
SMTP_USER=<你的邮箱地址>
SMTP_PASS=<你的邮箱授权码>
NEXT_PUBLIC_EMAIL_FROM=<你的邮箱地址>
NEXT_PUBLIC_API_URL=<后端部署地址>
```

**注意事项：**

* 请确保 `.env.local` 文件没有被包含在版本控制系统中（如 Git），以避免泄露敏感信息。