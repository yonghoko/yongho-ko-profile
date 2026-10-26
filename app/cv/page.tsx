import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-header";
import { selectedConferencePublications } from "../../data/conference-publications";
import { JournalArticles, PublicationItem, type JournalArticle } from "./publication-list";
import { SectionNav, type CvSection } from "./section-nav";

import { journals, journalQuartiles, type Publication } from "./publication-data";
import { countLeadPublications } from "./publication-stats";
import { selectedProjects as projects } from "../projects/selected-projects";

const conferences: Publication[] = [
  { year:"2025", role:"Co-author", title:"Formal Verification of Consumer Remote SIM Provisioning Common Mutual Authentication Using BAN Logic", venue:"IEEE ICCT-Pacific", href:"https://doi.org/10.1109/ICCT-Pacific63901.2025.11012784" },
  { year:"2024", role:"Co-author", title:"Formal Verification of 5GAKA-LCCO Protocol Supporting Forward Secrecy: Through Expanded BAN Logic", venue:"MobiSec 2024, CCIS 2095, 18–36", href:"https://doi.org/10.1007/978-981-97-4465-7_2" },
  { year:"2024", role:"Co-author", title:"Decentralized Real-Time IIoT Data Integrity Verification System and Its Comprehensive Analysis", venue:"DSPP 2024, 156–164", href:"https://doi.org/10.1007/978-981-97-8546-9_9" },
];

const metrics: [string, string][] = [
  [String(journals.length), "SCI Journal Articles"],
  ["3", "SCOPUS Papers"],
  ["55", "Research Projects"],
  ["3", "Granted Patents"],
  ["1", "Standard"],
];

const skills: [string, string[]][] = [
  ["Research Areas", ["5G / 6G Security", "Authentication Protocols", "Formal Verification", "Post-Quantum Cryptography", "eSIM & Roaming Security"]],
  ["Methods & Tools", ["ProVerif", "AVISPA · Scyther", "BAN · Expanded SVO", "Security Benchmarking", "MATLAB"]],
  ["Programming Languages", ["C / C++", "C#", "Java", "Python", "SQL", "JavaScript / TypeScript"]],
  ["Frameworks & Web Technologies", ["MFC", "React", "Next.js", "HTML / CSS"]],
];

const sections: CvSection[] = [
  { id: "education", label: "Education" },
  { id: "experience", label: "Professional Experience" },
  { id: "additional", label: "Additional Experience" },
  { id: "research", label: "Research Profile" },
  { id: "publications", label: "SCI Journal Articles" },
  { id: "scopus", label: "SCOPUS Papers" },
  { id: "conferences", label: "Selected Conference Papers" },
  { id: "projects", label: "Selected Research Projects" },
  { id: "awards", label: "Honors & Awards" },
  { id: "outputs", label: "Patents & Standards" },
  { id: "skills", label: "Methods & Skills" },
];

const assetPrefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const journalArticles: JournalArticle[] = journals.map(item => ({ ...item, quartile: journalQuartiles[item.href] }));

export default function Home() {
  return <main id="top">
    <SiteHeader />

    <div className="wrap" id="main-content" tabIndex={-1}>
      <header className="page-head cv-head">
        <div className="cv-id">
          <p className="overline">ACADEMIC CURRICULUM VITAE</p>
          <h1 id="profile">고용호 <span className="serif" lang="en">Yongho Ko</span></h1>
          <p className="position">Ph.D. Candidate · Kookmin University</p>
          <p className="lead">5G·6G 이동통신 보안을 중심으로 인증·키 합의 프로토콜, 정형화 검증, 양자내성암호 전환을 연구합니다. 표준 프로토콜의 보안 요구사항 분석을 실제 구현과 성능 평가로 확장합니다.</p>
          <ul className="contacts" aria-label="연락처와 외부 프로필">
            <li><a className="ext" href="mailto:koyh0911@gmail.com">koyh0911@gmail.com</a></li>
            <li><a className="ext" href="https://scholar.google.co.kr/citations?user=dybtsxwAAAAJ" target="_blank" rel="noreferrer">Google Scholar</a></li>
            <li><a className="ext" href="https://github.com/yonghoko" target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a className="ext" href="https://github.com/yonghoko/ProVerif" target="_blank" rel="noreferrer">ProVerif Models</a></li>
          </ul>
        </div>
        <img className="cv-photo" src="https://static.wixstatic.com/media/6e2229_56c12669c6f746fb91937a6916d22944~mv2.png/v1/fill/w_400,h_448,al_c,lg_1,q_90/6e2229_56c12669c6f746fb91937a6916d22944~mv2.png" alt="고용호 프로필 사진" width={400} height={448} />
        <div className="tally">
          <dl>{metrics.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}{label === "SCI Journal Articles" && <small className="tally-sub">주저자 {countLeadPublications(journals)}편</small>}</dd></div>)}</dl>
        </div>
      </header>

      <div className="cv-layout">
        <SectionNav sections={sections} />

        <article>
          <section className="cv-sec" id="education"><h2>Education</h2>
            <ol className="entries">
              <li className="entry"><span className="when">Present</span><div><h3>Ph.D. Candidate in Cyber Security</h3><p>Kookmin University, Seoul, Republic of Korea</p><small>Research: Mobile Network Security, Authentication Protocols, Formal Verification</small></div></li>
              <li className="entry"><span className="when">Master&apos;s</span><div><h3>Information Security</h3><p>Soonchunhyang University, Asan, Republic of Korea</p><small>Research: UAV Security and Authentication Protocols</small><a className="thesis-link" href={`${assetPrefix}/theses/espmu-efficient-security-protocol-military-uav.pdf`} target="_blank" rel="noreferrer"><span>MASTER&apos;S THESIS</span>미래전에 대비한 군수분야 UAV 환경을 위한 효율적인 보안 프로토콜 연구 ↗</a></div></li>
              <li className="entry"><span className="when">Bachelor&apos;s</span><div><h3>Information Security</h3><p>Soonchunhyang University, Asan, Republic of Korea</p><small>Research: Embedded Network Security, Firmware Reverse Engineering, and Digital Forensics</small><a className="thesis-link" href={`${assetPrefix}/papers/internet-router-firmware-update-vulnerability-analysis.pdf`} target="_blank" rel="noreferrer"><span>BACHELOR&apos;S THESIS</span>인터넷 공유기 펌웨어 업데이트 취약점 분석 ↗</a></div></li>
            </ol>
          </section>

          <section className="cv-sec" id="experience"><h2>Professional Experience</h2>
            <ol className="entries">
              <li className="entry"><time>2020.06 — 2023.08</time><div><span className="organization-type">PUBLIC ENTERPRISE</span><h3>제주국제자유도시개발센터 (JDC)</h3><p>대리 · 국토교통부 산하 공기업</p></div></li>
            </ol>
          </section>

          <section className="cv-sec" id="additional"><h2>Additional Experience</h2>
            <ol className="entries">
              <li className="entry"><time>2017–2018</time><div><h3>순천향대학교 모바일 IoT 보안 학술동아리 회장</h3></div></li>
              <li className="entry"><time>2013–2015</time><div><h3>국방부 국직CERT 정보보호병 (전문특기병)</h3></div></li>
              <li className="entry"><time>2012–2013</time><div><h3>정보보호 전문가 교육훈련과정 수료</h3></div></li>
            </ol>
          </section>

          <section className="cv-sec" id="research"><h2>Research Profile</h2>
            <div className="cols3">
              <div><h3>Mobile Network Authentication</h3><p>5G-AKA, EAP-AKA′, AKMA, RSP, N32 roaming 및 TLS 계열 프로토콜의 보안 분석과 개선.</p></div>
              <div><h3>Formal Security Verification</h3><p>기밀성, 무결성, 상호 인증, 순방향 비밀성, 재전송 안전성 및 unlinkability 검증.</p></div>
              <div><h3>Post-Quantum Migration</h3><p>PQC 및 하이브리드 ECDH∥KEM 구조의 보안성·성능·배포 제약 분석.</p></div>
            </div>
          </section>

          <section className="cv-sec" id="publications"><h2>SCI Journal Articles <small><a className="ext" href="https://scholar.google.co.kr/citations?user=dybtsxwAAAAJ" target="_blank" rel="noreferrer">Google Scholar에서 전체 보기</a></small></h2>
            <JournalArticles items={journalArticles} />
            <p className="under-review"><span>UNDER REVIEW</span> SCI(E) 논문 8편 심사 중</p>
          </section>

          <section className="cv-sec" id="scopus"><h2>SCOPUS Papers</h2>
            <ol className="pubs">{conferences.map(item => <PublicationItem item={item} key={item.title} />)}</ol>
          </section>

          <section className="cv-sec" id="conferences"><h2>Selected Conference Papers <small><Link href="/publications">전체 목록 보기 →</Link></small></h2>
            <ol className="pubs">{selectedConferencePublications.map(item => <li className="pub" key={item.title}>
              <span className="pub-year">{item.date.slice(0, 4)}</span>
              <div>
                <h3>{item.doi ? <a href={item.doi} target="_blank" rel="noreferrer">{item.title}</a> : item.title}</h3>
                <p className="pub-authors">{item.authors}</p>
                <p className="pub-venue">{item.venue}</p>
                <span className="badges"><span className={`role${item.role === "First Author" ? " first-author" : ""}`}>{item.role}</span></span>
              </div>
            </li>)}</ol>
          </section>

          <section className="cv-sec" id="projects"><h2>Selected Research Projects <small><Link href="/projects">전체 프로젝트 이력 보기 →</Link></small></h2>
            <ol className="entries">{projects.map(([year, title]) => <li className="entry" key={title}><time>{year}</time><div><h3>{title}</h3></div></li>)}</ol>
          </section>

          <section className="cv-sec" id="awards"><h2>Honors &amp; Awards <small className="section-note">수상 5건</small></h2>
            <ol className="award-list">
              <li><time>2025</time><span className="award-badge international">국제</span><div><h3>Best Special Session Paper Award</h3><a className="award-paper" href="https://di0zxmb8pwajl.cloudfront.net/kiisc/conference/mobisec2025/programbook/64.pdf" target="_blank" rel="noreferrer">A Hybrid EDHOC Protocol ↗</a><p>The 9th International Conference on Mobile Internet Security (MobiSec 2025) · Sapporo, Japan</p></div></li>
              <li><time>2025</time><span className="award-badge external">대외</span><div><h3>우수학생연구자상</h3><p>한국정보통신기술협회 (TTA)</p></div></li>
              <li><time>2024</time><span className="award-badge international">국제</span><div><h3>Best Student Paper Award</h3><a className="award-paper" href="https://doi.org/10.1007/978-981-97-8546-9_9" target="_blank" rel="noreferrer">Decentralized Real-Time IIoT Data Integrity Verification System and Its Comprehensive Analysis ↗</a><p>2nd International Conference on Data Security and Privacy Protection (DSPP 2024) · Xi&apos;an, China</p></div></li>
              <li><time>2017</time><span className="award-badge external">대외</span><div><h3>우수논문상</h3><a className="award-paper" href={`${assetPrefix}/papers/lightweight-authentication-protocol-for-implantable-medical-devices.pdf`} target="_blank" rel="noreferrer">체내 이식형 의료기기를 위한 경량화 인증 프로토콜 설계 및 정형화 검증 ↗</a><p>The 5th Workshop on Convergent and Smart Media Systems (CSMS 2017) · Korean Institute of Smart Media</p></div></li>
              <li><time>2017</time><span className="award-badge university">교내</span><div><h3>공과대학 학술제 은상</h3><a className="award-paper" href={`${assetPrefix}/papers/internet-router-firmware-update-vulnerability-analysis.pdf`} target="_blank" rel="noreferrer">인터넷 공유기 펌웨어 업데이트 취약점 분석 ↗</a><p>순천향대학교 공과대학</p></div></li>
            </ol>
          </section>

          <section className="cv-sec" id="outputs"><h2>Patents &amp; Standards <small className="section-note">미국 등록특허 1 · 국내 등록특허 2 · 국내 출원특허 1 · 표준 1</small></h2>
            <ol className="credential-list">
              <li><span className="credential-badge overseas">미국 등록특허</span><span className="credential-id">US11914720B2</span><div><a href="https://patents.google.com/patent/US11914720B2/en" target="_blank" rel="noreferrer">Method for verifying drone included in industrial Internet of Things system, by using Petri-net modeling ↗</a></div></li>
              <li><span className="credential-badge domestic">국내 등록특허</span><span className="credential-id">KR102491151B1</span><a href="https://doi.org/10.8080/1020210110719" target="_blank" rel="noreferrer">무인 항공기 보안 프로토콜 시스템 및 그 방법 ↗</a></li>
              <li><span className="credential-badge domestic">국내 등록특허</span><span className="credential-id">KR102050230B1</span><a href="https://patents.google.com/patent/KR102050230B1/ko" target="_blank" rel="noreferrer">페트리 넷 모델링을 이용한 산업용 사물 인터넷 시스템에 구비되는 드론의 검증방법 ↗</a></li>
              <li><span className="credential-badge pending">국내 출원특허</span><span className="credential-id">10-2025-0032876</span><a href="https://doi.org/10.8080/1020250032876" target="_blank" rel="noreferrer">하이브리드 양자내성암호 기반 순방향 비밀성 지원 통신 장치 및 방법 ↗</a></li>
              <li><span className="credential-badge standard">표준</span><span className="credential-id">TTAK.KO-12.0431</span><div><a href="https://committee.tta.or.kr/standard/standard.jsp?commit_code=PG503&firstDepthCode=TC5&nowPage=1&secondDepthCode=PG503&thirdDepthCode=null" target="_blank" rel="noreferrer">산업 전반에 적용되는 5G 특화망 보안 요구사항 ↗</a><small>TTA 올해의 우수표준 선정</small></div></li>
            </ol>
          </section>

          <section className="cv-sec" id="skills"><h2>Methods &amp; Skills</h2>
            <div className="skills">{skills.map(([label, items]) => <div key={label}><h3>{label}</h3><p>{items.join(" · ")}</p></div>)}</div>
          </section>
        </article>
      </div>
    </div>

    <SiteFooter label="Yongho Ko · Academic CV" />
  </main>;
}
