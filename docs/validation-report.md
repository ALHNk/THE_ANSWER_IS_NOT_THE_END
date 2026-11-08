# Delivery and validation report

Validated locally on 8 November 2026. No public deployment or remote Git repository. The local Git source folder, lockfile, static dist build, static academic poster, PDF and documented defense path are delivered together.

## What is implemented

- One continuous route, seven explicit Appendix -7 chapters, one repeated examination-paper object and continuous red margin. Clear academic labels remain alongside narrative titles.
- Reversible scroll-linked paper and question-label depth, a CSS-sticky final paper, active chapter index and seven direct anchors. No scroll interception or forced advancement.
- Three source-backed concept lenses and an expandable Didaktik/alignment comparison.
- Five individually attributed reflective dossiers. Revised interpretations are visible before expansion; doubts, next practices and exact source files/pages unfold by click or keyboard.
- Accessible true-data SVG chart with four exact survey percentages, direction labels, means, N=22 and limitations. Phones receive large stacked DOM labels and bars. All nine reported items are in a table; no invented Item 8.
- Tap/range revision comparison with keyboard Home/End, distinctly illustrative copy; an evidence selector explains product/process/dialogue trade-offs without scoring the visitor.
- Final paper annotations can be compared with the opening. Q&A uses a native modal with Escape and focus restoration.
- Explicit motion control and OS reduced-motion support; static decorative fallback and full data labels. No hover-only evidence or runtime raster assets.
- Standalone `poster.html` needs no JavaScript; `poster.pdf` is **one page, 594×420mm landscape**, visually rendered and checked. All seven sections and five equal rubric dimensions appear.

## Actual checks and evidence

| Check | Result / evidence |
|---|---|
| `npm install` | Successful, exact resolved tree retained in package-lock.json |
| `npm run build` | TypeScript and Vite production build successful |
| `npm run lint` | Successful |
| `npm run test` | **14 Playwright tests passed**, including complete keyboard traversal in both directions; `qa/test-results.json` |
| Automated WCAG 2 A/AA and 2.1 AA scan | **0 violations** in desktop, expanded member dossiers and phone; `qa/accessibility.json` |
| Desktop / tablet / phone | 1440×900, 820×1180, 390×844; zero horizontal overflow in each; screenshots in qa/ |
| Keyboard | Concepts, native details, range Home/End, evidence selector, modal focus loop and Escape exercised |
| Navigation | Direct `#assessment`, reload, arbitrary 5000px scroll-position restoration and upward reversal tested |
| Reduced motion | OS emulation and explicit control tested; accurate bars remain visible with no transform |
| Missing images / network | Core remained usable with all images and external requests blocked; no external core requests observed |
| JavaScript disabled | Static poster has seven panels and survey directions; credits remain available |
| PDF | PyMuPDF confirmed one page, 1684.08×1191.12 PDF points; rendered to `qa/poster-pdf-render.png`, visually checked |
| Dependency audit | Zero vulnerabilities after scoped minimatch override; production audit also zero |

## Improvements made after observation

1. Phone SVG labels were too small. Replaced phone chart presentation with 15px text labels, explicit direction and adjacent percentage values; kept the accessible SVG for larger screens.
2. Reflections initially required expansion to see changed thinking. Moved every revised interpretation into the always-visible card body.
3. Browser hash targeting could occur before React created the scene. Added a post-commit anchor step and reload restoration using session-only scroll coordinates. Normal anchor navigation remains native.
4. Axe identified insufficient contrast on sage/lilac annotations and conclusion labels. Darkened those ink labels to #963222 and re-ran the scans successfully.
5. Initial print export inherited phone breakpoints and split the composition. Restricted those poster breakpoints to screen media and used explicit physical page dimensions. Enlarged poster body/source type and verified a single PDF sheet.
6. CPU-throttled inspection exposed animation-startup cost. Split GSAP and ScrollTrigger into deferred local chunks, scheduled after idle/initial rendering. Reduced initial JS gzip from approximately 130KB to 85KB; the core text and controls render independently of animation loading.
7. Removed unverified license assumptions from the research. No starter code was copied. The paused CherryTree deployment and mismatch between Atlas case study and linked live build are recorded, not treated as observed reference behavior.

## Performance measurements and limits

`scripts/measure-performance.mjs` records actual browser observations, not a Lighthouse score. Environment: local Edge/Chromium, 4× CPU throttle, unthrottled loopback network, no field users. Measurements are one small diagnostic run and can vary with machine load.

| Metric | Desktop | Phone viewport |
|---|---:|---:|
| Observed LCP | 1004ms | 792ms |
| Observed layout-shift score | 0 | 0 |
| Longest observed task, 4× throttle | 699ms | 590ms |
| JS heap after scripted chapter traversal | ~5.8MB | ~5.7MB |
| External core requests | 0 | 0 |

Build: main JS 271.8KB / 85.2KB gzip; deferred GSAP 70.9KB / 27.8KB gzip; deferred ScrollTrigger 43.7KB / 18.1KB gzip; CSS 37.1KB / 8.2KB gzip. No runtime images, audio, WebGL render loop or remote fonts. GSAP remains a material part of total JS; CPU-throttled startup still includes a long task. This does not establish real-laptop smoothness or a network performance guarantee. The non-animated and poster modes remain available for constrained hardware.

Axe reported two incomplete checks per state requiring human judgement; zero violations is not an accessibility certification. Real screen-reader, physical touch-device, projector and Firefox/Safari tests were not performed. Small source labels remain best read up close or in the source panel/PDF zoom. The PDF uses explicit named sources but is not a tagged accessible PDF; the semantic static HTML is the accessible fallback.

## Academic verification boundary

Survey numbers, directions and means match the baseline transcription; theory names and references match its bibliography. Original notes/scans and the available original syllabus were checked. Amina’s eight scanned pages and Alikhan’s one page are substantively represented, without unverifiable quotations. The renamed original final essay PDF and complete book were not present, so no independent final-PDF/book page verification is claimed. Fischer et al. metadata and abstract were also confirmed through the [University of Warwick institutional record](https://wrap.warwick.ac.uk/id/eprint/188394/). Full claim-level scope is in `content-evidence-map.md`.

The five-speaker route is a proposed defense plan. AI use is visible in the source panel and standalone credits. Named accounts remain a private course artifact; no public-hosting approval was inferred.

## Keyboard presentation and author correction

Temirlan confirmed his display name as **Temirlan Zholtayev**. The site, static poster, PDF, credits and defense path use that spelling. Source filenames retain their original spelling for traceability.

Page Down and Page Up now navigate individual narrative elements and exhibit states. The complete route was tested forward and backward without clicking: question reveal, all concept lenses, comparison, survey table, all five members' doubts and source trails, revision states, process decisions, three evidence options, returning-paper states, bibliography, disclosure and Q&A answers. Tests verify focus, visibility, actual selected/revealed state, first/last boundaries, editable-field behavior and resumption after direct chapter navigation. Holding a key does not skip repeated stops. A bottom status shows the current step and the element is outlined. Normal scrolling remains available.

The performance measurements above describe the initial delivery before the keyboard route was added. The updated build has approximately 278.5KB main JS / 87.3KB gzip and 38.3KB CSS / 8.5KB gzip; deferred animation chunks are unchanged. No new runtime dependency or external service was added.
