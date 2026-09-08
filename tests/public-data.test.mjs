import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

function loadData(name) {
  const source = readFileSync(new URL(`../data/${name}.ts`, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  });
  const context = { exports: {}, process: { env: {} } };
  vm.runInNewContext(outputText, context);
  return JSON.parse(JSON.stringify(context.exports));
}

test("projects contain only public display fields and year-level periods", () => {
  const { projects } = loadData("projects");
  assert.equal(projects.length, 55);
  for (const project of projects) {
    assert.deepEqual(Object.keys(project).sort(), ["no", "stage", "title", "years"]);
    assert.match(project.years, /^\d{4}( ~ \d{4})?$/);
  }
  assert.equal(new Set(projects.map((project) => project.no)).size, 55);
  assert.equal(projects.filter((project) => project.stage.startsWith("박사/")).length, 28);
  assert.equal(projects.filter((project) => project.stage.startsWith("석사/")).length, 18);
  assert.equal(projects.filter((project) => project.stage.startsWith("학사/")).length, 9);
});

test("conference data contains only displayed fields and selection metadata", () => {
  const { conferencePublications } = loadData("conference-publications");
  const allowed = new Set(["date", "title", "authors", "venue", "role", "details", "doi", "selected"]);
  for (const publication of conferencePublications) {
    for (const key of Object.keys(publication)) assert.ok(allowed.has(key), `Unexpected field: ${key}`);
  }
  assert.equal(new Set(conferencePublications.map((item) => item.title)).size, conferencePublications.length);
});

test("Dangin Fays keeps its existing photo and requested price range", () => {
  const { wines } = loadData("wines");
  const wine = wines.find((item) => item.name === "Dangin Fays Brut Luminous");
  assert.ok(wine);
  assert.equal(wine.price, "13-14만원");
  assert.equal(wine.image, "/wines/pf-champagne-brut.jpg");
  assert.equal(wine.producer, undefined);
  assert.equal(wine.body, undefined);
  assert.equal(wine.acidity, undefined);
});

test("every existing wine has three distinct food suggestions", () => {
  const { wines } = loadData("wines");
  assert.equal(wines.length, 104);
  for (const wine of wines) {
    assert.equal(wine.pairings?.length, 3, wine.name);
    assert.equal(new Set(wine.pairings).size, 3, wine.name);
    assert.ok(wine.pairings.every((food) => typeof food === "string" && food.trim()), wine.name);
  }
});

test("pairings distinguish white Cabernet, sweet wines, and Chardonnay styles", () => {
  const { wines } = loadData("wines");
  const find = (name) => wines.find((wine) => wine.name === name).pairings;
  assert.ok(find("Radacini Blanc de Cabernet 2020").includes("흰살생선 구이"));
  assert.notDeepEqual(find("Bread & Butter Chardonnay 2020"), find("La Manufacture Chablis 2020"));
  assert.notDeepEqual(find("Thomas Schmitt Kabinett Riesling 2020"), find("Thomas Schmitt Private Collection Riesling Dry 2020"));
  assert.deepEqual(find("Dangin Fays Brut Luminous"), ["해산물 요리", "샐러드", "초밥"]);
});
