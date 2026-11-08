import { narrative } from "../content";
import { useState } from "react";
import { AnswerPaper, Cite } from "../components";
export default function Introduction() {
  const [open, setOpen] = useState(false);
  return (
    <section
      id="introduction"
      className="scene opening"
      aria-labelledby="main-title"
    >
      <div className="hero-meta">
        <span>AN ENQUIRY INTO HIGHER EDUCATION PEDAGOGY</span>
        <span>AAI–2606M / ASTANA IT UNIVERSITY</span>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span>01 / 07</span> BEGIN WITH A DOUBT
          </p>
          <h1 id="main-title">
            THE ANSWER
            <br />
            <em>IS NOT</em>
            <br />
            THE END<span className="title-dot">.</span>
          </h1>
          <p className="hero-deck">
            A perfect answer can hide
            <br />
            an unfinished understanding.
          </p>
          <a href="#literature" className="round-link">
            <span>Follow the question</span>
            <b aria-hidden="true">↘</b>
          </a>
        </div>
        <div className="hero-exhibit">
          <span className="exhibit-tag">01 — THE FINISHED PRODUCT</span>
          <AnswerPaper />
          <button
            className="why-note"
            aria-expanded={open}
            aria-controls="why-answer"
            onClick={() => setOpen(!open)}
          >
            but <em>why?</em> <span aria-hidden="true">↗</span>
          </button>
          <p
            id="why-answer"
            className={"why-answer " + (open ? "is-open" : "")}
          >
            {open
              ? "A grade records a judgement. Where can we see the learner’s own reasoning?"
              : "Look closer. A mark is visible. The thinking is not."}
          </p>
          <span className="metaphor-label">
            The paper is a narrative metaphor,
            <br />
            not a student submission or survey finding.
          </span>
        </div>
      </div>
      <div className="opening-foot">
        <span>7 CHAPTERS / 5 PERSPECTIVES / 1 OPEN QUESTION</span>
        <span>
          SCROLL TO UNFOLD <b aria-hidden="true">↓</b>
        </span>
      </div>
      <div className="intro-statement">
        <p className="required-label">
          Introduction: Learning from HE Pedagogy Course
        </p>
        <h2>
          Can we make room for judgement
          <br />
          <em>without giving up structure?</em>
        </h2>
        <div className="two-col">
          <p>{narrative.introduction1}</p>
          <div>
            <p>{narrative.introduction2}</p>
            <Cite>Submitted essay; individual essays evidence map</Cite>
          </div>
        </div>
      </div>
    </section>
  );
}
