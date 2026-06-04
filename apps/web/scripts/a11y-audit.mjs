/**
 * WCAG 2.1 AA scan via axe-core + Playwright.
 * Usage: node scripts/a11y-audit.mjs [baseUrl]
 * Requires dev server running (pnpm dev).
 */
import { chromium } from "playwright";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { AxeBuilder } = require("@axe-core/playwright");

const baseUrl = process.argv[2] ?? "http://localhost:3000";
const paths = [
  "/en",
  "/en/billion-dollar-challenge",
  "/en/finfest",
  "/en/events",
  "/en/contact",
  "/en/leadership",
];

const run = async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const allViolations = [];

  for (const path of paths) {
    const url = `${baseUrl}${path}`;
    await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const violations = results.violations.map((v) => ({
      path,
      id: v.id,
      impact: v.impact,
      description: v.description,
      help: v.help,
      helpUrl: v.helpUrl,
      nodes: v.nodes.length,
    }));

    allViolations.push(...violations);
    console.log(
      `\n${path}: ${results.violations.length} violations, ${results.passes.length} passes`,
    );
    for (const v of violations) {
      console.log(`  [${v.impact}] ${v.id} (${v.nodes} nodes) — ${v.help}`);
    }
  }

  await browser.close();

  const byId = new Map();
  for (const v of allViolations) {
    const key = v.id;
    if (!byId.has(key)) byId.set(key, { ...v, paths: [v.path] });
    else byId.get(key).paths.push(v.path);
  }

  console.log("\n=== Summary (unique rules) ===");
  for (const [, v] of [...byId.entries()].sort(
    (a, b) => (b.impact ?? "").localeCompare(a.impact ?? ""),
  )) {
    console.log(`[${v.impact}] ${v.id} on ${v.paths.join(", ")}`);
  }

  process.exit(allViolations.length > 0 ? 1 : 0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
