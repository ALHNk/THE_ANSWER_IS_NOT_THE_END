import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { members, questions } from "./content";

type Step = {
  id: string;
  label: string;
  target: string;
  button?: string;
  expanded?: boolean;
  pressed?: boolean;
  modal?: boolean;
};

// Each stop is a meaningful element or an explicit state of an exhibit.
// Navigation never follows external links, edits text, or submits a form.
export const presentationSteps: Step[] = [
  {
    id: "opening",
    label: "The apparently perfect answer",
    target: "#main-title",
    button: ".why-note",
    expanded: false,
  },
  {
    id: "why",
    label: "Reveal the question behind the mark",
    target: ".hero-exhibit",
    button: ".why-note",
    expanded: true,
  },
  { id: "purpose", label: "Our learning question", target: ".intro-statement" },
  {
    id: "literature",
    label: "Reading and literature",
    target: "#literature .scene-heading",
  },
  ...["Didaktik", "Constructive alignment", "Educational purposes"].map(
    (name, i) => ({
      id: `lens-${i}`,
      label: name,
      target: ".concept-detail",
      button: `.concept-nodes button:nth-child(${i + 1})`,
    }),
  ),
  {
    id: "comparison",
    label: "Didaktik and alignment: expanded comparison",
    target: ".comparison-grid",
  },
  {
    id: "survey",
    label: "Four survey results · N=22",
    target: ".survey-block",
  },
  {
    id: "survey-table",
    label: "All reported survey items",
    target: ".table-wrap",
  },
  {
    id: "reflections",
    label: "Five distinct perspectives",
    target: "#reflections .scene-heading",
  },
  ...members.flatMap((member, i) => {
    const card = `.member-card:nth-child(${i + 1})`;
    return [
      {
        id: `member-${i}`,
        label: `${member.name}: starting point and revised view`,
        target: `${card} h3`,
      },
      {
        id: `member-${i}-doubt`,
        label: `${member.name}: doubt and next practice`,
        target: `${card} details > .mini-label`,
      },
      {
        id: `member-${i}-sources`,
        label: `${member.name}: source trail and limitations`,
        target: `${card} .source-slip`,
      },
    ];
  }),
  {
    id: "reflection-synthesis",
    label: "What the comparison changed",
    target: ".reflection-synthesis",
  },
  {
    id: "feedback",
    label: "Learning from feedback",
    target: "#feedback .scene-heading",
  },
  {
    id: "feedback-theory",
    label: "Feedback and self-regulation",
    target: "#feedback > .two-col",
  },
  {
    id: "revision-before",
    label: "Revision example: before",
    target: ".revision-pair article:first-child",
    button: ".revision-controls button:first-child",
    pressed: true,
  },
  {
    id: "revision-after",
    label: "Revision example: qualified claim",
    target: ".revision-pair article:last-child",
    button: ".revision-controls button:last-child",
    pressed: true,
  },
  {
    id: "feedback-loop",
    label: "Notice, interpret, change, justify",
    target: ".feedback-loop",
  },
  {
    id: "process",
    label: "Poster development and presentation",
    target: "#process .scene-heading",
  },
  ...[
    "Select the question",
    "Distinguish the evidence",
    "Rehearse the explanation",
  ].map((label, i) => ({
    id: `process-${i}`,
    label,
    target: `.process-lane li:nth-child(${i + 1})`,
  })),
  {
    id: "communication",
    label: "Clarity as accountability",
    target: ".process-takeaway",
  },
  {
    id: "assessment",
    label: "Learning through assessment",
    target: "#assessment .scene-heading",
  },
  ...[
    "A polished final essay",
    "A revision log with reasons",
    "A short oral explanation",
  ].map((label, i) => ({
    id: `evidence-${i}`,
    label,
    target: ".choice-explanation",
    button: `.evidence-choices button:nth-child(${i + 1})`,
  })),
  {
    id: "game",
    label: "Interactive: balance the course",
    target: ".game-head",
  },
  {
    id: "rubric",
    label: "Five equal rubric dimensions",
    target: ".rubric-strip",
  },
  {
    id: "conclusion",
    label: "Critical conclusion",
    target: "#conclusion .scene-heading",
  },
  {
    id: "paper-before",
    label: "Return to the first answer",
    target: ".closing-paper .answer-paper",
    button: ".closing-paper button",
    pressed: false,
  },
  {
    id: "paper-after",
    label: "Reveal what changed",
    target: ".closing-paper .answer-paper",
    button: ".closing-paper button",
    pressed: true,
  },
  {
    id: "changed",
    label: "From visible results to visible reasoning",
    target: ".conclusion-copy",
  },
  {
    id: "proposal",
    label: "A proposed course sequence",
    target: ".final-proposal",
  },
  {
    id: "limits",
    label: "What could fail, and the limits of the evidence",
    target: ".final-proposal + p",
  },
  {
    id: "ending",
    label: "Explain, question, revise and defend",
    target: ".end-line",
  },
  {
    id: "references",
    label: "Academic references",
    target: ".sources .bibliography",
  },
  {
    id: "authorship",
    label: "Course evidence and authorship",
    target: ".source-columns > div:last-child",
  },
  {
    id: "disclosure",
    label: "Citation practice, privacy and AI disclosure",
    target: ".sources details > p",
  },
  { id: "qa", label: "Defense questions", target: "dialog h2", modal: true },
  ...questions.map(([label], i) => ({
    id: `question-${i}`,
    label,
    target: `dialog details:nth-of-type(${i + 1}) > p`,
    modal: true,
  })),
  { id: "finish", label: "End of the guided path", target: ".footer-bottom" },
];

export function usePresentationNavigation(
  root: RefObject<HTMLDivElement | null>,
) {
  const position = useRef(-1);
  const highlighted = useRef<HTMLElement | null>(null);
  const [current, setCurrent] = useState<{
    index: number;
    label: string;
  } | null>(null);

  useEffect(() => {
    const scope = root.current;
    if (!scope) return;
    const clear = () => {
      position.current = -1;
      highlighted.current?.removeAttribute("data-presentation-active");
      highlighted.current = null;
      setCurrent(null);
    };
    const nearest = () => {
      const modal = scope.querySelector<HTMLDialogElement>("dialog[open]");
      if (!modal && window.scrollY < 80) return 0;
      let best = 0;
      let distance = Infinity;
      presentationSteps.forEach((step, index) => {
        if (Boolean(step.modal) !== Boolean(modal)) return;
        const element = scope.querySelector<HTMLElement>(step.target);
        if (!element?.getClientRects().length) return;
        const rect = element.getBoundingClientRect();
        const value = Math.abs(rect.top - window.innerHeight * 0.22);
        if (value < distance) {
          distance = value;
          best = index;
        }
      });
      return best;
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "PageDown" && event.key !== "PageUp") return;
      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.defaultPrevented
      )
        return;
      const origin = event.target;
      if (
        origin instanceof Element &&
        origin.closest(
          "input,textarea,select,[contenteditable]:not([contenteditable='false']),[role='textbox']",
        )
      )
        return;
      event.preventDefault();
      if (event.repeat) return;
      const base = position.current < 0 ? nearest() : position.current;
      const index = Math.max(
        0,
        Math.min(
          presentationSteps.length - 1,
          base + (event.key === "PageDown" ? 1 : -1),
        ),
      );
      const step = presentationSteps[index];
      const dialog = scope.querySelector<HTMLDialogElement>("dialog");
      if (step.modal && dialog && !dialog.open) dialog.showModal();
      if (!step.modal && dialog?.open) dialog.close();
      const button = step.button
        ? scope.querySelector<HTMLButtonElement>(step.button)
        : null;
      if (button) {
        if (step.expanded !== undefined) {
          if (
            (button.getAttribute("aria-expanded") === "true") !==
            step.expanded
          )
            button.click();
        } else if (step.pressed !== undefined) {
          if ((button.getAttribute("aria-pressed") === "true") !== step.pressed)
            button.click();
        } else button.click();
      }
      const element = scope.querySelector<HTMLElement>(step.target);
      if (!element) return;
      // Open native disclosures before measuring or focusing their contents.
      for (
        let parent = element.parentElement;
        parent && parent !== scope;
        parent = parent.parentElement
      ) {
        if (parent instanceof HTMLDetailsElement) parent.open = true;
      }
      highlighted.current?.removeAttribute("data-presentation-active");
      element.setAttribute("data-presentation-active", step.id);
      highlighted.current = element;
      position.current = index;
      setCurrent({ index, label: step.label });
      // State updates from a button click must commit before scrolling to its text.
      requestAnimationFrame(() => {
        if (highlighted.current !== element) return;
        if (!element.hasAttribute("tabindex"))
          element.setAttribute("tabindex", "-1");
        element.focus({ preventScroll: true });
        element.scrollIntoView({ behavior: "instant", block: "start" });
      });
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", clear);
    window.addEventListener("wheel", clear, { passive: true });
    window.addEventListener("touchstart", clear, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", clear);
      window.removeEventListener("wheel", clear);
      window.removeEventListener("touchstart", clear);
      highlighted.current?.removeAttribute("data-presentation-active");
    };
  }, [root]);
  return { current, total: presentationSteps.length };
}
