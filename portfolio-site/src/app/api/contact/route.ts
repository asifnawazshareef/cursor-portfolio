import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

const requestMap = new Map<string, number>();

function isRateLimited(key: string) {
  const now = Date.now();
  const last = requestMap.get(key) ?? 0;
  requestMap.set(key, now);
  return now - last < 15000;
}

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const key = forwarded?.split(",")[0]?.trim() || "local";

    if (isRateLimited(key)) {
      return NextResponse.json(
        { message: "Please wait a few seconds before trying again." },
        { status: 429 },
      );
    }

    const payload = await request.json();
    const parsed = contactSchema.safeParse(payload);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Invalid request";
      return NextResponse.json({ message: firstError }, { status: 400 });
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL ?? "asifnawazsharif3@gmail.com";

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      return NextResponse.json(
        {
          message:
            "Message received, but email service is not configured yet. Add SMTP env vars to enable delivery.",
        },
        { status: 503 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const { name, email, subject, message } = parsed.data;
    await transporter.sendMail({
      from: `"Portfolio Contact" <${SMTP_USER}>`,
      to: receiverEmail,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6">
          <h2>New portfolio inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Thanks for reaching out. Message sent successfully." });
  } catch {
    return NextResponse.json(
      { message: "Unexpected server error. Please try again." },
      { status: 500 },
    );
  }
}
