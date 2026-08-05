#!/usr/bin/env node
/**
 * Build + dry-run pack content check (does not publish).
 */
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";

function run(cmd) {
  return execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
}

console.log("==> build");
run("npm run build");

const requiredDist = ["dist/yoshinani-form-schema.js", "dist/index.d.ts"];
for (const path of requiredDist) {
  if (!existsSync(path)) {
    console.error(`missing: ${path}`);
    process.exit(1);
  }
}

console.log("==> npm pack --dry-run --json");
const packed = JSON.parse(run("npm pack --dry-run --json"));
const files = new Set((packed[0]?.files ?? []).map((f) => f.path));
console.log([...files].sort().join("\n"));

const mustInclude = [
  "dist/yoshinani-form-schema.js",
  "dist/index.d.ts",
  "schemas/x-ys-extensions.json",
  "README.md",
  "README_ja.md",
  "LICENSE",
];
const mustExclude = [
  "src/index.ts",
  "docs/vocabulary.md",
  "src/index.test.ts",
  "examples/contact.schema.json",
  "examples/japan-lookups.schema.json",
  "examples/structured-inputs.schema.json",
];

for (const item of mustInclude) {
  if (!files.has(item)) {
    console.error(`pack missing expected path: ${item}`);
    process.exit(1);
  }
}
for (const item of mustExclude) {
  if (files.has(item)) {
    console.error(`pack unexpectedly includes: ${item}`);
    process.exit(1);
  }
}

console.log("pack:check ok (dry-run only, not published)");
