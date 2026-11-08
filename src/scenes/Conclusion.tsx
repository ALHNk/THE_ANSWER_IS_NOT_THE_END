import { narrative } from "../content";
import { useState } from "react";
import { AnswerPaper, SceneHeading } from "../components";
export default function Conclusion() {
  const [show, setShow] = useState(true);
  return (
    <section
      id="conclusion"
      className="scene conclusion"
      aria-labelledby="conclusion-title"
    >
      <SceneHeading index={6} kicker="RETURN TO THE SAME PAPER">
        <span id="conclusion-title">
          Not a perfect answer.
          <br />
          <em>A defensible one.</em>
        </span>
      </SceneHeading>
      <div className="conclusion-grid">
        <div className="closing-paper">
          <AnswerPaper annotated={show} />
          <button
            className="text-button no-print"
            onClick={() => setShow(!show)}
            aria-pressed={show}
          >
            {show ? "Compare with the first answer" : "Reveal what changed"}{" "}
            <span aria-hidden="true">↻</span>
          </button>
        </div>
        <div className="conclusion-copy">
          <p className="eyebrow">WHAT CHANGED IN THE GROUP ARGUMENT</p>
          <h3>
            From a visible result
            <br />
            to visible reasoning.
          </h3>
          <p>{narrative.conclusion1}</p>
          <p>{narrative.conclusion2}</p>
          <div className="final-proposal">
            <p className="mini-label">A PRACTICAL COURSE SEQUENCE / PROPOSED</p>
            <p>{narrative.conclusion3}</p>
          </div>
          <p>
            <strong>What could fail?</strong> Workload can delay feedback. Oral
            assessment can intensify anxiety. Teacher discretion can undermine
            fairness. A narrow rubric can reward conformity. Pilot the sequence,
            offer equivalent response formats and evaluate its effects.
          </p>
          <p className="small">{narrative.conclusion4}</p>
        </div>
      </div>
      <div className="end-line">
        <p>
          THE ANSWER
          <br />
          IS NOT THE END.
        </p>
        <span>
          Explain it.
          <br />
          Question it.
          <br />
          Revise it.
          <br />
          <em>Defend it.</em>
        </span>
      </div>
    </section>
  );
}
