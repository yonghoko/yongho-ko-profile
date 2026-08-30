import Link from "next/link";
import { SiteHeader } from "./site-header";

const areas = ["5G / 6G Security", "Authentication Protocols", "Formal Verification", "Post-Quantum Cryptography"];

export default function Home() {
  return <main id="top">
    <SiteHeader />
    <section className="home-intro profile-intro">
      <div><p className="overline">RESEARCHER · MOBILE NETWORK SECURITY</p><h1>고용호 <span>Yongho Ko</span></h1><p className="position">Ph.D. Candidate · Kookmin University</p>
      <p className="summary">주요 연구 분야는 5G·6G 이동통신 보안, 인증·키 합의 프로토콜, 정형화 검증, 양자내성암호 전환입니다.</p>
      <p className="career-highlight"><span>PROFESSIONAL EXPERIENCE</span> 제주국제자유도시개발센터(JDC) 대리 · 2020–2023</p>
      <div className="home-links"><Link href="/cv">Academic CV 보기 →</Link><Link href="/projects">연구 프로젝트 보기 →</Link></div></div>
      <img className="profile-photo" src="https://static.wixstatic.com/media/6e2229_56c12669c6f746fb91937a6916d22944~mv2.png/v1/fill/w_646,h_724,al_c,lg_1,q_90/6e2229_56c12669c6f746fb91937a6916d22944~mv2.png" alt="고용호 프로필 사진" />
    </section>
    <section className="home-grid">
      <div className="home-card academic-card"><p className="overline">RESEARCH</p><h2>Academic Profile</h2><ul>{areas.map(a=><li key={a}>{a}</li>)}</ul><div className="mini-metrics"><span><b>17</b> SCI Articles</span><span><b>3</b> SCOPUS Papers</span><span><b>55</b> Research Projects</span><span><b>3</b> Patents</span><span><b>1</b> Standard</span></div><Link href="/cv">전체 CV →</Link></div>
      <div className="home-card project-feature"><p className="overline">PROJECTS</p><h2>Research Projects</h2><p>5G 특화망 보안, 양자보안 기반 기기 식별, 개방형 로밍, AirGap 환경의 스니핑 방지 기술을 연구합니다.</p><Link href="/projects">프로젝트 이력 →</Link></div>
      <div className="home-card wine-feature"><p className="overline">PERSONAL NOTES</p><h2>Wine Notes</h2><p>와인의 향과 맛, 인상 깊었던 순간을 사진과 테이스팅 노트로 기록합니다.</p><Link href="/wine">Wine Notes →</Link></div>
    </section>
    <footer><span>Yongho Ko · Academic Profile</span><a href="#top">Back to top ↑</a></footer>
  </main>;
}
