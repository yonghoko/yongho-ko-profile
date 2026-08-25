import { SiteHeader } from "../site-header";
import { conferencePublications } from "../../data/conference-publications";

export default function PublicationsPage() {
  return (
    <main id="top">
      <SiteHeader />
      <header className="page-head publication-head">
        <p className="overline">RESEARCH OUTPUT</p>
        <h1>Conference Papers &amp; Presentations</h1>
        <p>
          국내외 학술대회 발표 및 비SCI 논문 전체 목록입니다. DOI가 발급된
          논문만 논문 링크를 제공합니다.
        </p>
        <div className="publication-summary" aria-label="목록 요약">
          <span><b>{conferencePublications.length}</b> Total</span>
          <span><b>{conferencePublications.filter((item) => item.selected).length}</b> Selected</span>
          <span><b>{conferencePublications.filter((item) => item.doi).length}</b> DOI</span>
        </div>
      </header>

      <section className="publication-archive" aria-label="Conference papers and presentations">
        {conferencePublications.map((item, index) => (
          <article className="publication-record" key={item.no}>
            <span className="publication-number">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <div className="publication-meta">
                <time dateTime={item.date}>{item.date}</time>
                <span>{item.role}</span>
                {item.selected && <span className="selected-badge">Selected</span>}
                {item.doi && <span className="doi-badge">DOI</span>}
              </div>
              {item.doi ? (
                <a className="publication-title-link" href={item.doi} target="_blank" rel="noreferrer">
                  <h2>{item.title} ↗</h2>
                </a>
              ) : (
                <h2>{item.title}</h2>
              )}
              <p className="publication-authors">{item.authors}</p>
              <p className="publication-venue">
                <em>{item.venue}</em>{item.details && <> · {item.details}</>}
              </p>
            </div>
          </article>
        ))}
      </section>

      <footer><span>Yongho Ko · Publications</span><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
