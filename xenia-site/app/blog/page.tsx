import Section from "@/components/Section";

export default function BlogPage() {
  return (
    <main>
      <Section title="Blog" subtitle="Insights and engineering notes">
        <div className="space-y-6">
          {[1, 2, 3].map((n) => (
            <article key={n} className="rounded-lg border border-black/10 p-6 dark:border-white/10">
              <h3 className="text-base font-semibold">Post Title {n}</h3>
              <p className="mt-2 text-sm text-black/70 dark:text-white/70">
                Short summary of the topic and the key takeaway.
              </p>
            </article>
          ))}
        </div>
      </Section>
    </main>
  );
}
