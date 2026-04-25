"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { contactSchema } from "@/lib/validations";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const contactList = useMemo(() => portfolioData.contacts, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Please check your input.";
      setStatus("error");
      setFeedback(firstError);
      return;
    }

    try {
      setStatus("sending");
      setFeedback("");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      const payload = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(payload.message ?? "Unable to send your message right now.");
      }

      setStatus("success");
      setFeedback(payload.message ?? "Message sent successfully.");
      setForm(initialForm);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Request failed.";
      setStatus("error");
      setFeedback(message);
    }
  }

  return (
    <main className="container-max space-y-8 py-10 pb-20">
      <header className="glass rounded-3xl p-8 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          Contact Asif
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-50 md:text-4xl">Let us Connect</h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          Looking for a frontend developer who can deliver scalable, production-ready UI? Send a
          message and I will get back to you quickly.
        </p>
        <Link href="/" className="mt-6 inline-block text-sm text-accent hover:underline">
          Back to Portfolio
        </Link>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <form onSubmit={onSubmit} className="glass space-y-4 rounded-3xl p-6 md:p-8">
          <label className="block space-y-2">
            <span className="text-sm text-slate-300">Name</span>
            <input
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none ring-accent transition focus:ring-1"
              placeholder="Your name"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-slate-300">Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none ring-accent transition focus:ring-1"
              placeholder="you@company.com"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-slate-300">Subject</span>
            <input
              value={form.subject}
              onChange={(event) => setForm((prev) => ({ ...prev, subject: event.target.value }))}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none ring-accent transition focus:ring-1"
              placeholder="Role discussion"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm text-slate-300">Message</span>
            <textarea
              value={form.message}
              onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
              rows={6}
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none ring-accent transition focus:ring-1"
              placeholder="Share project details, timeline, and requirements."
            />
          </label>
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full bg-accent px-5 py-3 font-medium text-slate-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
          {feedback ? (
            <p className={status === "success" ? "text-emerald-400" : "text-rose-400"}>{feedback}</p>
          ) : null}
        </form>

        <aside className="glass space-y-4 rounded-3xl p-6 md:p-8">
          <h2 className="text-xl font-semibold text-slate-100">Direct Contact</h2>
          <p className="text-sm text-slate-300">
            You can also reach me directly through email, phone, or LinkedIn.
          </p>
          <div className="space-y-3">
            {contactList.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                className="block rounded-xl border border-slate-700 p-3 text-slate-200 transition hover:border-accent hover:text-accent"
              >
                {contact.label}
              </a>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
