type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export function SectionHeading({ id, eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <div id={id} className="space-y-3 scroll-mt-24">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-bold text-slate-100 md:text-3xl">{title}</h2>
      {subtitle ? <p className="max-w-3xl text-slate-300">{subtitle}</p> : null}
    </div>
  );
}
