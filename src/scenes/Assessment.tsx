import { narrative } from "../content";
import { useState } from "react";
import { evidenceChoices, rubric } from "../content";
import { SceneHeading, Cite } from "../components";
import BalanceGame from "./BalanceGame";
export default function Assessment() {
  const [choice, setChoice] = useState(1);
  const item = evidenceChoices[choice];
  return (
    <section
      id="assessment"
      className="scene assessment"
      aria-labelledby="assessment-title"
    >
      <SceneHeading index={5} kicker="LOOK BEYOND THE PRODUCT">
        <span id="assessment-title">
          What would count
          <br />
          <em>as understanding?</em>
        </span>
      </SceneHeading>
      <div className="two-col">
        <p>{narrative.assessment1}</p>
        <div>
          <p>{narrative.assessment2}</p>
          <Cite to="boud">
            Boud & Falchikov (2006); Alua W6; submitted essay
          </Cite>
        </div>
      </div>
      <div className="assessment-lab">
        <div className="lab-heading">
          <span className="eyebrow">AN ASSESSMENT DESIGN EXPERIMENT</span>
          <span>NO SCORE. EXPLORE THE TRADE-OFF.</span>
        </div>
        <h3>The outcome: evaluate and revise a claim using evidence.</h3>
        <p>
          Choose an evidence form to inspect what it can and cannot establish.
        </p>
        <div
          className="evidence-choices"
          role="group"
          aria-label="Choose assessment evidence"
        >
          {evidenceChoices.map((x, i) => (
            <button
              key={x.name}
              aria-pressed={choice === i}
              onClick={() => setChoice(i)}
            >
              <small>
                0{i + 1} / {x.label}
              </small>
              <strong>{x.name}</strong>
              <span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
        <div className="choice-explanation" aria-live="polite">
          <span className="evidence-glyph" aria-hidden="true">
            {["□", "↻", "◌"][choice]}
          </span>
          <div>
            <p className="mini-label">WHAT IT REVEALS</p>
            <p>{item.explanation}</p>
            <p className="mini-label">DESIGN RESPONSIBLY</p>
            <p>{item.cost}</p>
          </div>
        </div>
        <div className="print-only">
          {evidenceChoices
            .filter((_, i) => i !== choice)
            .map((x) => (
              <p key={x.name}>
                <strong>{x.name}:</strong> {x.explanation} {x.cost}
              </p>
            ))}
        </div>
      </div>
      <p className="assessment-insight">
        The proposal is to <em>triangulate</em> a product, a process and an
        explanation. It is a design proposal, not an intervention tested by this
        survey.
      </p>
      <BalanceGame />
      <div className="rubric-strip">
        <p className="eyebrow">FIVE EQUAL RUBRIC DIMENSIONS · APPENDIX -7</p>
        <div>
          {rubric.map((x) => (
            <article key={x}>
              <strong>
                20<span>%</span>
              </strong>
              <p>{x}</p>
            </article>
          ))}
        </div>
      </div>
      <p className="chapter-bridge">
        The criteria stay clear. <em>The answer is allowed to grow.</em>{" "}
        <span aria-hidden="true">↓</span>
      </p>
    </section>
  );
}
