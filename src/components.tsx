import { useState } from "react";
import type { ReactNode } from "react";
import { chapters } from "./content";

export function SceneHeading({
  index,
  kicker,
  children,
}: {
  index: number;
  kicker: string;
  children: ReactNode;
}) {
  return (
    <header className="scene-heading">
      <p className="eyebrow">
        <span>{String(index + 1).padStart(2, "0")} / 07</span> {kicker}
      </p>
      <p className="required-label">{chapters[index].title}</p>
      <h2>{children}</h2>
    </header>
  );
}
export function Cite({
  children,
  to = "sources",
}: {
  children: ReactNode;
  to?: string;
}) {
  return (
    <a className="citation" href={"#" + to}>
      {children} ↗
    </a>
  );
}
export function AnswerPaper({
  annotated = false,
  mini = false,
}: {
  annotated?: boolean;
  mini?: boolean;
}) {
  return (
    <div
      className={`answer-paper ${annotated ? "annotated" : ""} ${mini ? "mini" : ""}`}
      aria-label={
        annotated
          ? "Answer sheet with questions, reasoning and revision"
          : "An apparently perfect answer sheet; an editorial metaphor"
      }
    >
      <div className="paper-top">
        <span>HE PEDAGOGY</span>
        <span>EXHIBIT 01</span>
      </div>
      <div className="paper-score">
        {annotated ? "?" : "100"}
        <small>{annotated ? "OPEN TO REVISION" : "/ 100"}</small>
      </div>
      <p className="paper-task">Q. What makes good teaching?</p>
      <p className="paper-answer">
        Clear objectives.
        <br />
        Correct answers.
        <br />
        Excellent results.
      </p>
      <div className="paper-rules" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <span className="paper-tick" aria-hidden="true">
        ✓
      </span>
      {annotated && (
        <div className="paper-annotations">
          <span>Whose purposes?</span>
          <span>Show the reasoning.</span>
          <span>What changed your mind?</span>
        </div>
      )}
      <span className="paper-bottom">
        A CLAIM IS THE BEGINNING OF AN ENQUIRY.
      </span>
    </div>
  );
}
export function TeamRecord({ kind }: { kind: "feedback" | "presentation" }) {
  const [value, setValue] = useState("");
  return (
    <details className="team-record no-print">
      <summary>
        Add team record <span>＋</span>
      </summary>
      <label htmlFor={kind + "-record"}>
        {kind === "feedback"
          ? "Comment → interpretation → change → lesson"
          : "Decision → experience → lesson → next time"}
      </label>
      <textarea
        id={kind + "-record"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Your course record"
        rows={4}
      />
      <p className="small">
        Private working field. Kept only while this page stays open.
      </p>
    </details>
  );
}
