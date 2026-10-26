import type { Metadata } from "next";
import Link from "next/link";
import { drinks } from "../../../data/drinks";
import { SiteFooter, SiteHeader } from "../../site-header";

export const metadata: Metadata = {
  title: "Beyond Wine | Yongho Ko",
  description: "와인 밖에서 만난 술과 그날의 인상을 자유롭게 기록한 개인 아카이브.",
};

export default function BeyondWinePage() {
  return (
    <main id="top">
      <SiteHeader />
      <div className="wrap" id="main-content" tabIndex={-1}>
        <header className="page-head">
          <p className="overline">AN OCCASIONAL DETOUR</p>
          <h1>Beyond Wine</h1>
          <p className="lead">와인 밖에서 만난 술과 그날의 인상을 자유롭게 기록합니다.</p>
          <Link className="more beyond-return" href="/wine">← Wine Notes</Link>
        </header>
        <section aria-label="와인 외 주류 기록">
          <ol className="drink-list">
            {drinks.map((entry, index) => (
              <li key={entry.slug}>
                <img src={entry.image} alt={entry.name} loading="lazy" width={600} height={750} />
                <div className="drink-copy">
                  <p className="overline">{String(index + 1).padStart(2, "0")} · {entry.category}</p>
                  <h2>{entry.name}</h2>
                  <p>{entry.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
      <SiteFooter label="Yongho Ko · Beyond Wine" />
    </main>
  );
}
