import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../app/cv/page.tsx", import.meta.url), "utf8");
const entry = (id) => source.match(new RegExp(`<li>[^\\n]*?${id}</span>(.*?)</li>`))?.[1];

test("KR102050230B1 links to Google Patents while keeping its title and badge", () => {
  const item = entry("KR102050230B1");
  assert.ok(item);
  assert.ok(item.includes('href="https://patents.google.com/patent/KR102050230B1/ko"'));
  assert.ok(!source.includes("doi.org/10.8080/1020180075812"));
  assert.ok(item.includes("페트리 넷 모델링을 이용한 산업용 사물 인터넷 시스템에 구비되는 드론의 검증방법 ↗"));
  assert.ok(source.includes('<span className="credential-badge domestic">국내 등록특허</span><span className="credential-id">KR102050230B1</span>'));
});

test("pending application 10-2025-0032876 shows the official Korean title as a patent link", () => {
  const item = entry("10-2025-0032876");
  assert.ok(item);
  assert.equal(
    item,
    '<a href="https://doi.org/10.8080/1020250032876" target="_blank" rel="noreferrer">하이브리드 양자내성암호 기반 순방향 비밀성 지원 통신 장치 및 방법 ↗</a>',
  );
  assert.ok(!source.includes("Hybrid Post Quantum Cryptography Based 5G Authentication Protocol"));
});

test("the US patent entry is untouched", () => {
  const item = entry("US11914720B2");
  assert.ok(item);
  assert.ok(item.includes('href="https://patents.google.com/patent/US11914720B2/en"'));
  assert.ok(item.includes("Method for verifying drone included in industrial Internet of Things system, by using Petri-net modeling ↗"));
});

test("patent counts in the section note are unchanged", () => {
  assert.ok(source.includes("미국 등록특허 1 · 국내 등록특허 2 · 국내 출원특허 1 · 표준 1"));
});
