import Section from "@/components/Section";

export default function AboutPage() {
  return (
    <main>
      <Section title="About" subtitle="Who we are">
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          <p>
            We are builders who care about outcomes, quality, and long-term
            maintainability. This scaffold gives you a clean foundation to ship
            quickly without WordPress.
          </p>
          <p>
            Replace this content with your story, team, and values.
          </p>
        </div>
      </Section>
    </main>
  );
}
