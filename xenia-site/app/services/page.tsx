import Section from "@/components/Section";

export default function ServicesPage() {
  return (
    <main>
      <Section title="Services" subtitle="Capabilities tailored to your goals">
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          <h3>Product Engineering</h3>
          <p>
            End-to-end web and mobile development, from discovery to launch and
            beyond. We emphasize reliability, performance, and maintainability.
          </p>
          <h3>Cloud & DevOps</h3>
          <p>
            Infrastructure as code, CI/CD, monitoring, and platform engineering
            to accelerate delivery and improve resilience.
          </p>
          <h3>Data & AI</h3>
          <p>
            Analytics pipelines, LLM integrations, and ML productization
            incorporating best practices for privacy and security.
          </p>
        </div>
      </Section>
    </main>
  );
}
