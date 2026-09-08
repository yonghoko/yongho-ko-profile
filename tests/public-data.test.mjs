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
});
