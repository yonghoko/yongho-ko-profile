import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = readFileSync(new URL("../app/wine/search.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } });
const context = { exports: {} };
vm.runInNewContext(outputText, context);
const { matchesWine, foodShortcuts } = context.exports;
const wine = { name: "Château Example 2020", pairings: ["새우구이", "크림 파스타", "닭고기 구이"] };

test("wine search ignores accents, case and whitespace", () => {
  assert.equal(matchesWine(wine, " CHATEAU example ", "name"), true);
  assert.equal(matchesWine(wine, "2020", "name"), true);
  assert.equal(matchesWine(wine, "새우", "name"), false);
});
test("food search is separate and supports shortcut categories", () => {
  for (const query of ["해산물", "새우", "새우 구이", "파스타", "닭고기"]) {
    assert.equal(matchesWine(wine, query, "pairing"), true, query);
  }
  assert.equal(matchesWine(wine, "Château", "pairing"), false);
  assert.equal(matchesWine(wine, "치즈", "pairing"), false);
  assert.equal(matchesWine({name:"A",pairings:["로스트 치킨"]}, "닭고기", "pairing"), true);
  assert.equal(matchesWine({name:"A",pairings:["소고기 스튜"]}, "소고기", "pairing"), true);
  assert.equal(foodShortcuts.length, 5);
});
test("empty queries show all wines and missing foods are safe", () => {
  for (const mode of ["name", "pairing"]) assert.equal(matchesWine(wine, "  ", mode), true);
  assert.equal(matchesWine({name:"A"}, "해산물", "pairing"), false);
});
