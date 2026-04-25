"use client";

import { SectionHeading } from "@/components/section-heading";
import { PortfolioData } from "@/types/portfolio";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaCertificate,
  FaCode,
  FaEnvelopeOpenText,
  FaGraduationCap,
  FaLocationDot,
  FaRocket,
  FaScrewdriverWrench,
} from "react-icons/fa6";

export default function Home() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        setError("");
        const response = await fetch("/api/portfolio", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to load portfolio data.");
        }
        const payload = (await response.json()) as PortfolioData;
        setData(payload);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unable to load data.";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, []);

  if (isLoading) {
    return (
      <main className="container-max py-20">
        <div className="glass animate-pulse rounded-3xl p-10 text-slate-300">Loading portfolio...</div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="container-max py-20">
        <div className="glass rounded-3xl p-10 text-rose-300">
          {error || "Portfolio data is unavailable right now."}
        </div>
      </main>
    );
  }

  const {
    name,
    title,
    summary,
    location,
    availability,
    qualifications,
    keyContributions,
    skills,
    experiences,
    education,
    projects,
    certifications,
    contacts,
    nav,
    resumeUrl,
  } = data;

  const githubLink = contacts.find((contact) => contact.label === "GitHub")?.href;

  return (
    <div className="relative overflow-x-clip">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.24),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.16),transparent_35%)]" />

      <header className="container-max sticky top-0 z-20 py-4">
        <nav className="glass flex flex-wrap items-center justify-between gap-4 rounded-2xl px-5 py-4">
          <p className="text-sm font-semibold tracking-wide text-slate-100">{name}</p>
          <ul className="flex flex-wrap gap-3 text-xs text-slate-300 md:text-sm">
            {nav.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="transition hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="container-max space-y-20 py-10 pb-20">
        <section className="glass rounded-3xl p-8 md:p-12">
          <p className="mb-3 inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-accent">
            <FaRocket /> Frontend Portfolio
          </p>
          <h1 className="text-3xl font-bold text-slate-50 md:text-5xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">{summary}</p>
          <div className="mt-7 flex flex-wrap gap-4 text-sm text-slate-300">
            <span className="rounded-full bg-muted px-3 py-2 inline-flex items-center gap-2">
              <FaLocationDot /> {location}
            </span>
            <span className="rounded-full bg-muted px-3 py-2">{availability}</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-accent px-5 py-3 font-medium text-slate-950 transition hover:opacity-90 inline-flex items-center gap-2"
            >
              <FaEnvelopeOpenText /> Contact Me
            </Link>
            <a
              href={contacts.find((contact) => contact.label === "LinkedIn")?.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-700 px-5 py-3 font-medium text-slate-200 transition hover:border-accent hover:text-accent"
            >
              LinkedIn Profile
            </a>
            {githubLink ? (
              <a
                href={githubLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-slate-700 px-5 py-3 font-medium text-slate-200 transition hover:border-accent hover:text-accent"
              >
                GitHub Profile
              </a>
            ) : null}
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeading
            id="qualifications"
            eyebrow="Overview"
            title="Qualifications & Value"
          />
          <div className="grid gap-4 md:grid-cols-2">
            {qualifications.map((qualification) => (
              <article
                key={qualification}
                className="glass rounded-2xl p-5 text-slate-200 border border-accent/20"
              >
                {qualification}
              </article>
            ))}
          </div>
          <div className="glass rounded-2xl p-6">
            <h3 className="mb-4 text-lg font-semibold text-slate-100">Key Contributions</h3>
            <ul className="space-y-3 text-slate-300">
              {keyContributions.map((contribution) => (
                <li key={contribution}>- {contribution}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeading id="experience" eyebrow="Career" title="Professional Experience" />
          <div className="space-y-5">
            {experiences.map((item) => (
              <article key={item.company} className="glass rounded-2xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-semibold text-slate-100 inline-flex items-center gap-2">
                    <FaBriefcase className="text-accent" /> {item.role}
                  </h3>
                  <p className="text-sm text-slate-400">{item.timeline}</p>
                </div>
                <p className="mt-1 text-slate-300">{item.company}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-300 md:text-base">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>- {highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeading id="skills" eyebrow="Capability" title="Core Skills" />
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-card px-4 py-2 text-sm text-slate-200 border border-slate-700 inline-flex items-center gap-2"
              >
                <FaCode className="text-accent" />
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeading id="education" eyebrow="Academic" title="Education" />
          <div className="grid gap-4">
            {education.map((item) => (
              <article key={item.institute} className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-slate-100 inline-flex items-center gap-2">
                  <FaGraduationCap className="text-accent" /> {item.degree}
                </h3>
                <p className="mt-1 text-slate-300">{item.institute}</p>
                <p className="mt-2 text-sm text-slate-400">{item.timeline}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeading id="projects" eyebrow="Portfolio" title="Highlighted Projects" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className={`glass flex flex-col rounded-2xl p-6 border ${
                  index === 0 ? "border-accent/70 shadow-[0_0_35px_rgba(56,189,248,0.2)]" : "border-slate-700"
                }`}
              >
                <h3 className="text-lg font-semibold text-slate-100 inline-flex items-center gap-2">
                  <FaScrewdriverWrench className="text-accent" />
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300">{project.summary}</p>
                <p className="mt-3 text-sm text-slate-400">{project.impact}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="rounded-full bg-muted px-3 py-1 text-xs text-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeading id="certifications" eyebrow="Learning" title="Certifications" />
          <div className="grid gap-4 md:grid-cols-2">
            {certifications.map((certification) => (
              <article key={certification.title} className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-slate-100 inline-flex items-center gap-2">
                  <FaCertificate className="text-accent" /> {certification.title}
                </h3>
                <p className="mt-1 text-slate-300">{certification.issuer}</p>
                <p className="mt-2 text-sm text-slate-400">{certification.year}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeading
            id="resume"
            eyebrow="Resume"
            title="Preview Resume PDF"
            subtitle="Recruiters can view your resume without leaving the portfolio."
          />
          <div className="glass rounded-3xl p-4 md:p-6">
            <iframe
              title="Asif Nawaz Resume"
              src={resumeUrl}
              className="h-[620px] w-full rounded-2xl border border-slate-700"
            />
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-accent hover:text-accent"
            >
              Open Resume in New Tab
            </a>
          </div>
        </section>

        <section className="glass rounded-3xl p-8 md:p-10">
          <SectionHeading
            id="contact"
            eyebrow="Let's Work Together"
            title="Ready to discuss your next frontend role?"
            subtitle="Reach out directly or use the contact page form. I will respond quickly."
          />
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
            {contacts.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                className="rounded-full border border-slate-700 px-4 py-2 transition hover:border-accent hover:text-accent"
              >
                {contact.label}
              </a>
            ))}
          </div>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-accent px-5 py-3 font-medium text-slate-950 transition hover:opacity-90"
          >
            Open Contact Page
          </Link>
        </section>
      </main>
    </div>
  );
}
