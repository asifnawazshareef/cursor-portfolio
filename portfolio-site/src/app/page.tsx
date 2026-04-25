import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/section-heading";

export default function Home() {
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
  } = portfolioData;

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
          <p className="mb-3 text-sm uppercase tracking-[0.22em] text-accent">
            Frontend Portfolio
          </p>
          <h1 className="text-3xl font-bold text-slate-50 md:text-5xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">{summary}</p>
          <div className="mt-7 flex flex-wrap gap-4 text-sm text-slate-300">
            <span className="rounded-full bg-muted px-3 py-2">{location}</span>
            <span className="rounded-full bg-muted px-3 py-2">{availability}</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-accent px-5 py-3 font-medium text-slate-950 transition hover:opacity-90"
            >
              Contact Me
            </Link>
            <a
              href={contacts.find((contact) => contact.label === "LinkedIn")?.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-700 px-5 py-3 font-medium text-slate-200 transition hover:border-accent hover:text-accent"
            >
              LinkedIn Profile
            </a>
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
              <article key={qualification} className="glass rounded-2xl p-5 text-slate-200">
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
                  <h3 className="text-xl font-semibold text-slate-100">{item.role}</h3>
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
              <span key={skill} className="rounded-full bg-card px-4 py-2 text-sm text-slate-200">
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
                <h3 className="text-lg font-semibold text-slate-100">{item.degree}</h3>
                <p className="mt-1 text-slate-300">{item.institute}</p>
                <p className="mt-2 text-sm text-slate-400">{item.timeline}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeading id="projects" eyebrow="Portfolio" title="Highlighted Projects" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article key={project.title} className="glass flex flex-col rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-slate-100">{project.title}</h3>
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
                <h3 className="text-lg font-semibold text-slate-100">{certification.title}</h3>
                <p className="mt-1 text-slate-300">{certification.issuer}</p>
                <p className="mt-2 text-sm text-slate-400">{certification.year}</p>
              </article>
            ))}
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
