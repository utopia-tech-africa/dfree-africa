import { nextJsConfig } from "@repo/eslint-config/next-js";
import { config as reactConfig } from "@repo/eslint-config/react-internal";
import studioConfig from "@sanity/eslint-config-studio";

const webFiles = ["apps/web/**/*.{js,jsx,ts,tsx}"];
const studioFiles = ["apps/studio/**/*.{js,jsx,ts,tsx,mjs}"];
const packageFiles = ["packages/**/*.{js,jsx,ts,tsx}"];

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/build/**",
      "**/.turbo/**",
    ],
  },
  ...nextJsConfig.map((c) => ({ ...c, files: webFiles })),
  ...studioConfig.map((c) => ({ ...c, files: studioFiles })),
  ...reactConfig.map((c) => ({ ...c, files: packageFiles })),
];
