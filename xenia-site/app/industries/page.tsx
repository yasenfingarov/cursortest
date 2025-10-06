import Section from "@/components/Section";

export default function IndustriesPage() {
  return (
    <main>
      <Section title="Industries" subtitle="Experience across sectors">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "FinTech",
              copy: "Payments, lending, KYC, risk—secure and compliant systems.",
            },
            {
              name: "Healthcare",
              copy: "FHIR/HL7, HIPAA-conscious systems, patient experience.",
            },
            { name: "Retail", copy: "Commerce, logistics, and personalization at scale." },
            { name: "SaaS", copy: "Multi-tenant architectures and growth platforms." },
            { name: "Media", copy: "Streaming, CMS, and engagement tooling." },
            { name: "Public Sector", copy: "Accessible, reliable services for citizens." },
          ].map((item) => (
            <div key={item.name} className="rounded-lg border border-black/10 p-6 dark:border-white/10">
              <div className="text-base font-semibold">{item.name}</div>
              <p className="mt-2 text-sm text-black/70 dark:text-white/70">{item.copy}</p>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
