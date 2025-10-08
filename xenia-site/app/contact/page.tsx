import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main>
      <Section title="Contact" subtitle="Tell us about your project">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <ContactForm />
          </div>
          <div className="prose prose-neutral max-w-none dark:prose-invert">
            <h3>How we collaborate</h3>
            <p>
              We work in small, senior teams with clear outcomes and pragmatic
              process. Engagements are tailored to your goals and stage.
            </p>
            <h3>Availability</h3>
            <p>
              Placeholder note on next availability and timelines. Replace with
              your actual details.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}
