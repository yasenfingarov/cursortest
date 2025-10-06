import Section from "@/components/Section";

export default function CaseStudiesPage() {
  return (
    <main>
      <Section title="Case Studies" subtitle="Selected anonymized engagements">
        <div className="space-y-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="rounded-lg border border-black/10 p-6 dark:border-white/10">
              <div className="text-base font-semibold">High-Growth SaaS Platform</div>
              <p className="mt-2 text-sm text-black/70 dark:text-white/70">
                Scaled core services, introduced observability, and improved conversion by
                double digits.
              </p>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
