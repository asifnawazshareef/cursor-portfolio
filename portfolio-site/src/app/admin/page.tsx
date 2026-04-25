"use client";

import { ContactLink, Experience, PortfolioData, Project } from "@/types/portfolio";
import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaArrowRotateRight, FaCloudArrowUp, FaFloppyDisk, FaLock, FaRightFromBracket } from "react-icons/fa6";

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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    void checkAuth();
  }, []);

  async function checkAuth() {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/portfolio", { cache: "no-store" });
      if (!response.ok) {
        setIsAuthed(false);
        return;
      }

      const payload = (await response.json()) as PortfolioData;
      setPortfolio(payload);
      setIsAuthed(true);
    } catch {
      setFeedback("Unable to load admin data.");
      setIsAuthed(false);
    } finally {
      setLoading(false);
    }
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

    try {
      setSaving(true);
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
    } finally {
      setSaving(false);
    }
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

  function updateExperience(index: number, key: keyof Experience, value: string) {
    if (!portfolio) return;
    const next = structuredClone(portfolio);
    if (key === "highlights") {
      next.experiences[index].highlights = value
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
    } else {
      (next.experiences[index][key] as string) = value;
    }
    setPortfolio(next);
  }

  function updateContacts(value: string) {
    if (!portfolio) return;
    const next = structuredClone(portfolio);
    const lines = value.split("\n").map((line) => line.trim()).filter(Boolean);
    next.contacts = lines.map((line) => {
      const [label, href] = line.split("|").map((item) => item.trim());
      return { label: label || "Link", href: href || "#" } as ContactLink;
    });
    setPortfolio(next);
  }

  async function handleResumeUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setUploading(true);
      const response = await fetch("/api/admin/resume", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as { message?: string; resumeUrl?: string };

      if (!response.ok) {
        setFeedback(payload.message ?? "Resume upload failed.");
        return;
      }

      setPortfolio((prev) => (prev ? { ...prev, resumeUrl: payload.resumeUrl ?? prev.resumeUrl } : prev));
      setFeedback(payload.message ?? "Resume uploaded.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
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
              className="rounded-full bg-accent px-5 py-3 font-medium text-slate-950 inline-flex items-center gap-2"
            >
              <FaLock /> Login
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
    return (
      <main className="container-max py-10 text-slate-200">
        {loading ? "Loading dashboard..." : "Unable to load dashboard data."}
      </main>
    );
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
            disabled={saving}
            className="rounded-full bg-accent px-5 py-3 font-medium text-slate-950 inline-flex items-center gap-2 disabled:opacity-60"
          >
            <FaFloppyDisk /> {saving ? "Saving..." : "Save All Changes"}
          </button>
          <button
            onClick={() => void checkAuth()}
            className="rounded-full border border-slate-700 px-5 py-3 text-slate-200 inline-flex items-center gap-2"
          >
            <FaArrowRotateRight /> Refresh Data
          </button>
          <button
            onClick={handleLogout}
            className="rounded-full border border-slate-700 px-5 py-3 text-slate-200 inline-flex items-center gap-2"
          >
            <FaRightFromBracket /> Logout
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
          value={portfolio.name}
          onChange={(event) => setPortfolio((prev) => (prev ? { ...prev, name: event.target.value } : prev))}
          className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-slate-100"
          placeholder="Name"
        />
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
        <input
          value={portfolio.location}
          onChange={(event) => setPortfolio((prev) => (prev ? { ...prev, location: event.target.value } : prev))}
          className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-slate-100"
          placeholder="Location"
        />
        <input
          value={portfolio.availability}
          onChange={(event) =>
            setPortfolio((prev) => (prev ? { ...prev, availability: event.target.value } : prev))
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-slate-100"
          placeholder="Availability text"
        />
      </section>

      <section className="glass rounded-3xl p-8 space-y-4">
        <h2 className="text-xl font-semibold text-slate-100">Resume Upload & Preview</h2>
        <div className="flex flex-wrap items-center gap-4">
          <label className="rounded-full border border-slate-700 px-4 py-2 text-slate-200 cursor-pointer inline-flex items-center gap-2">
            <FaCloudArrowUp /> {uploading ? "Uploading..." : "Upload Resume PDF"}
            <input
              type="file"
              accept="application/pdf"
              onChange={handleResumeUpload}
              className="hidden"
            />
          </label>
          <a
            href={portfolio.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-slate-700 px-4 py-2 text-slate-200"
          >
            Open Current Resume
          </a>
        </div>
        <iframe
          title="Admin Resume Preview"
          src={portfolio.resumeUrl}
          className="h-[520px] w-full rounded-2xl border border-slate-700"
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

      <section className="glass rounded-3xl p-8 space-y-4">
        <h2 className="text-xl font-semibold text-slate-100">Qualifications (one per line)</h2>
        <textarea
          value={portfolio.qualifications.join("\n")}
          onChange={(event) =>
            setPortfolio((prev) =>
              prev
                ? {
                    ...prev,
                    qualifications: event.target.value
                      .split("\n")
                      .map((item) => item.trim())
                      .filter(Boolean),
                  }
                : prev,
            )
          }
          rows={6}
          className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-slate-100"
        />
      </section>

      <section className="glass rounded-3xl p-8 space-y-4">
        <h2 className="text-xl font-semibold text-slate-100">Key Contributions (one per line)</h2>
        <textarea
          value={portfolio.keyContributions.join("\n")}
          onChange={(event) =>
            setPortfolio((prev) =>
              prev
                ? {
                    ...prev,
                    keyContributions: event.target.value
                      .split("\n")
                      .map((item) => item.trim())
                      .filter(Boolean),
                  }
                : prev,
            )
          }
          rows={6}
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

      <section className="glass rounded-3xl p-8 space-y-5">
        <h2 className="text-xl font-semibold text-slate-100">Experiences</h2>
        {portfolio.experiences.map((item, index) => (
          <article key={`${item.company}-${index}`} className="rounded-2xl border border-slate-700 p-4 space-y-3">
            <input
              value={item.role}
              onChange={(event) => updateExperience(index, "role", event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-slate-100"
              placeholder="Role"
            />
            <input
              value={item.company}
              onChange={(event) => updateExperience(index, "company", event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-slate-100"
              placeholder="Company"
            />
            <input
              value={item.timeline}
              onChange={(event) => updateExperience(index, "timeline", event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-slate-100"
              placeholder="Timeline"
            />
            <textarea
              value={item.highlights.join("\n")}
              onChange={(event) => updateExperience(index, "highlights", event.target.value)}
              rows={4}
              className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-slate-100"
              placeholder="One highlight per line"
            />
          </article>
        ))}
      </section>

      <section className="glass rounded-3xl p-8 space-y-4">
        <h2 className="text-xl font-semibold text-slate-100">Certifications</h2>
        <textarea
          value={portfolio.certifications
            .map((item) => `${item.title} | ${item.issuer} | ${item.year}`)
            .join("\n")}
          onChange={(event) =>
            setPortfolio((prev) =>
              prev
                ? {
                    ...prev,
                    certifications: event.target.value
                      .split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean)
                      .map((line) => {
                        const [title, issuer, year] = line.split("|").map((part) => part.trim());
                        return {
                          title: title || "Certification",
                          issuer: issuer || "Issuer",
                          year: year || "Year",
                        };
                      }),
                  }
                : prev,
            )
          }
          rows={5}
          className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-slate-100"
        />
      </section>

      <section className="glass rounded-3xl p-8 space-y-4">
        <h2 className="text-xl font-semibold text-slate-100">Contact Links</h2>
        <p className="text-sm text-slate-400">Use format: Label | URL (one per line)</p>
        <textarea
          value={portfolio.contacts.map((contact) => `${contact.label} | ${contact.href}`).join("\n")}
          onChange={(event) => updateContacts(event.target.value)}
          rows={5}
          className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-slate-100"
        />
      </section>
    </main>
  );
}
