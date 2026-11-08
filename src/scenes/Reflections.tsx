import { narrative } from "../content";
import { members } from "../content";
import { SceneHeading } from "../components";
export default function Reflections() {
  return (
    <section
      id="reflections"
      className="scene reflections"
      aria-labelledby="reflections-title"
    >
      <SceneHeading index={2} kicker="FIVE PERSPECTIVES, NOT FIVE COPIES">
        <span id="reflections-title">
          The question becomes
          <br />
          <em>personal.</em>
        </span>
      </SceneHeading>
      <p className="section-lead">{narrative.reflections1}</p>
      <div className="member-grid">
        {members.map((m, i) => (
          <article className="member-card" key={m.name}>
            <div className="member-top">
              <span className="initials">{m.initials}</span>
              <span>NOTE {String(i + 1).padStart(2, "0")} / 05</span>
            </div>
            <h3>{m.name}</h3>
            <p className="member-focus">{m.focus}</p>
            <p className="mini-label">STARTING POINT</p>
            <p>{m.start}</p>
            <p className="mini-label">REVISED INTERPRETATION</p>
            <p>{m.change}</p>
            <details>
              <summary>
                Explore the doubt & source trail <span>↗</span>
              </summary>
              <p className="mini-label">THE INTERRUPTION</p>
              <p>{m.doubt}</p>
              <p className="mini-label">NEXT PRACTICE</p>
              <p>{m.next}</p>
              <div className="source-slip">
                <strong>Source trail · {m.name}</strong>
                <ul>
                  {m.sources.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <p>{m.caveat}</p>
              </div>
            </details>
          </article>
        ))}
      </div>
      <aside className="reflection-synthesis">
        <span aria-hidden="true">↳</span>
        <div>
          <h3>What the comparison changed</h3>
          <p>{narrative.reflections2}</p>
          <p className="small">
            Editorial synthesis grounded in the named records. It is not a new
            participant statement.
          </p>
        </div>
      </aside>
      <p className="chapter-bridge">
        Thinking becomes visible when it can be challenged.{" "}
        <em>Then revised.</em> <span aria-hidden="true">↓</span>
      </p>
    </section>
  );
}
