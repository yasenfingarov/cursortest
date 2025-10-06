import Section from "@/components/Section";
import Container from "@/components/Container";

export default function Home() {
  return (
    <main>
      <Section className="pb-0">
        <Container className="py-12 text-center md:py-20">
          <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            Build and scale modern digital products
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-black/70 dark:text-white/70">
            A clean, fast Next.js scaffold for a consulting site. Replace this
            placeholder content with your own copy, media, and brand.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="/services"
              className="rounded-md bg-black px-5 py-3 text-white dark:bg-white dark:text-black"
            >
              Our Services
            </a>
            <a
              href="/contact"
              className="rounded-md border border-black/10 px-5 py-3 dark:border-white/20"
            >
              Contact Us
            </a>
          </div>
        </Container>
      </Section>

      <Section title="What we do" subtitle="Core capabilities and offerings">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Product Engineering",
              copy: "Design, build, and evolve web/mobile products with modern stacks.",
            },
            {
              title: "Cloud & DevOps",
              copy: "Infrastructure as code, CI/CD, observability, and scaling.",
            },
            {
              title: "Data & AI",
              copy: "Analytics pipelines, LLM integrations, and ML productization.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-black/10 p-6 dark:border-white/10"
            >
              <div className="text-base font-semibold">{item.title}</div>
              <p className="mt-2 text-sm text-black/70 dark:text-white/70">
                {item.copy}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Industries" subtitle="Experience across sectors">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {["FinTech", "Healthcare", "Retail", "SaaS"].map((i) => (
            <div
              key={i}
              className="rounded-lg border border-black/10 p-6 text-center dark:border-white/10"
            >
              <div className="text-base font-semibold">{i}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Featured Case Study" subtitle="Anonymized project snapshot">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-black/10 p-6 dark:border-white/10">
            <div className="text-base font-semibold">Growth Platform</div>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              Delivered a scalable platform, improved conversion by 18%, and
              reduced infrastructure costs by 22% using modern tooling.
            </p>
            <a href="/case-studies" className="mt-4 inline-block text-sm underline">
              See more case studies
            </a>
          </div>
          <div className="rounded-lg border border-black/10 p-6 dark:border-white/10">
            <div className="text-base font-semibold">Tech Highlights</div>
            <ul className="mt-2 list-inside list-disc text-sm text-black/70 dark:text-white/70">
              <li>Next.js App Router</li>
              <li>Tailwind with CSS variables</li>
              <li>TypeScript-first components</li>
            </ul>
          </div>
        </div>
      </Section>
    </main>
  );
}
