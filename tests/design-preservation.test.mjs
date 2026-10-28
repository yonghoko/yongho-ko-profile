import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const root = fileURLToPath(new URL("../", import.meta.url));
const nativeRequire = createRequire(import.meta.url);

// Render the actual page components without a Next server. Only the framework's
// routing wrapper is substituted; publication and drink data remain the real data.
function loadModule(relativePath, suffix = "") {
  const filename = path.resolve(root, relativePath);
  const source = readFileSync(filename, "utf8") + suffix;
  const compiledModule = { exports: {} };
  const localRequire = (specifier) => {
    if (specifier === "next/link") return { __esModule: true, default: function Link({ children, ...props }) { return React.createElement("a", props, children); } };
    if (specifier === "next/navigation") return { usePathname: () => "/cv" };
    if (specifier.startsWith(".")) {
      const base = path.resolve(path.dirname(filename), specifier);
      const resolved = [base, `${base}.tsx`, `${base}.ts`].find(candidate => existsSync(candidate));
      assert.ok(resolved, `Cannot resolve ${specifier} from ${filename}`);
      return loadModule(path.relative(root, resolved));
    }
    return nativeRequire(specifier);
  };
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  });
  vm.runInNewContext(outputText, { module: compiledModule, exports: compiledModule.exports, require: localRequire, process: { env: {} }, console }, { filename });
  return compiledModule.exports;
}

function escapeText(text) {
  return renderToStaticMarkup(React.createElement("span", null, String(text))).replace(/^<span>|<\/span>$/g, "");
}

test("lead-author totals include first and corresponding authors without double counting", () => {
  const { journals } = loadModule("app/cv/publication-data.ts");
  const { countLeadPublications, isLeadAuthor } = loadModule("app/cv/publication-stats.ts");
  assert.equal(journals.length, 17);
  assert.equal(countLeadPublications(journals), 8);
  assert.equal(journals.filter(item => item.role === "First Author").length, 7);
  assert.equal(journals.filter(item => item.role === "Corresponding Author").length, 1);
  assert.equal(isLeadAuthor({ role: "First Author & Corresponding Author" }), true);
  assert.equal(isLeadAuthor({ role: "Co-author" }), false);
  assert.equal(countLeadPublications([
    { href: "same-doi", role: "First Author" }, { href: "same-doi", role: "Corresponding Author" },
  ]), 1);
  const CV = loadModule("app/cv/page.tsx").default;
  const html = renderToStaticMarkup(React.createElement(CV));
  assert.ok(html.includes("주저자 8편"));
  assert.ok(html.includes("주저자 <b>8</b>"));
  assert.ok(html.includes("Corresponding Author"));
});

test("home preserves B timeline, contacts, research references and four current projects", () => {
  const Home = loadModule("app/page.tsx").default;
  const html = renderToStaticMarkup(React.createElement(Home));
  assert.ok(html.includes("주저자 논문 8편 중 주요 연구 4편을 소개합니다."));
  assert.ok(!html.includes("SCI 저널 논문 17편 가운데 제1저자 논문 4편."));
  const timeline = html.match(/<ol class="path">([\s\S]*?)<\/ol>/)?.[1];
  assert.ok(timeline);
  assert.equal((timeline.match(/<li[ >]/g) || []).length, 6);
  for (const text of ["국직CERT", "학사", "석사", "2017–2018", "제주국제자유도시개발센터", "사이버보안학과 박사과정"]) assert.ok(timeline.includes(text));
  for (const href of ["mailto:koyh0911@gmail.com", "https://github.com/yonghoko/ProVerif"]) assert.ok(html.includes(`href="${href}"`));
  const currentProjects = loadModule("data/projects.ts").projects.filter(item => item.years === "2026");
  assert.equal(currentProjects.length, 4);
  for (const item of currentProjects) assert.ok(html.includes(escapeText(item.title)));
  assert.ok(html.includes('href="/wine#alpha-box-dice-apostle"'));
  const ProjectsPage = loadModule("app/projects/page.tsx").default;
  const projectHtml = renderToStaticMarkup(React.createElement(ProjectsPage));
  const featured = projectHtml.match(/<ol class="selected-proj">([\s\S]*?)<\/ol>/)?.[1];
  assert.ok(featured);
  assert.equal((featured.match(/<li[ >]/g) || []).length, 5);
  assert.ok(projectHtml.includes("55건 표시"));
});

test("home research threads feature three distinct non-MDPI lead-author top-ranked papers", () => {
  const Home = loadModule("app/page.tsx").default;
  const { journals, journalQuartiles } = loadModule("app/cv/publication-data.ts");
  const { isLeadAuthor } = loadModule("app/cv/publication-stats.ts");
  const html = renderToStaticMarkup(React.createElement(Home));
  const threads = html.match(/<ol class="threads">([\s\S]*?)<\/ol>/)?.[1];
  assert.ok(threads);
  const links = [...threads.matchAll(/href="(https:\/\/doi\.org\/[^"\s]+)"/g)].map(match => match[1]);
  assert.deepEqual(links, [
    "https://doi.org/10.1109/TCE.2026.3686773",
    "https://doi.org/10.1016/j.aej.2025.12.049",
    "https://doi.org/10.1109/JIOT.2026.3678536",
  ]);
  for (const href of links) {
    const publication = journals.find(item => item.href === href);
    assert.ok(publication && isLeadAuthor(publication));
    assert.equal(journalQuartiles[href], "Q1 Top 5%");
    assert.ok(!href.includes("10.3390/"));
  }
});

test("Wine Notes renders the complete 107-wine collection and original image bindings", () => {
  const { wines } = loadModule("data/wines.ts");
  const Page = loadModule("app/wine/page.tsx").default;
  const html = renderToStaticMarkup(React.createElement(Page));
  assert.equal(wines.length, 107);
  for (const wine of wines) {
    assert.ok(html.includes(escapeText(wine.name)), `Missing wine name: ${wine.name}`);
    assert.ok(html.includes(`src="${escapeText(wine.image)}"`), `Missing wine photo: ${wine.name}`);
  }
  assert.ok(html.includes('href="/wine/beyond"'));
});

test("wine detail keeps every descriptive field, exact personal note, and filtered navigation controls", () => {
  const source = readFileSync(path.join(root, "app/wine/page.tsx"), "utf8");
  const ast = ts.createSourceFile("wine.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const detail = ast.statements.find(node => ts.isFunctionDeclaration(node) && node.parameters.some(parameter =>
    ts.isObjectBindingPattern(parameter.name) && parameter.name.elements.some(element => element.name.getText(ast) === "wine")));
  assert.ok(detail?.name, "Expected an independently renderable wine detail component");
  const { PreservationDetail } = loadModule("app/wine/page.tsx", `\nexport { ${detail.name.text} as PreservationDetail };`);
  const wine = { slug: "preservation-fixture", name: "Preservation Wine 2021", image: "/wines/fixture.jpg", vintage: 2021,
    producer: "Producer fixture", country: "Country fixture", region: "Region fixture", grapes: ["Grape A", "Grape B"],
    price: "13-14만원", aromas: ["Aroma A", "Aroma B"], palate: "Palate fixture", body: 2, acidity: 3, tannin: 4,
    pairings: ["Food A", "Food B", "Food C"], oneLine: "사용자가 남긴 한줄평 - 그대로 보존" };
  const html = renderToStaticMarkup(React.createElement(PreservationDetail, {
    wine, onClose() {}, onPrevious() {}, onNext() {}, position: 2, total: 3,
  }));
  for (const value of [wine.name, wine.vintage, wine.producer, wine.country, wine.region, ...wine.grapes,
    wine.price, ...wine.aromas, wine.palate, ...wine.pairings, wine.oneLine]) {
    assert.ok(html.includes(escapeText(value)), `Missing detail value: ${value}`);
  }
  for (const label of ["바디", "산도", "타닌", "이전 와인", "다음 와인", "닫기"]) assert.ok(html.includes(label), label);
  for (const value of [wine.body, wine.acidity, wine.tannin]) assert.ok(html.includes(`5점 중 ${value}점`));

  // Check every real note as well as the comprehensive fixture: preserved source
  // arrays alone do not prove that the UI still shows their full contents.
  const { wines } = loadModule("data/wines.ts");
  for (const record of wines) {
    const detailHtml = renderToStaticMarkup(React.createElement(PreservationDetail, {
      wine: record, onClose() {}, onPrevious() {}, onNext() {}, position: 1, total: wines.length,
    }));
    const values = [record.name, record.vintage, record.producer, record.country, record.region,
      ...(record.grapes ?? []), record.price, ...(record.aromas ?? []), record.palate,
      ...(record.pairings ?? []), record.oneLine].filter(value => value !== undefined && value !== null);
    for (const value of values) assert.ok(detailHtml.includes(escapeText(value)), `${record.slug}: missing ${value}`);
  }
});

test("wine navigation still integrates with browser Back and keyboard navigation", () => {
  const source = readFileSync(path.join(root, "app/wine/page.tsx"), "utf8");
  const ast = ts.createSourceFile("wine.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const calls = [];
  const strings = new Set();
  function visit(node) {
    if (ts.isCallExpression(node)) calls.push(node.expression.getText(ast).replace(/\?\./g, "."));
    if (ts.isStringLiteral(node)) strings.add(node.text);
    ts.forEachChild(node, visit);
  }
  visit(ast);
  for (const method of ["history.pushState", "history.replaceState", "history.back"]) {
    assert.ok(calls.some(call => call.endsWith(method)), `Missing ${method}`);
  }
  for (const event of ["popstate", "Escape", "ArrowLeft", "ArrowRight"]) assert.ok(strings.has(event), event);
  // Filtering and the two search modes must stay connected to the canonical matcher.
  assert.ok(calls.some(call => call.endsWith("matchesWine")));
  assert.ok(strings.has("name") && strings.has("pairing"));
});

test("Beyond Wine preserves all 29 names, full descriptions, categories, and photos", () => {
  const { drinks } = loadModule("data/drinks.ts");
  const Page = loadModule("app/wine/beyond/page.tsx").default;
  const html = renderToStaticMarkup(React.createElement(Page));
  assert.equal(drinks.length, 29);
  for (const drink of drinks) {
    for (const value of [drink.name, drink.description, drink.category]) assert.ok(html.includes(escapeText(value)), `${drink.slug}: ${value}`);
    assert.ok(html.includes(`src="${escapeText(drink.image)}"`), drink.slug);
  }
});

test("full publication archive preserves all 19 records and links paper titles only when DOI exists", () => {
  const { conferencePublications } = loadModule("data/conference-publications.ts");
  const Page = loadModule("app/publications/page.tsx").default;
  const html = renderToStaticMarkup(React.createElement(Page));
  assert.equal(conferencePublications.length, 19);
  const links = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)];
  for (const publication of conferencePublications) {
    for (const value of [publication.title, publication.authors, publication.venue, publication.date, publication.details].filter(Boolean)) {
      assert.ok(html.includes(escapeText(value)), `Missing publication field: ${value}`);
    }
    const titleLinks = links.filter(link => link[2].replace(/<[^>]*>/g, "").includes(escapeText(publication.title)));
    if (publication.doi) assert.ok(titleLinks.some(link => link[1].includes(`href="${escapeText(publication.doi)}"`)), publication.title);
    else assert.equal(titleLinks.length, 0, `Non-DOI publication should not be linked: ${publication.title}`);
  }
});

test("CV retains all selected conference records and the full archive route", () => {
  const { selectedConferencePublications } = loadModule("data/conference-publications.ts");
  const Page = loadModule("app/cv/page.tsx").default;
  const html = renderToStaticMarkup(React.createElement(Page));
  assert.equal(selectedConferencePublications.length, 4);
  for (const item of selectedConferencePublications) {
    for (const value of [item.title, item.authors, item.venue]) assert.ok(html.includes(escapeText(value)), `Selected conference missing: ${value}`);
  }
  assert.ok(html.includes('href="/publications"'));
  for (const pdf of ["/theses/espmu-efficient-security-protocol-military-uav.pdf", "/papers/internet-router-firmware-update-vulnerability-analysis.pdf", "/papers/lightweight-authentication-protocol-for-implantable-medical-devices.pdf"]) {
    assert.ok(html.includes(`href="${pdf}"`), `Missing PDF link: ${pdf}`);
  }
});
