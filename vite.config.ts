import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import type { Plugin } from "vite";
import react from "@vitejs/plugin-react";

// First *.pdf found in a docs folder, or undefined
const firstPdf = (dir: string) => {
  const abs = path.resolve(__dirname, dir);
  return fs.existsSync(abs)
    ? fs.readdirSync(abs).filter((f) => /\.pdf$/i.test(f)).sort()[0]
    : undefined;
};
const essayFile = firstPdf("docs/essay");
const posterFile = firstPdf("docs/poster");

// Copies docs/essay/*.pdf -> dist/essay/ and docs/poster/*.pdf -> dist/poster/
function docPdfs(): Plugin {
  return {
    name: "doc-pdfs",
    apply: "build",
    closeBundle() {
      for (const [dir, file] of [
        ["essay", essayFile],
        ["poster", posterFile],
      ] as const) {
        if (!file) continue;
        const out = path.resolve(__dirname, "dist", dir);
        fs.mkdirSync(out, { recursive: true });
        fs.copyFileSync(
          path.resolve(__dirname, "docs", dir, file),
          path.join(out, file),
        );
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), docPdfs()],
  base: "/THE_ANSWER_IS_NOT_THE_END/",
  define: {
    __ESSAY_PDF__: JSON.stringify(
      essayFile ? "essay/" + encodeURIComponent(essayFile) : null,
    ),
    __POSTER_PDF__: JSON.stringify(
      posterFile ? "poster/" + encodeURIComponent(posterFile) : "poster.pdf",
    ),
  },
});