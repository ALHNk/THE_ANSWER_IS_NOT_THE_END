import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import type { Plugin } from "vite";
import react from "@vitejs/plugin-react";

// Everything in docs/essay/*.pdf is copied into dist/essay/ at build time,
// so the PDF stored in the repository is what GitHub Pages serves.
const essayDir = path.resolve(__dirname, "docs/essay");
const essayFile = fs.existsSync(essayDir)
  ? fs
      .readdirSync(essayDir)
      .filter((f) => /\.pdf$/i.test(f))
      .sort()[0]
  : undefined;

function essayPdf(): Plugin {
  return {
    name: "essay-pdf",
    apply: "build",
    closeBundle() {
      if (!essayFile) {
        console.warn(
          "[essay-pdf] No PDF found in docs/essay/ - download button hidden.",
        );
        return;
      }
      const out = path.resolve(__dirname, "dist/essay");
      fs.mkdirSync(out, { recursive: true });
      fs.copyFileSync(
        path.join(essayDir, essayFile),
        path.join(out, essayFile),
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), essayPdf()],
  base: "/THE_ANSWER_IS_NOT_THE_END/",
  define: {
    __ESSAY_PDF__: JSON.stringify(
      essayFile ? "essay/" + encodeURIComponent(essayFile) : null,
    ),
  },
});
