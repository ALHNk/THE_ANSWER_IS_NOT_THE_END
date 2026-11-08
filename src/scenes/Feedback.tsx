import { narrative } from "../content";
import { useState } from "react";
import { SceneHeading, Cite, TeamRecord } from "../components";
export default function Feedback() {
  const [amount, setAmount] = useState(50);
  return (
    <section
      id="feedback"
      className="scene feedback"
      aria-labelledby="feedback-title"
    >
      <SceneHeading index={3} kicker="MAKE A RESPONSE POSSIBLE">
        <span id="feedback-title">
          Feedback is information.
          <br />
          <em>Revision is an action.</em>
        </span>
      </SceneHeading>
      <div className="two-col">
        <p>{narrative.feedback1}</p>
        <div>
          <p>{narrative.feedback2}</p>
          <Cite to="nicol">Nicol & Macfarlane-Dick (2006); Alua, W6 note</Cite>
        </div>
      </div>
      <div className="revision-lab">
        <div className="lab-heading">
          <span className="eyebrow">AN ILLUSTRATIVE REVISION</span>
          <span>EDITORIAL EXAMPLE · NOT A PEER QUOTATION</span>
        </div>
        <div className="revision-pair">
          <article className={amount < 50 ? "emphasized" : ""}>
            <p className="mini-label">BEFORE / CLAIM</p>
            <h3>“Discussion improves learning.”</h3>
            <p>
              The statement treats participation as evidence of effectiveness
              without specifying what changed or for whom.
            </p>
          </article>
          <article className={amount >= 50 ? "emphasized" : ""}>
            <p className="mini-label">AFTER / QUALIFIED CLAIM</p>
            <h3>
              Discussion can support enquiry when participation is accessible.
            </h3>
            <p>{narrative.feedback3}</p>
          </article>
        </div>
        <div className="revision-controls no-print">
          <button onClick={() => setAmount(0)} aria-pressed={amount === 0}>
            Before
          </button>
          <label>
            Shift the emphasis
            <input
              aria-label="Revision comparison"
              type="range"
              min="0"
              max="100"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </label>
          <button onClick={() => setAmount(100)} aria-pressed={amount === 100}>
            Revised
          </button>
        </div>
        <div className="revision-line" aria-hidden="true">
          <span style={{ width: amount + "%" }} />
        </div>
        <p className="small">
          The revision adds conditions, named evidence and a limit. It
          illustrates formative use of feedback; it records no feedback event.
        </p>
      </div>
      <div className="feedback-loop">
        <span>Notice a gap</span>
        <b>→</b>
        <span>Interpret it</span>
        <b>→</b>
        <span>Choose a change</span>
        <b>→</b>
        <span>Justify the revision</span>
      </div>
      <TeamRecord kind="feedback" />
      <p className="chapter-bridge">
        A revision leaves a trace. <em>So should the way we make a poster.</em>{" "}
        <span aria-hidden="true">↓</span>
      </p>
    </section>
  );
}
