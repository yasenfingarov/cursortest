import Link from "next/link";
import Container from "@/components/Container";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 py-10 text-sm dark:border-white/10">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="font-semibold">Xenia Solutions</div>
          <div className="text-black/60 dark:text-white/60">
            Modern consulting site scaffold (no WordPress)
          </div>
        </div>
        <nav className="flex flex-wrap gap-4 text-black/70 dark:text-white/70">
          <Link href="/privacy" className="hover:text-black dark:hover:text-white">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-black dark:hover:text-white">
            Terms
          </Link>
          <Link href="/contact" className="hover:text-black dark:hover:text-white">
            Contact
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
