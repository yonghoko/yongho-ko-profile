"use client";
import { useEffect, useState } from "react";

export type CvSection = { id: string; label: string };

export function SectionNav({ sections }: { sections: CvSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-20% 0px -70% 0px" });
    const targets = sections.map(section => document.getElementById(section.id)).filter((node): node is HTMLElement => node !== null);
    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
  }, [sections]);
  return <nav className="toc" aria-label="CV 목차">
    <ol>{sections.map(section => <li key={section.id}><a className={section.id === active ? "is-active" : undefined} href={`#${section.id}`} aria-current={section.id === active ? "true" : undefined}>{section.label}</a></li>)}</ol>
  </nav>;
}
