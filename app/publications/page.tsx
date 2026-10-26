import { SiteFooter, SiteHeader } from "../site-header";
import { conferencePublications } from "../../data/conference-publications";

export default function PublicationsPage() {
  const summary: [string, number][] = [
    ["Total", conferencePublications.length],
    ["Selected", conferencePublications.filter((item) => item.selected).length],
    ["DOI", conferencePublications.filter((item) => item.doi).length],
  ];
  return (
    <main id="top">
      <SiteHeader />
      <div className="wrap" id="main-content" tabIndex={-1}>
        <header className="page-head">
          <p className="overline">RESEARCH OUTPUT</p>
          <h1>Conference Papers &amp; Presentations</h1>
          <p className="lead">
            국내외 학술대회 발표 및 비SCI 논문 전체 목록입니다. DOI가 발급된
            논문만 논문 링크를 제공합니다.
          </p>
          <dl className="publication-summary" aria-label="목록 요약">
            {summary.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
        </header>

        <section aria-label="Conference papers and presentations">
          <ol className="publication-archive">
            {conferencePublications.map((item, index) => (
              <li className="publication-record" key={item.title}>
                <span className="publication-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <div className="publication-meta">
                    <time dateTime={item.date}>{item.date}</time>
                    <span className={`role${item.role === "First Author" ? " first-author" : ""}`}>{item.role}</span>
                    {item.selected && <span className="badge selected-badge">Selected</span>}
                    {item.doi && <span className="badge doi-badge">DOI</span>}
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
              </li>
            ))}
          </ol>
        </section>
      </div>

      <SiteFooter label="Yongho Ko · Publications" />
    </main>
  );
}
