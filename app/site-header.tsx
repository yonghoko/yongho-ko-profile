import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="topbar">
      <Link className="wordmark" href="/" aria-label="Yong9 홈">
        <strong>Yong9</strong>
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
