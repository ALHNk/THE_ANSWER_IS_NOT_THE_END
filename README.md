# The answer is not the end

A private/local one-page academic storytelling site for **Learning about HE Pedagogy**, AAI-2606M, Astana IT University. Seven explicit final-exam sections; five equally weighted rubric dimensions. No backend, keys, trackers, remote fonts, source-document uploads or public hosting.

## Run locally

Requires Node.js 22.12+ (Node 24 was tested) and npm. Open a terminal in this folder:

```powershell
npm install
npm run dev
```

Open the printed `http://127.0.0.1:5173/` URL. The server binds to loopback. On Windows, `Start Local.cmd` provides the same workflow. Stop with Ctrl+C.

```powershell
npm run build
npm run preview
```

The production build is in `dist/`; preview normally uses port 4173. Serve that directory over HTTP; do not double-click the React index.html under file://. The separate `public/poster.html` works directly and without JavaScript. `public/poster.pdf` is the printable single-sheet composition.

## Validate / export

```powershell
npm run lint
npm run build
npm run test
```

Tests use Microsoft Edge on Windows. Elsewhere run `npx playwright install chromium` first. To select an installed channel, set `PLAYWRIGHT_CHANNEL`. Tests start/reuse the production preview on 4173.

To regenerate the static poster: `node scripts/generate-poster.mjs`. To export its PDF, start the dev server, then run `npm run poster` in a second terminal. Set `POSTER_ORIGIN` for a different local origin. Browser PDF export uses explicit 594×420mm page dimensions. This is a design choice, not an inferred examination size. Build again after exporting to copy the PDF into dist.

## Downloads, PDFs and the game (GitHub Actions deployment)

- **Essay PDF.** Put the essay PDF in `docs/essay/` (currently `Group_Critical_Analysis_Essay.pdf`). `npm run build` copies the first `*.pdf` in that folder to `dist/essay/`, and the "Downloads" block in the page footer, the header **PDFs ↓** link and the poster toolbar all point to it. If the folder has no PDF, the essay buttons disappear instead of 404-ing.
- **Poster PDF.** The GitHub Actions workflow installs Chromium after the build and runs `npm run poster:dist`, which renders `dist/poster.html` to `dist/poster.pdf` (594 x 420 mm). The PDF therefore always matches the current poster. If that step fails, the site still deploys with the `public/poster.pdf` fallback. To refresh the fallback locally: `npm run dev`, then `npm run poster`.
- **Game: "Balance the course".** Lives inside chapter 06 (`src/scenes/BalanceGame.tsx`, data and scoring in `src/game.ts`). Five rounds, one per presenter; each choice trades Structure, Agency, Fairness and Teacher time. It is an illustrative model, not survey data. It is one step in the PgDn/PgUp route ("Interactive: balance the course"); the game itself is hidden from print.

## Present without clicking

**Page Down / Page Up** move forward/backward through individual story elements. The route switches concept lenses, opens comparisons and all five source dossiers, shows before/after revisions, selects each assessment option, compares the final paper and opens the Q&A one answer at a time. The current element is outlined and its label/count appears at the bottom. The keys stop at the first/last element, without wrapping.

Normal scrolling and chapter links remain available. After manual navigation, the next Page key resumes near the visible content. Inside text inputs, textareas, selects and editable fields, Page keys retain normal editing behavior. Holding a key does not skip multiple elements.

## Explore

- Use seven chapter links; on phones open **Chapters**.
- Click concept lenses, unfold comparisons and source trails, compare revisions, choose assessment evidence and reveal the returning paper.
- **Skip animation** supports a still presentation; OS reduced-motion preference is respected.
- **Q&A** opens a native modal. Escape closes it and returns keyboard focus.
- Team working fields remain only in memory. They are not uploaded, saved or represented as evidence until the team adds its own record.

## Source structure

`src/Story.tsx` owns navigation, motion lifecycle and source/Q&A panels. `src/scenes/` contains seven modules. `src/content.ts` holds typed survey data, concept explanations, named reflective evidence, bibliography and Q&A; scene modules compose the narrative. `src/styles.css` defines the paper/margin system, responsive layouts and print styles. `public/poster.html` and PDF supply the static academic poster. `public/credits.html` provides AI/asset disclosure. `scripts/generate-poster.mjs` builds the source-linked poster; `tests/story.spec.ts` exercises meaningful flows.

## Documentation

- [Experience brief](docs/experience-brief.md) and [storyboard](docs/storyboard.md)
- [Research and inspiration](docs/research-and-inspiration.md), including actual demo failures and license checks
- [Content evidence ledger](docs/content-evidence-map.md) and [rubric mapping](docs/rubric-map.md)
- [Five-speaker defense tour](docs/defense-tour.md)
- [Validation report](docs/validation-report.md), screenshots and machine-readable test results in qa/
- [Deployment guidance](docs/deployment.md) and [asset credits](docs/asset-credits.md)

The original final essay PDF and full book were not present in the local package. Essay figures use the supplied full baseline transcription; book chapter interpretation uses the course synthesis. Original note files/scans and the available syllabus were inspected. Exact source and verification limits are documented.

AI assisted implementation and source synthesis. The group must confirm its personal interpretations and defend the academic claims. No generated participant statements or survey responses are presented.
