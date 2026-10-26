"use client";
import { useState } from "react";
import { projects } from "../../data/projects";
import { SiteFooter, SiteHeader } from "../site-header";

const groups = [
  { id:"doctoral", label:"박사 · 국민대학교", match:"박사/", count:28 },
  { id:"masters", label:"석사 · 순천향대학교", match:"석사/", count:18 },
  { id:"undergraduate", label:"학사 · 순천향대학교", match:"학사/", count:9 },
];

const summary: [string, string][] = [
  ["참여 이력", "55"],
  ["연구 과제", "35"],
  ["참여 기간", "2016–2026"],
];

const fold = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, "");

export default function ProjectsPage() {
  const [stage, setStage] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const needle = fold(query);
  const visible = groups
    .filter(group => stage === null || stage === group.id)
    .map(group => ({
      group,
      rows: projects
        .filter(project => project.stage.startsWith(group.match) && (!needle || fold(project.title).includes(needle)))
        .sort((a, b) => b.no - a.no),
    }))
    .filter(entry => entry.rows.length > 0);
  const shown = visible.reduce((total, entry) => total + entry.rows.length, 0);

  return <main id="top">
    <SiteHeader />

    <div className="wrap" id="main-content" tabIndex={-1}>
      <header className="page-head">
        <p className="overline">RESEARCH EXPERIENCE</p>
        <h1>Research Projects</h1>
        <p className="lead">학사과정부터 박사과정까지 참여한 연구 프로젝트를 과정별로 기록했습니다. 동일 과제는 연차와 단계에 따라 각각의 참여 이력으로 구분했습니다.</p>
        <dl className="proj-summary">{summary.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      </header>

      <section className="split" aria-labelledby="records-h">
        <div className="split-head">
          <p className="overline">PROJECT RECORDS</p>
          <h2 id="records-h">전체 참여 이력<span className="serif" lang="en">All records</span></h2>
          <p>번호는 원본 기록 순서입니다.</p>
        </div>
        <div>
          <div className="proj-tools">
            <div className="filters" role="group" aria-label="과정별 보기" style={{ margin: 0 }}>
              <button className="chip" type="button" aria-pressed={stage === null} onClick={() => setStage(null)}>전체 <b>55</b></button>
              {groups.map(group => <button className="chip" key={group.id} type="button" aria-pressed={stage === group.id} onClick={() => setStage(stage === group.id ? null : group.id)}>{group.label} <b>{group.count}</b></button>)}
            </div>
            <div className="field">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>
              <label className="sr-only" htmlFor="project-q">과제명 검색</label>
              <input id="project-q" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="과제명 검색 (예: 5G, UAV)" autoComplete="off" />
              {query && <button className="clear" type="button" onClick={() => setQuery("")} aria-label="검색어 지우기">×</button>}
            </div>
          </div>
          <p className="filter-status" aria-live="polite">{shown}건 표시 · 전체 참여 이력 {projects.length}건</p>
          {visible.length > 0 ? visible.map(({ group, rows }) => <section className="proj-group" id={group.id} key={group.id} aria-label={group.label}>
            <h3>{group.label} <small>{rows.length}건</small></h3>
            <ol className="proj-list">{rows.map(project => <li key={project.no}><span className="no">{String(project.no).padStart(2, "0")}</span><span className="t">{project.title}</span><time>{project.years}</time></li>)}</ol>
          </section>) : <p className="empty">“{query}”와 일치하는 과제가 없습니다.</p>}
        </div>
      </section>
    </div>

    <SiteFooter label="Yongho Ko · Research Projects" />
  </main>;
}
