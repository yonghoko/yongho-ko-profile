import Link from "next/link";
import { wines, type WineNote } from "../data/wines";
import { SiteFooter, SiteHeader } from "./site-header";
import { journals, journalQuartiles } from "./cv/publication-data";
import { PublicationItem } from "./cv/publication-list";

const areas = ["5G / 6G Security", "Authentication Protocols", "Formal Verification", "Post-Quantum Cryptography"];
const selectedDois = ["10.1109/JIOT.2026.3678536", "10.1109/TCE.2026.3686773", "10.1016/j.aej.2025.12.049", "10.3390/s24247979"];
const selectedPapers = selectedDois.flatMap(doi => journals.filter(item => item.href === `https://doi.org/${doi}`));
const researchThreads = [
  { title: "이동통신 인증", english: "Mobile Network Authentication", description: "5G-AKA, EAP-AKA′, AKMA, RSP, N32 roaming 및 TLS 계열 프로토콜의 보안 분석과 개선." },
  { title: "정형화 보안 검증", english: "Formal Security Verification", description: "기밀성, 무결성, 상호 인증, 순방향 비밀성, 재전송 안전성 및 unlinkability 검증." },
  { title: "양자내성 전환", english: "Post-Quantum Migration", description: "PQC 및 하이브리드 ECDH∥KEM 구조의 보안성·성능·배포 제약 분석." },
];

const tally: [string, string][] = [
  ["17", "SCI Articles"],
  ["3", "SCOPUS Papers"],
  ["55", "Research Projects"],
  ["3", "Patents"],
  ["1", "Standard"],
];

const featuredSlugs = ["alpha-box-dice-apostle", "bischofliche-weinguter-riesling-dry-2022", "blason-rhone-chateauneuf-du-pape-blanc-2018"];
const featuredWines = featuredSlugs.flatMap<WineNote>(slug => {
  const wine = wines.find(item => item.slug === slug);
  return wine ? [wine] : [];
});

export default function Home() {
  return <main id="top">
    <SiteHeader />

    <section className="hero wrap" aria-labelledby="who" id="main-content" tabIndex={-1}>
      <div className="hero-grid">
        <div>
          <p className="affil"><span>RESEARCHER</span><span>MOBILE NETWORK SECURITY</span></p>
          <h1 className="name" id="who">고용호<span className="serif" lang="en">Yongho Ko</span></h1>
          <p className="position">Ph.D. Candidate · Kookmin University</p>
          <p className="lead">주요 연구 분야는 5G·6G 이동통신 보안, 인증·키 합의 프로토콜, 정형화 검증, 양자내성암호 전환입니다.</p>
          <p className="career"><span>PROFESSIONAL EXPERIENCE</span><span>제주국제자유도시개발센터(JDC) 대리 · 2020–2023</span></p>
          <div className="home-links"><Link className="more" href="/cv">Academic CV 보기 →</Link><Link className="more" href="/projects">연구 프로젝트 보기 →</Link></div>
        </div>
        <figure className="portrait">
          <img src="https://static.wixstatic.com/media/6e2229_56c12669c6f746fb91937a6916d22944~mv2.png/v1/fill/w_646,h_724,al_c,lg_1,q_90/6e2229_56c12669c6f746fb91937a6916d22944~mv2.png" alt="고용호 프로필 사진" width={646} height={724} />
        </figure>
      </div>

      <div className="tally">
        <dl>{tally.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      </div>
    </section>

    <section className="split wrap" aria-labelledby="academic-h">
      <div className="split-head">
        <p className="overline">RESEARCH</p>
        <h2 id="academic-h">Academic Profile</h2>
      </div>
      <div className="section-body">
        <p className="research-topics">{areas.join(" · ")}</p>
        <ol className="threads">{researchThreads.map(thread => <li className="thread" key={thread.title}><h3>{thread.title}<span className="serif" lang="en">{thread.english}</span></h3><p>{thread.description}</p></li>)}</ol>
        <p style={{ margin: "22px 0 0" }}><Link className="more" href="/cv">전체 CV →</Link></p>
      </div>
    </section>

    <section className="split wrap" aria-labelledby="papers-h">
      <div className="split-head"><h2 id="papers-h">대표 논문<span className="serif" lang="en">Selected papers</span></h2><p>SCI 저널 논문 17편 가운데 제1저자 논문 4편.</p></div>
      <div><ol className="pubs">{selectedPapers.map(item => <PublicationItem key={item.href} item={{...item, quartile:journalQuartiles[item.href]}} />)}</ol><p style={{margin:"22px 0 0"}}><Link className="more" href="/cv#publications">17편 전체와 SCOPUS 논문 보기 →</Link></p></div>
    </section>

    <section className="split wrap" aria-labelledby="projects-h">
      <div className="split-head">
        <p className="overline">PROJECTS</p>
        <h2 id="projects-h">Research Projects</h2>
      </div>
      <div className="section-body">
        <p>5G 특화망 보안, 양자보안 기반 기기 식별, 개방형 로밍, AirGap 환경의 스니핑 방지 기술을 연구합니다.</p>
        <Link className="more" href="/projects">프로젝트 이력 →</Link>
      </div>
    </section>

    <section className="split wrap" aria-labelledby="wine-h">
      <div className="split-head">
        <p className="overline">PERSONAL NOTES</p>
        <h2 id="wine-h">Wine Notes</h2>
      </div>
      <div className="off">
        <div>
          <p>와인의 향과 맛, 인상 깊었던 순간을 사진과 테이스팅 노트로 기록합니다.</p>
          <Link className="more" href="/wine">Wine Notes →</Link>
        </div>
        <div className="off-photos">
          {featuredWines.map(wine => <Link key={wine.slug} href="/wine" aria-label={`${wine.name} 노트 보기`}><img src={wine.image} alt="" loading="lazy" width={600} height={750} /></Link>)}
        </div>
      </div>
    </section>

    <SiteFooter label="Yongho Ko · Academic Profile" />
  </main>;
}
