import Link from "next/link";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function SiteHeader() {
  return (
    <header className="topbar">
      <Link className="wordmark" href="/" aria-label="Yong9 홈">
        <span className="brand-mark" aria-hidden="true">
          <img src={`${basePath}/logo.png`} alt="" />
        </span>
        <small>MOBILE SECURITY RESEARCHER</small>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/">Home</Link>
        <Link href="/cv">Academic CV</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/wine">Wine Notes</Link>
      </nav>
    </header>
  );
}
