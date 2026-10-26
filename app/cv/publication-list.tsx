"use client";
import { useState } from "react";
import { countLeadPublications, isLeadAuthor } from "./publication-stats";

export type JournalArticle = { year: string; title: string; venue: string; role: string; href: string; quartile?: string };

type Filter = "all" | "lead" | "top5";

export function PublicationItem({ item }: { item: JournalArticle }) {
  return <li className="pub">
    <span className="pub-year">{item.year}</span>
    <div>
      <h3><a href={item.href} target="_blank" rel="noreferrer">{item.title}</a></h3>
      <p className="pub-venue">{item.venue}</p>
      <span className="badges">
        <span className={`role${isLeadAuthor(item) ? " first-author" : ""}`}>{item.role}</span>
        {item.quartile && <span className={`quartile-badge${item.quartile === "Q1 Top 5%" ? " top-five" : ""}`}>{item.quartile}</span>}
      </span>
    </div>
  </li>;
}

export function JournalArticles({ items }: { items: JournalArticle[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const counts = {
    all: items.length,
    lead: countLeadPublications(items),
    top5: items.filter(item => item.quartile === "Q1 Top 5%").length,
  };
  const chips: { key: Filter; label: string }[] = [
    { key: "all", label: "전체" },
    { key: "lead", label: "주저자" },
    { key: "top5", label: "Q1 Top 5%" },
  ];
  const shown = items.filter(item => filter === "all" || (filter === "lead" ? isLeadAuthor(item) : item.quartile === "Q1 Top 5%"));
  return <>
    <div className="filters" role="group" aria-label="논문 필터">
      {chips.map(chip => <button className="chip" key={chip.key} type="button" aria-pressed={filter === chip.key} onClick={() => setFilter(chip.key)}>{chip.label} <b>{counts[chip.key]}</b></button>)}
    </div>
    <p className="filter-status" aria-live="polite">{filter === "all" ? `전체 ${counts.all}편 · 주저자 ${counts.lead}편` : filter === "lead" ? `주저자 ${counts.lead}편 · 제1저자 또는 교신저자` : `${counts.all}편 중 ${shown.length}편 표시`}</p>
    <ol className="pubs">{shown.map(item => <PublicationItem item={item} key={item.title} />)}</ol>
  </>;
}
