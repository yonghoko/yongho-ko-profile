import Link from "next/link";
import { projects } from "../../data/projects";

const groups = [
  { id:"doctoral", label:"박사 · 국민대학교", match:"박사/", count:28 },
  { id:"masters", label:"석사 · 순천향대학교", match:"석사/", count:18 },
  { id:"undergraduate", label:"학사 · 순천향대학교", match:"학사/", count:9 },
];

function participationYears(period:string){
  const years=period.match(/(?:19|20)\d{2}/g)||[];
  const first=years[0];
  const last=years.at(-1);
  return first&&last&&first!==last?`${first} ~ ${last}`:first||"";
}

export default function ProjectsPage(){return <main id="top"><header className="topbar"><Link className="wordmark" href="/"><strong>Yong9</strong><small>MOBILE SECURITY RESEARCHER</small></Link><nav aria-label="Main navigation"><Link href="/">Home</Link><Link href="/cv">Academic CV</Link><Link href="/projects">Projects</Link><Link href="/wine">Wine Notes</Link></nav></header>
  <section className="page-head"><p className="overline">RESEARCH EXPERIENCE</p><h1>Research Projects</h1><p>학사부터 박사과정까지 참여한 연구 프로젝트를 과정별로 정리했습니다. 동일 과제의 연차·단계별 참여 이력은 각각 표시합니다.</p><div className="project-summary"><span><b>55</b> 참여 이력</span><span><b>35</b> 연구 과제</span><span><b>2016–2026</b> 참여 기간</span></div>
  <div className="project-jump">{groups.map(g=><a key={g.id} href={`#${g.id}`}>{g.label} <b>{g.count}</b></a>)}</div></section>
  <div className="project-groups">{groups.map(g=>{const rows=projects.filter(p=>p.stage.startsWith(g.match)).sort((a,b)=>b.no-a.no);return <section id={g.id} className="project-group" key={g.id}><div className="project-group-head"><p className="overline">PROJECT RECORDS</p><h2>{g.label}</h2><span>{rows.length}건</span></div><div className="project-list">{rows.map(p=><article key={p.no}><div className="project-no">{String(p.no).padStart(2,"0")}</div><div><h3>{p.title}</h3><p className="project-meta">{participationYears(p.participation)} · {p.role}</p></div></article>)}</div></section>})}</div>
  <footer><span>Yongho Ko · Research Projects</span><a href="#top">Back to top ↑</a></footer></main>}
