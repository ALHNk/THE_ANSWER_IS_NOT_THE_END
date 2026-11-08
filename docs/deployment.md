# Local and private hosting

No registration, public deployment, GitHub remote, Vercel project, GitHub Pages or domain was created. The delivered Git repository is local. robots noindex is a crawler hint, not access control.

## Local classroom demonstration

1. `npm install`, then `npm run dev`.
2. Open the printed loopback URL on the presenting computer. Project that screen.
3. Keep `public/poster.pdf` available. Neither an internet connection nor an API key is needed for core content after dependencies are installed.
4. Stop with Ctrl+C. Do not change `--host 127.0.0.1` unless intentionally managing access to another machine.

## Reproducible static build

`npm run build` writes `dist/`. `npm run preview` serves it on loopback. All runtime assets use local paths and core content uses no fetch. External bibliography links need internet only when deliberately opened.

## If authorised to host later

Obtain written course and contributor permission before distributing named reflections or assessment content outside the course. Select hosting with real access control, audit its audience, and upload only the intended static dist files. Do not upload the original archive, scanned book, handwritten pages, research scratch files, credentials or private survey responses. Test direct anchors, asset base paths, reduced motion and poster availability on the final private URL. Public access requires a separate explicit decision and suitable content review. No automatic deployment workflow is included.
