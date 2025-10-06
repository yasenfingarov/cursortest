"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/Container";

const NAV_LINKS: Array<{ href: string; label: string }> = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-white/10 dark:bg-black/50">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <span className="inline-block h-2 w-2 rounded-sm bg-black dark:bg-white" />
          <span className="tracking-tight">Xenia Solutions</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors hover:text-black dark:hover:text-white ${
                  isActive
                    ? "text-black dark:text-white"
                    : "text-black/60 dark:text-white/60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="md:hidden">
          <span className="text-sm text-black/60 dark:text-white/60">Menu</span>
        </div>
      </Container>
    </header>
  );
}
