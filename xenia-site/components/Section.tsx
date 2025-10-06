import Container from "@/components/Container";

export default function Section({
  title,
  subtitle,
  children,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <Container>
        {(title || subtitle) && (
          <div className="mb-8 max-w-3xl">
            {title && (
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 text-black/70 dark:text-white/70">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
