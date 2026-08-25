import Link from "next/link";
import { SiteHeader } from "../site-header";

type Publication = { year: string; title: string; venue: string; role: string; href: string };

const journals: Publication[] = [
  { year:"2026", role:"First Author", title:"5G-AKA-HPQC: Hybrid Post-Quantum Cryptography Protocol for Quantum-Resilient 5G Primary Authentication with Forward Secrecy", venue:"IEEE Internet of Things Journal, 13(12), 26977–27000", href:"https://doi.org/10.1109/JIOT.2026.3678536" },
  { year:"2026", role:"First Author", title:"Toward a Stealth-Capable 5G-AKA: Secure Key Distribution with Covert Channel Integration for Future-Sensitive Military Applications", venue:"IEEE Transactions on Consumer Electronics, Early Access", href:"https://doi.org/10.1109/TCE.2026.3686773" },
  { year:"2026", role:"First Author", title:"Inside 5G IoT Remote SIM Provisioning: Security Gaps and Efficiency Trade-offs", venue:"IEEE Consumer Electronics Magazine, Early Access", href:"https://doi.org/10.1109/MCE.2026.3723065" },
  { year:"2026", role:"Co-author", title:"Closing the HNDL Window in Consumer eSIM Provisioning: Hybrid Post-Quantum Migration, Formal Verification, and Deployment Constraints", venue:"Sensors, 26(15), 4683", href:"https://doi.org/10.3390/s26154683" },
  { year:"2026", role:"Co-author", title:"Towards 6G Roaming Security: Experimental Analysis of SUCI-based DoS, Cost, and NF Stress", venue:"Applied Sciences, 16(1), 508", href:"https://doi.org/10.3390/app16010508" },
  { year:"2026", role:"Co-author", title:"Toward Quantum-Safe 6G Mobile Networks: A Survey on EAP-AKA Prime Family with Formal Security Analysis and Empirical Evaluation", venue:"IEEE Transactions on Consumer Electronics, 72(1), 21–37", href:"https://doi.org/10.1109/TCE.2025.3647712" },
  { year:"2025", role:"First Author", title:"Revisiting the M2M Remote SIM Provisioning Protocol: A Comprehensive Security and Performance Analysis", venue:"Alexandria Engineering Journal, 135", href:"https://doi.org/10.1016/j.aej.2025.12.049" },
  { year:"2025", role:"Co-author", title:"Semantic-Aware Security Protocol Design for 6G Non-Terrestrial Networks: A Formal Verification Approach", venue:"International Journal on Semantic Web and Information Systems, 21(1), 1–38", href:"https://doi.org/10.4018/IJSWIS.379723" },
  { year:"2025", role:"Co-author", title:"Enhancing Roaming Security in Cloud-Native 5G Core Network Through Deep Learning-Based Intrusion Detection System", venue:"Computer Modeling in Engineering & Sciences, 145(2), 2733–2760", href:"https://doi.org/10.32604/cmes.2025.072611" },
  { year:"2025", role:"Co-author", title:"Evaluating Transport Layer Security 1.3 Optimization Strategies for 5G Cross-Border Roaming: A Comprehensive Security and Performance Analysis", venue:"Sensors, 25(19), 6144", href:"https://doi.org/10.3390/s25196144" },
  { year:"2024", role:"First Author", title:"Formal Security Reassessment of the 5G-AKA-FS Protocol: Methodological Corrections and Augmented Verification Techniques", venue:"Sensors, 24(24), 7979", href:"https://doi.org/10.3390/s24247979" },
  { year:"2024", role:"First Author", title:"Mitigating Security Vulnerabilities in 6G Networks: A Comprehensive Analysis of the DMRN Protocol Using SVO Logic and ProVerif", venue:"Applied Sciences, 14(21), 9726", href:"https://doi.org/10.3390/app14219726" },
  { year:"2024", role:"First Author", title:"Toward an Era of Secure 5G Convergence Applications: Formal Security Verification of 3GPP AKMA with TLS 1.3 PSK Option", venue:"Applied Sciences, 14(23), 11152", href:"https://doi.org/10.3390/app142311152" },
  { year:"2023", role:"Co-author", title:"SMDFBS: Specification-Based Misbehavior Detection for False Base Stations", venue:"Sensors, 23(23), 9504", href:"https://doi.org/10.3390/s23239504" },
  { year:"2021", role:"First Author", title:"Drone Secure Communication Protocol for Future Sensitive Applications in Military Zone", venue:"Sensors, 21(6), 2057", href:"https://doi.org/10.3390/s21062057" },
  { year:"2020", role:"Co-author", title:"An Optimal Security Management Framework for Backhaul-Aware 5G-Vehicle to Everything (V2X)", venue:"Journal of Internet Technology, 21(1), 245–260", href:"https://doi.org/10.3966/160792642020012101021" },
  { year:"2018", role:"Co-author", title:"Behavior and Vulnerability Assessment of Drones-Enabled Industrial Internet of Things (IIoT)", venue:"IEEE Access, 6, 43368–43383", href:"https://doi.org/10.1109/ACCESS.2018.2856368" },
];

const conferences: Publication[] = [
  { year:"2025", role:"Co-author", title:"Formal Verification of Consumer Remote SIM Provisioning Common Mutual Authentication Using BAN Logic", venue:"IEEE ICCT-Pacific", href:"https://doi.org/10.1109/ICCT-Pacific63901.2025.11012784" },
  { year:"2024", role:"Co-author", title:"Formal Verification of 5GAKA-LCCO Protocol Supporting Forward Secrecy: Through Expanded BAN Logic", venue:"MobiSec 2024, CCIS 2095, 18–36", href:"https://doi.org/10.1007/978-981-97-4465-7_2" },
  { year:"2024", role:"Co-author", title:"Decentralized Real-Time IIoT Data Integrity Verification System and Its Comprehensive Analysis", venue:"DSPP 2024, 156–164", href:"https://doi.org/10.1007/978-981-97-8546-9_9" },
];

const projects = [
  ["2026", "양자보안 기반 5G 특화망 기기 식별 기술 및 시험검증 기술 개발", "학생연구자"],
  ["2024–2026", "특화망·기업망 통합보안을 위한 5G 특화망 보안 기술개발", "학생연구자"],
  ["2024–2026", "5G 특화망을 위한 개방형 로밍 기술 개발", "학생연구자"],
  ["2024–2026", "이동통신 및 AirGap 환경에서 스니핑 방지 기술 개발", "학생연구자"],
  ["2023–2025", "안전한 차세대 IoT 통신 환경 구축을 위한 양자내성암호 최적화 및 보안 프로토콜 적용 연구", "학생연구자"],
];

const assetPrefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function PublicationList({ items }: { items: Publication[] }) {
  return <ol className="bibliography">{items.map((item, index) => <li key={item.title}>
    <span className="pub-index">{index + 1}.</span>
    <div><a href={item.href} target="_blank" rel="noreferrer"><strong>{item.title}</strong></a><p><em>{item.venue}</em>, {item.year}. <span className="role">{item.role}</span></p></div>
  </li>)}</ol>;
}

export default function Home() {
  return <main id="top">
    <SiteHeader />

    <div className="cv-shell">
      <aside className="sidebar">
        <img className="cv-photo" src="https://static.wixstatic.com/media/6e2229_56c12669c6f746fb91937a6916d22944~mv2.png/v1/fill/w_400,h_448,al_c,lg_1,q_90/6e2229_56c12669c6f746fb91937a6916d22944~mv2.png" alt="고용호 프로필 사진" />
        <p className="side-label">CONTACT</p>
        <ul className="link-list"><li><a href="https://scholar.google.co.kr/citations?user=dybtsxwAAAAJ" target="_blank" rel="noreferrer">Google Scholar ↗</a></li><li><a href="https://github.com/yonghoko" target="_blank" rel="noreferrer">GitHub ↗</a></li><li><a href="https://github.com/yonghoko/ProVerif" target="_blank" rel="noreferrer">ProVerif Models ↗</a></li></ul>
        <p className="side-label">RESEARCH AREAS</p><ul className="plain-list"><li>5G / 6G Security</li><li>Authentication Protocols</li><li>Formal Verification</li><li>Post-Quantum Cryptography</li><li>eSIM & Roaming Security</li></ul>
        <p className="side-label">METHODS & TOOLS</p><ul className="plain-list"><li>ProVerif</li><li>AVISPA · Scyther</li><li>BAN · Expanded SVO</li><li>Security Benchmarking</li></ul>
      </aside>

      <article className="cv-content">
        <section className="identity" id="profile"><p className="overline">ACADEMIC CURRICULUM VITAE</p><h1>고용호 <span>Yongho Ko</span></h1><p className="position">Ph.D. Candidate · Kookmin University</p><p className="summary">5G·6G 이동통신 보안을 중심으로 인증 및 키 합의 프로토콜, 형식 검증, 양자내성암호 전환을 연구합니다. 표준 프로토콜의 보안 속성을 분석하고 형식 검증 결과를 구현 및 성능 평가와 연결하는 연구를 수행합니다.</p><div className="metrics"><div><b>17</b><span>SCI Journal Articles</span></div><div><b>3</b><span>SCOPUS Papers</span></div><div><b>3</b><span>Granted Patents</span></div><div><b>1</b><span>Standard</span></div></div></section>

        <section className="cv-section"><h2>Education</h2><div className="entries"><div className="entry"><time>Present</time><div><h3>Ph.D. Candidate in Information Security</h3><p>Kookmin University, Seoul, Republic of Korea</p><small>Research: Mobile Network Security, Authentication Protocols, Formal Verification</small></div></div><div className="entry"><time>Master&apos;s</time><div><h3>Information Security</h3><p>Soonchunhyang University, Asan, Republic of Korea</p><small>Research: UAV Security and Authentication Protocols</small><a className="thesis-link" href={`${assetPrefix}/theses/espmu-efficient-security-protocol-military-uav.pdf`} target="_blank" rel="noreferrer"><span>MASTER&apos;S THESIS</span>미래전에 대비한 군수분야 UAV 환경을 위한 효율적인 보안 프로토콜 연구 ↗</a></div></div><div className="entry"><time>Bachelor&apos;s</time><div><h3>Information Security</h3><p>Soonchunhyang University, Asan, Republic of Korea</p><a className="thesis-link" href={`${assetPrefix}/papers/internet-router-firmware-update-vulnerability-analysis.pdf`} target="_blank" rel="noreferrer"><span>BACHELOR&apos;S THESIS</span>인터넷 공유기 펌웨어 업데이트 취약점 분석 ↗</a></div></div></div></section>

        <section className="cv-section" id="experience"><h2>Professional Experience</h2><div className="entries"><div className="entry experience-entry"><time>2020.06<br/>— 2023.08</time><div><span className="organization-type">PUBLIC ENTERPRISE</span><h3>제주국제자유도시개발센터 (JDC)</h3><p>대리 · 국토교통부 산하 공기업</p></div></div></div></section>

        <section className="cv-section"><h2>Research Profile</h2><div className="research-columns"><div><h3>Mobile Network Authentication</h3><p>5G-AKA, EAP-AKA′, AKMA, RSP, N32 roaming 및 TLS 계열 프로토콜의 보안 분석과 개선.</p></div><div><h3>Formal Security Verification</h3><p>기밀성, 무결성, 상호 인증, 순방향 비밀성, 재전송 안전성 및 unlinkability 검증.</p></div><div><h3>Post-Quantum Migration</h3><p>PQC 및 하이브리드 ECDH∥KEM 구조의 보안성·성능·배포 제약 분석.</p></div></div></section>

        <section className="cv-section" id="publications"><div className="section-title-row"><h2>Journal Publications</h2><a href="https://scholar.google.co.kr/citations?user=dybtsxwAAAAJ" target="_blank" rel="noreferrer">Google Scholar에서 전체 보기 ↗</a></div><PublicationList items={journals} /><p className="under-review"><span>UNDER REVIEW</span> SCI(E) 논문 8편 심사 중</p></section>
        <section className="cv-section"><h2>Conference Publications</h2><PublicationList items={conferences} /></section>

        <section className="cv-section" id="projects"><div className="section-title-row"><h2>Selected Research Projects</h2><Link href="/projects">전체 프로젝트 이력 보기 →</Link></div><div className="entries compact">{projects.map(([year,title,role]) => <div className="entry" key={title}><time>{year}</time><div><h3>{title}</h3><p>{role}</p></div></div>)}</div></section>

        <section className="cv-section" id="awards"><div className="section-title-row"><h2>Honors & Awards</h2><span className="section-note">수상 5건</span></div>
          <ol className="award-list">
            <li><time>2025</time><span className="award-badge international">국제</span><div><h3>Best Special Session Paper Award</h3><a className="award-paper" href="https://di0zxmb8pwajl.cloudfront.net/kiisc/conference/mobisec2025/programbook/64.pdf" target="_blank" rel="noreferrer">A Hybrid EDHOC Protocol ↗</a><p>The 9th International Conference on Mobile Internet Security (MobiSec 2025) · Sapporo, Japan</p></div></li>
            <li><time>2025</time><span className="award-badge external">대외</span><div><h3>우수학생연구자상</h3><p>한국정보통신기술협회 (TTA)</p></div></li>
            <li><time>2024</time><span className="award-badge international">국제</span><div><h3>Best Student Paper Award</h3><a className="award-paper" href="https://doi.org/10.1007/978-981-97-8546-9_9" target="_blank" rel="noreferrer">Decentralized Real-Time IIoT Data Integrity Verification System and Its Comprehensive Analysis ↗</a><p>2nd International Conference on Data Security and Privacy Protection (DSPP 2024) · Xi&apos;an, China</p></div></li>
            <li><time>2017</time><span className="award-badge external">대외</span><div><h3>우수논문상</h3><a className="award-paper" href={`${assetPrefix}/papers/lightweight-authentication-protocol-for-implantable-medical-devices.pdf`} target="_blank" rel="noreferrer">체내 이식형 의료기기를 위한 경량화 인증 프로토콜 설계 및 정형화 검증 ↗</a><p>The 5th Workshop on Convergent and Smart Media Systems (CSMS 2017) · Korean Institute of Smart Media</p></div></li>
            <li><time>2017</time><span className="award-badge university">교내</span><div><h3>공과대학 학술제 은상</h3><a className="award-paper" href={`${assetPrefix}/papers/internet-router-firmware-update-vulnerability-analysis.pdf`} target="_blank" rel="noreferrer">인터넷 공유기 펌웨어 업데이트 취약점 분석 ↗</a><p>순천향대학교 공과대학</p></div></li>
          </ol>
        </section>

        <section className="cv-section" id="outputs"><div className="section-title-row"><h2>Intellectual Property & Standards</h2><span className="section-note">해외 등록 1 · 국내 등록 2 · 표준 1</span></div>
          <ol className="credential-list">
            <li><span className="credential-badge overseas">해외 등록</span><span className="credential-id">US11914720B2</span><div><a href="https://patents.google.com/patent/US11914720B2/en" target="_blank" rel="noreferrer">Method for verifying drone included in industrial Internet of Things system, by using Petri-net modeling ↗</a><small>미국 등록특허 · PCT/KR2019/095005 기반 미국 국내단계 등록</small></div></li>
            <li><span className="credential-badge domestic">국내 등록</span><span className="credential-id">KR102491151B1</span><a href="https://doi.org/10.8080/1020210110719" target="_blank" rel="noreferrer">무인 항공기 보안 프로토콜 시스템 및 그 방법 ↗</a></li>
            <li><span className="credential-badge domestic">국내 등록</span><span className="credential-id">KR102050230B1</span><a href="https://doi.org/10.8080/1020180075812" target="_blank" rel="noreferrer">페트리 넷 모델링을 이용한 산업용 사물 인터넷 시스템에 구비되는 드론의 검증방법 ↗</a></li>
            <li><span className="credential-badge standard">표준</span><span className="credential-id">TTAK.KO-12.0431</span><a href="https://committee.tta.or.kr/standard/standard.jsp?commit_code=PG503&firstDepthCode=TC5&nowPage=1&secondDepthCode=PG503&thirdDepthCode=null" target="_blank" rel="noreferrer">산업 전반에 적용되는 5G 특화망 보안 요구사항 ↗</a></li>
          </ol>
        </section>
      </article>
    </div>
    <footer><span>Yongho Ko · Academic CV</span><a href="#top">Back to top ↑</a></footer>
  </main>;
}
