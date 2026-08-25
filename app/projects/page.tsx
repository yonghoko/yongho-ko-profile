import { projects } from "../../data/projects";
import { SiteHeader } from "../site-header";

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

export default function ProjectsPage(){return <main id="top"><SiteHeader />
  <section className="page-head"><p className="overline">RESEARCH EXPERIENCE</p><h1>Research Projects</h1><p>학사과정부터 박사과정까지 참여한 연구 프로젝트를 과정별로 기록했습니다. 동일 과제는 연차와 단계에 따라 각각의 참여 이력으로 구분했습니다.</p><div className="project-summary"><span><b>55</b> 참여 이력</span><span><b>35</b> 연구 과제</span><span><b>2016–2026</b> 참여 기간</span></div>
  <div className="project-jump">{groups.map(g=><a key={g.id} href={`#${g.id}`}>{g.label} <b>{g.count}</b></a>)}</div></section>
  <div className="project-groups">{groups.map(g=>{const rows=projects.filter(p=>p.stage.startsWith(g.match)).sort((a,b)=>b.no-a.no);return <section id={g.id} className="project-group" key={g.id}><div className="project-group-head"><p className="overline">PROJECT RECORDS</p><h2>{g.label}</h2><span>{rows.length}건</span></div><div className="project-list">{rows.map(p=><article key={p.no}><div className="project-no">{String(p.no).padStart(2,"0")}</div><div><h3>{p.title}</h3><p className="project-meta">{participationYears(p.participation)}</p></div></article>)}</div></section>})}</div>
  <footer><span>Yongho Ko · Research Projects</span><a href="#top">Back to top ↑</a></footer></main>}
