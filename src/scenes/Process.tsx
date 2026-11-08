import { narrative } from "../content";
import { SceneHeading, TeamRecord } from "../components";
export default function Process() {
  return (
    <section
      id="process"
      className="scene process"
      aria-labelledby="process-title"
    >
      <SceneHeading index={4} kicker="SHOW THE MAKING">
        <span id="process-title">
          The form makes
          <br />
          <em>an argument too.</em>
        </span>
      </SceneHeading>
      <p className="section-lead">{narrative.process1}</p>
      <ol className="process-lane">
        <li>
          <span className="step-number">01</span>
          <p className="mini-label">SELECT / KEEP THE TENSION</p>
          <h3>One question, seven lenses.</h3>
          <p>{narrative.process2}</p>
          <span className="decision-tag">ACTUAL ARTIFACT DECISION</span>
        </li>
        <li>
          <span className="step-number">02</span>
          <p className="mini-label">DISTINGUISH / MAKE EVIDENCE LEGIBLE</p>
          <h3>Accounts are not outcomes.</h3>
          <p>{narrative.process3}</p>
          <span className="decision-tag">ACTUAL ARTIFACT DECISION</span>
        </li>
        <li>
          <span className="step-number">03</span>
          <p className="mini-label">REHEARSE / MAKE THE ARGUMENT DEFENSIBLE</p>
          <h3>A route, not a performance trick.</h3>
          <p>{narrative.process4}</p>
          <span className="decision-tag">
            PROSPECTIVE PRESENTATION PRACTICE
          </span>
        </li>
      </ol>
      <div className="two-col process-takeaway">
        <div>
          <p className="eyebrow">A COMMUNICATION LESSON</p>
          <h3>
            Clarity is a form
            <br />
            of accountability.
          </h3>
        </div>
        <p>{narrative.process5}</p>
      </div>
      <TeamRecord kind="presentation" />
      <p className="chapter-bridge">
        If the process matters, <em>what should an assessment ask to see?</em>{" "}
        <span aria-hidden="true">↓</span>
      </p>
    </section>
  );
}
