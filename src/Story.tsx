import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { chapters, members, questions, references } from "./content";
import Introduction from "./scenes/Introduction";
import Literature from "./scenes/Literature";
import Reflections from "./scenes/Reflections";
import Feedback from "./scenes/Feedback";
import Process from "./scenes/Process";
import Assessment from "./scenes/Assessment";
import Conclusion from "./scenes/Conclusion";
import { usePresentationNavigation } from "./presentation";

export default function Story() {
  const root = useRef<HTMLDivElement>(null);
  const presentation = usePresentationNavigation(root);
  const dialog = useRef<HTMLDialogElement>(null);
  const qaButton = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [menu, setMenu] = useState(false);
  useLayoutEffect(() => {
    const key = "he-pedagogy-scroll";
    const save = () => {
      try {
        sessionStorage.setItem(
          key,
          JSON.stringify({ y: window.scrollY, hash: location.hash }),
        );
      } catch {
        /* Storage may be disabled. Native anchors still work. */
      }
    };
    const frame = requestAnimationFrame(() => {
      const nav = performance.getEntriesByType("navigation")[0] as
        PerformanceNavigationTiming | undefined;
      let restored = false;
      if (nav?.type === "reload") {
        try {
          const raw = sessionStorage.getItem(key);
          if (raw) {
            const saved = JSON.parse(raw);
            if (saved.hash === location.hash && typeof saved.y === "number") {
              window.scrollTo({ top: saved.y, behavior: "instant" });
              restored = true;
            }
          }
        } catch {
          /* Fall through to the anchor. */
        }
      }
      if (!restored && location.hash) {
        const id = decodeURIComponent(location.hash.slice(1));
        document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
      }
    });
    window.addEventListener("pagehide", save);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pagehide", save);
    };
  }, []);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("main > section[id]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const n = chapters.findIndex((c) => c.id === visible[0].target.id);
          if (n >= 0) setActive(n);
        }
      },
      { rootMargin: "-15% 0px -50% 0px", threshold: [0, 0.1, 0.3] },
    );
    elements.forEach((x) => observer.observe(x));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    let dispose = () => {};
    const animate = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        const ctx = gsap.context(() => {
          gsap.to(".hero-exhibit .answer-paper", {
            rotation: -1,
            y: -42,
            ease: "none",
            scrollTrigger: {
              trigger: ".opening",
              start: "top top",
              end: "800 top",
              scrub: true,
            },
          });
          gsap.to(".why-note", {
            rotation: 8,
            y: 30,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero-grid",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
          gsap.fromTo(
            ".closing-paper .answer-paper",
            { rotation: 5 },
            {
              rotation: -2,
              ease: "none",
              scrollTrigger: {
                trigger: ".conclusion",
                start: "top bottom",
                end: "center center",
                scrub: true,
              },
            },
          );
        }, root);
        return () => ctx.revert();
      });
      const ctx = gsap.context(() => {
        gsap.utils.toArray<SVGRectElement>(".data-bar").forEach((bar) =>
          gsap.fromTo(
            bar,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: ".survey-chart",
                start: "top 92%",
                end: "center 65%",
                scrub: true,
              },
            },
          ),
        );
      }, root);
      dispose = () => {
        mm.revert();
        ctx.revert();
      };
    };
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(() => void animate(), { timeout: 800 })
      : window.setTimeout(() => void animate(), 80);
    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      dispose();
    };
  }, [reduced]);
  const closeDialog = () => {
    dialog.current?.close();
    qaButton.current?.focus();
  };
  return (
    <div
      ref={root}
      className={reduced ? "story reduced" : "story"}
      data-chapter={active}
    >
      <a href="#main" className="skip-link">
        Skip to the story
      </a>
      <header className="site-header">
        <a
          className="brand"
          href="#introduction"
          aria-label="Fieldnotes, back to introduction"
        >
          <span className="brand-symbol" aria-hidden="true">
            ✳
          </span>
          <span>
            FIELDNOTES<small>ON LEARNING / 2026</small>
          </span>
        </a>
        <span className="header-center">THE ANSWER IS NOT THE END.</span>
        <div className="header-controls">
          <button onClick={() => setReduced(!reduced)} aria-pressed={reduced}>
            {reduced ? "Motion off" : "Skip animation"}
          </button>
          <a href="./poster.html">Poster ↗</a>
          <button ref={qaButton} onClick={() => dialog.current?.showModal()}>
            Q&A <span aria-hidden="true">＋</span>
          </button>
          <button
            className="menu-toggle"
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            Chapters
          </button>
        </div>
      </header>
      <nav
        className={"chapter-nav " + (menu ? "expanded" : "")}
        aria-label="Story chapters"
      >
        {chapters.map((c, i) => (
          <a
            key={c.id}
            href={"#" + c.id}
            onClick={() => setMenu(false)}
            aria-current={i === active ? "location" : undefined}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            <span>{c.short}</span>
            <i aria-hidden="true" />
          </a>
        ))}
      </nav>
      <aside className="margin-progress" aria-hidden="true">
        <span>THE LEARNING IS IN THE MARGINS</span>
        <div>
          {chapters.map((c, i) => (
            <i className={i <= active ? "marked" : ""} key={c.id} />
          ))}
        </div>
        <b>0{active + 1}/07</b>
      </aside>
      <main id="main">
        <Introduction />
        <Literature />
        <Reflections />
        <Feedback />
        <Process />
        <Assessment />
        <Conclusion />
      </main>
      <aside
        className="presentation-hint no-print"
        aria-label="Keyboard presentation controls"
      >
        <span>
          <kbd>PgUp</kbd> previous element <span aria-hidden="true">/</span>{" "}
          <kbd>PgDn</kbd> next element
        </span>
        <span role="status" aria-live="polite" aria-atomic="true">
          {presentation.current
            ? `${presentation.current.index + 1} / ${presentation.total} · ${presentation.current.label}`
            : "Guided path · no clicking needed"}
        </span>
      </aside>
      <footer id="sources" className="sources">
        <p className="eyebrow">THE SOURCE TRAIL</p>
        <h2>
          Nothing here is
          <br />
          <em>an unmarked invention.</em>
        </h2>
        <div className="source-columns">
          <div>
            <h3>Academic references</h3>
            <ol className="bibliography">
              {references.map((r) => (
                <li id={r.id} key={r.id}>
                  <a href={r.url} target="_blank" rel="noreferrer">
                    {r.label} ↗
                  </a>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3>Course evidence & authorship</h3>
            <p>
              Group: AAI-2606M · Astana IT University. Course: Pedagogy of
              Higher Education. Instructor: Peter Shon.
            </p>
            <p>{members.map((m) => m.name).join(" · ")}.</p>
            <p>
              Submitted group essay:{" "}
              <em>
                Beyond the Right Answer: Balancing Didaktik, Student Agency, and
                Authentic Assessment in Higher Education
              </em>
              , 1 November 2026. Survey figures reproduced from the full
              transcription in <code>00_FINAL_POSTER_BASELINE.md</code>, section
              4. Original final PDF was not present at the supplied path; no
              claim of independent PDF verification is made.
            </p>
            <p>
              Reflective sources: exact filenames and scan pages appear in the
              five dossiers. The complete record{" "}
              <code>05_REFLECTIVE_NOTES_COMPLETE.md</code> and essay comparison{" "}
              <code>06_INDIVIDUAL_ESSAYS_EVIDENCE_MAP.md</code> support
              interpretation. Original archive files and available syllabus were
              inspected locally.
            </p>
            <details>
              <summary>
                Citation practice, privacy & AI disclosure <span>＋</span>
              </summary>
              <p>
                Personal accounts are paraphrased and attributed. Handwritten
                themes were visually checked; no handwritten quotations are
                used. The book’s chapters are cited via the supplied course
                synthesis; the complete book was unavailable for independent
                page verification.
              </p>
              <p>
                This local artifact uses AI assistance for research
                organisation, copy synthesis, design, code and test authoring.
                Students must confirm personal interpretations and defend the
                academic analysis. No generated testimony or survey responses
                are presented. Original CSS/SVG illustrations are editorial
                metaphors.
              </p>
              <p>
                No trackers, remote fonts, backend, authentication or runtime
                data services. No source document is published with this site.
                Classroom material requires written permission before public
                distribution. No public hosting was configured.
              </p>
            </details>
            <a className="text-button no-print" href="./credits.html">
              Asset credits & implementation disclosure ↗
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>LEARNING ABOUT HE PEDAGOGY / FINAL EXAM</span>
          <a href="#introduction">Return to the question ↑</a>
          <span>LOCAL COURSE EDITION</span>
        </div>
      </footer>
      <dialog
        ref={dialog}
        onClose={() => qaButton.current?.focus()}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeDialog();
        }}
      >
        <div className="dialog-top">
          <span className="eyebrow">DEFENSE NOTES</span>
          <button
            onClick={closeDialog}
            aria-label="Close questions and answers"
          >
            Close ×
          </button>
        </div>
        <h2>
          A question is
          <br />
          <em>a place to begin.</em>
        </h2>
        {questions.map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <span>＋</span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
        <p className="small">
          Evidence-led prompts for discussion. The group provides its own oral
          response.
        </p>
      </dialog>
    </div>
  );
}
