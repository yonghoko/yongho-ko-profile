"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/cv", label: "CV" },
  { href: "/projects", label: "Projects" },
  { href: "/wine", label: "Wine" },
];

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const isCurrent = (href: string) => href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  return <>
    <a className="skip" href="#main-content">본문으로 건너뛰기</a>
    <header className="site-head">
      <div className="wrap">
        <Link className="wordmark" href="/" aria-label="Yong9 홈">
          <b>Yong<i>9</i></b>
          <span>MOBILE SECURITY RESEARCHER</span>
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          {links.map(link => <Link key={link.href} href={link.href} aria-current={isCurrent(link.href) ? "page" : undefined}>{link.label}</Link>)}
        </nav>
      </div>
    </header>
  </>;
}

export function SiteFooter({ label }: { label: string }) {
  return <footer className="site-foot">
    <div className="wrap">
      <span>{label}</span>
      <a href="#top">Back to top ↑</a>
    </div>
  </footer>;
}
