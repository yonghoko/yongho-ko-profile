import type { Metadata } from "next";
import Link from "next/link";
import { drinks } from "../../../data/drinks";
import { SiteHeader } from "../../site-header";

export const metadata: Metadata = {
  title: "Beyond Wine | Yongho Ko",
  description: "와인 밖에서 만난 술과 그날의 인상을 자유롭게 기록한 개인 아카이브.",
};

export default function BeyondWinePage() {
  return (
    <main className="wine-page beyond-page" id="top">
      <SiteHeader />
      <section className="wine-head beyond-head">
        <p className="overline">AN OCCASIONAL DETOUR</p>
        <h1>Beyond Wine</h1>
        <p>와인 밖에서 만난 술과 그날의 인상을 자유롭게 기록합니다.</p>
        <Link className="beyond-return" href="/wine">
          ← Wine Notes
        </Link>
      </section>
      <section className="drink-grid" aria-label="와인 외 주류 기록">
        {drinks.map((entry, index) => (
          <article className="drink-card" key={entry.slug}>
            <img src={entry.image} alt={entry.name} loading="lazy" />
            <div className="drink-copy">
              <p className="drink-category">
                {String(index + 1).padStart(2, "0")} · {entry.category}
              </p>
              <h2>{entry.name}</h2>
              <p>{entry.description}</p>
            </div>
          </article>
        ))}
      </section>
      <footer>
        <span>Yongho Ko · Beyond Wine</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
