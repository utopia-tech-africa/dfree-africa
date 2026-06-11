import path from "node:path";

/** @type {import("lint-staged").Config} */
export default {
  "*.{ts,tsx,js,jsx,json,md}": (files) =>
    files.map((file) => `prettier --write "${file.replace(/\\/g, "/")}"`),
  "apps/web/**/*.{ts,tsx,js,jsx}": (files) =>
    files.map((file) => {
      const relativePath = path
        .relative(path.join(process.cwd(), "apps/web"), file)
        .replace(/\\/g, "/");

      return `pnpm --dir apps/web exec eslint --fix --max-warnings 0 "${relativePath}"`;
    }),
  "apps/studio/**/*.{ts,tsx,js,jsx,mjs}": (files) =>
    files.map((file) => {
      const relativePath = path
        .relative(path.join(process.cwd(), "apps/studio"), file)
        .replace(/\\/g, "/");

      return `pnpm --dir apps/studio exec eslint --fix "${relativePath}"`;
    }),
  "packages/**/*.{ts,tsx,js,jsx}": (files) =>
    files.map((file) => `eslint --fix "${file.replace(/\\/g, "/")}"`),
};
