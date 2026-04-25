"use client";

import { PortfolioData, Project } from "@/types/portfolio";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type LoginForm = { email: string; password: string };

const emptyLogin: LoginForm = {
  email: "",
  password: "",
};

export default function AdminPage() {
  const [loginForm, setLoginForm] = useState<LoginForm>(emptyLogin);
  const [isAuthed, setIsAuthed] = useState(false);
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const response = await fetch("/api/admin/portfolio", { cache: "no-store" });
    if (!response.ok) {
      setIsAuthed(false);
      return;
    }

    const payload = (await response.json()) as PortfolioData;
    setPortfolio(payload);
    setIsAuthed(true);
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm),
    });
    const payload = (await response.json()) as { message?: string };

    if (!response.ok) {
      setFeedback(payload.message ?? "Login failed.");
      return;
    }

    await checkAuth();
    setFeedback("Login successful.");
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthed(false);
    setPortfolio(null);
    setFeedback("Logged out.");
  }

  async function handleSave() {
    if (!portfolio) return;

    const response = await fetch("/api/admin/portfolio", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(portfolio),
    });
    const payload = (await response.json()) as { message?: string };

    if (!response.ok) {
      setFeedback(payload.message ?? "Failed to save changes.");
      return;
    }

    setFeedback("Portfolio updated successfully.");
  }

  function updateProject(index: number, key: keyof Project, value: string) {
    if (!portfolio) return;
    const next = structuredClone(portfolio);
    if (key === "stack") {
      next.projects[index].stack = value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    } else {
      (next.projects[index][key] as string) = value;
    }
    setPortfolio(next);
  }

  if (!isAuthed) {
    return (
      <main className="container-max py-10">
        <section className="glass mx-auto max-w-lg rounded-3xl p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Admin</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-100">Portfolio Dashboard Login</h1>
          <p className="mt-3 text-sm text-slate-300">
            Authorized account: <strong>asifnawazsharif3@gmail.com</strong>
          </p>
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="email"
              value={loginForm.email}
              onChange={(event) => setLoginForm((prev) => ({ ...prev, email: event.target.value }))}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-slate-100"
              placeholder="Admin email"
            />
            <input
              type="password"
              value={loginForm.password}
              onChange={(event) =>
                setLoginForm((prev) => ({ ...prev, password: event.target.value }))
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-slate-100"
              placeholder="Admin password"
            />
            <button
              type="submit"
              className="rounded-full bg-accent px-5 py-3 font-medium text-slate-950"
            >
              Login
            </button>
          </form>
          {feedback ? <p className="mt-4 text-sm text-rose-400">{feedback}</p> : null}
          <Link href="/" className="mt-6 inline-block text-sm text-accent hover:underline">
            Back to portfolio
          </Link>
        </section>
      </main>
    );
  }

  if (!portfolio) {
    return <main className="container-max py-10 text-slate-200">Loading dashboard...</main>;
  }

  return (
    <main className="container-max space-y-8 py-10 pb-20">
      <section className="glass rounded-3xl p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          Admin Dashboard
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-100">Manage Portfolio Content</h1>
        <p className="mt-2 text-sm text-slate-300">
          Logged in as <strong>asifnawazsharif3@gmail.com</strong>
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={handleSave}
            className="rounded-full bg-accent px-5 py-3 font-medium text-slate-950"
          >
            Save All Changes
          </button>
          <button
            onClick={handleLogout}
            className="rounded-full border border-slate-700 px-5 py-3 text-slate-200"
          >
            Logout
          </button>
          <Link href="/" className="rounded-full border border-slate-700 px-5 py-3 text-slate-200">
            View Portfolio
          </Link>
        </div>
        {feedback ? <p className="mt-4 text-sm text-emerald-400">{feedback}</p> : null}
      </section>

      <section className="glass rounded-3xl p-8 space-y-4">
        <h2 className="text-xl font-semibold text-slate-100">Hero Content</h2>
        <input
          value={portfolio.title}
          onChange={(event) => setPortfolio((prev) => (prev ? { ...prev, title: event.target.value } : prev))}
          className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-slate-100"
          placeholder="Portfolio title"
        />
        <textarea
          value={portfolio.summary}
          onChange={(event) =>
            setPortfolio((prev) => (prev ? { ...prev, summary: event.target.value } : prev))
          }
          rows={4}
          className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-slate-100"
          placeholder="Portfolio summary"
        />
      </section>

      <section className="glass rounded-3xl p-8 space-y-4">
        <h2 className="text-xl font-semibold text-slate-100">Skills (comma-separated)</h2>
        <textarea
          value={portfolio.skills.join(", ")}
          onChange={(event) =>
            setPortfolio((prev) =>
              prev
                ? {
                    ...prev,
                    skills: event.target.value
                      .split(",")
                      .map((item) => item.trim())
                      .filter(Boolean),
                  }
                : prev,
            )
          }
          rows={4}
          className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-slate-100"
        />
      </section>

      <section className="glass rounded-3xl p-8 space-y-5">
        <h2 className="text-xl font-semibold text-slate-100">Projects</h2>
        {portfolio.projects.map((project, index) => (
          <article key={`${project.title}-${index}`} className="rounded-2xl border border-slate-700 p-4 space-y-3">
            <input
              value={project.title}
              onChange={(event) => updateProject(index, "title", event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-slate-100"
              placeholder="Project title"
            />
            <textarea
              value={project.summary}
              onChange={(event) => updateProject(index, "summary", event.target.value)}
              rows={2}
              className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-slate-100"
              placeholder="Project summary"
            />
            <textarea
              value={project.impact}
              onChange={(event) => updateProject(index, "impact", event.target.value)}
              rows={2}
              className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-slate-100"
              placeholder="Project impact"
            />
            <input
              value={project.stack.join(", ")}
              onChange={(event) => updateProject(index, "stack", event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-slate-100"
              placeholder="Stack: React.js, Next.js, TypeScript"
            />
          </article>
        ))}
      </section>
    </main>
  );
}
