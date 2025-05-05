"use server";
import nodemailer from "nodemailer";

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NEXT_PUBLIC_EMAIL_TO } =
	process.env;

export async function sendMail({
	to,
	subject,
	html,
}: {
	to: string;
	subject: string;
	html: string;
}) {
	const transporter = nodemailer.createTransport({
		host: SMTP_HOST,
		port: Number(SMTP_PORT),
		secure: true,
		auth: {
			user: SMTP_USER,
			pass: SMTP_PASS,
		},
	});

	try {
		await transporter.sendMail({
			from: NEXT_PUBLIC_EMAIL_TO,
			to,
			subject,
			html,
		});
		return { success: true };
	} catch (err) {
		return { success: false, error: err };
	}
}
