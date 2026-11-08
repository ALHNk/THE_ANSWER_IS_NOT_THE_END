import { useState } from "react";
import { concepts, survey, surveyOther } from "../content";
import { SceneHeading, Cite } from "../components";
export default function Literature() {
  const [selected, setSelected] = useState(0);
  const c = concepts[selected];
  return (
    <section
      id="literature"
      className="scene literature"
      aria-labelledby="literature-title"
    >
      <SceneHeading index={1} kicker="CHANGE THE LENS">
        <span id="literature-title">
          A plan is useful.
          <br />
          <em>It is never the whole story.</em>
        </span>
      </SceneHeading>
      <div className="concept-map">
        <div
          className="concept-nodes"
          role="group"
          aria-label="Explore three connected pedagogical concepts"
        >
          {concepts.map((x, i) => (
            <button
              key={x.name}
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
              className={selected === i ? "selected" : ""}
            >
              <small>{x.tag}</small>
              <strong>{x.name}</strong>
              <span aria-hidden="true">
                {i === 0 ? "△" : i === 1 ? "↔" : "◎"}
              </span>
              <p>{x.question}</p>
              <b aria-hidden="true">↗</b>
            </button>
          ))}
        </div>
        <div className="concept-detail" aria-live="polite">
          <div>
            <span className="eyebrow">LENS {selected + 1} / 3</span>
            <h3>{c.question}</h3>
            <p>{c.body}</p>
          </div>
          <div>
            <p className="mini-label">IN OUR LEARNING</p>
            <p>{c.practice}</p>
            <p className="mini-label">THE LIMIT</p>
            <p>{c.limit}</p>
            <Cite to={c.ref}>{c.source}</Cite>
          </div>
        </div>
      </div>
      <div className="print-only">
        {concepts
          .filter((_, i) => i !== selected)
          .map((x) => (
            <article key={x.name}>
              <h3>{x.name}</h3>
              <p>
                {x.body} {x.practice} Limitation: {x.limit}
              </p>
              <p>{x.source}</p>
            </article>
          ))}
      </div>
      <details className="comparison">
        <summary>
          Unfold the Didaktik ↔ alignment comparison <span>＋</span>
        </summary>
        <div className="comparison-grid">
          <div>
            <h3>Didaktik</h3>
            <p>
              Attend to the educational relation and the selection of worthwhile
              subject matter. Interpret the particular situation.
            </p>
            <p>
              <strong>Risk:</strong> discretion can obscure expectations.
            </p>
          </div>
          <div>
            <h3>Constructive alignment</h3>
            <p>
              Make intended learning, activities and assessment coherent.
              Publish what a learner should demonstrate.
            </p>
            <p>
              <strong>Risk:</strong> measurable targets can narrow enquiry.
            </p>
          </div>
          <div>
            <h3>Our synthesis</h3>
            <p>
              Use shared criteria for the quality of reasons, with space for
              different defensible interpretations.
            </p>
            <p>
              <strong>Test in practice:</strong> are students explaining
              decisions or reproducing a model answer?
            </p>
          </div>
        </div>
      </details>
      <div className="survey-block">
        <div className="survey-intro">
          <p className="eyebrow">A LOCAL COUNTERPOINT</p>
          <h3>
            Students want structure.
            <br />
            <em>And more than a score.</em>
          </h3>
          <p>
            Reported student perceptions from a 10-item, 5-point Likert survey
            of Applied AI master’s students at AITU.
          </p>
          <div className="sample">
            <strong>22</strong>
            <span>
              RESPONDENTS
              <br />
              ONE COHORT
            </span>
          </div>
          <Cite>Submitted group essay, Empirical Evidence</Cite>
        </div>
        <figure className="survey-chart">
          <figcaption>
            Four reported results <span>0–100% of respondents</span>
          </figcaption>
          <svg
            viewBox="0 0 660 420"
            role="img"
            aria-labelledby="chart-title"
            aria-describedby="chart-desc"
          >
            <title id="chart-title">
              Survey agreement and disagreement, N equals 22
            </title>
            <desc id="chart-desc">
              {survey
                .map(
                  (x) =>
                    `Item ${x.item}: ${x.label}. ${x.value}% ${x.direction.toLowerCase()}, mean ${x.mean}.`,
                )
                .join(" ")}
            </desc>
            {survey.map((x, i) => (
              <g key={x.item} transform={`translate(0 ${i * 100 + 12})`}>
                <text x="0" y="17" className="svg-label">
                  {x.label}
                </text>
                <text x="0" y="39" className="svg-meta">
                  ITEM {x.item} · {x.direction.toUpperCase()} · MEAN {x.mean}
                </text>
                <rect x="0" y="52" width="555" height="15" fill="#dcded6" />
                <rect
                  className="data-bar"
                  x="0"
                  y="52"
                  width={(555 * x.value) / 100}
                  height="15"
                  fill={x.direction === "Disagreement" ? "#b63e2f" : "#283b39"}
                />
                <text x="574" y="67" className="svg-value">
                  {x.value}%
                </text>
              </g>
            ))}
          </svg>
          <div className="mobile-chart">
            {survey.map((x) => (
              <div key={x.item}>
                <p>{x.label}</p>
                <span>
                  ITEM {x.item} · {x.direction.toUpperCase()} · MEAN {x.mean}
                </span>
                <div className="mobile-bar">
                  <i
                    style={{
                      width: x.value + "%",
                      background:
                        x.direction === "Disagreement" ? "#b63e2f" : "#283b39",
                    }}
                  />
                </div>
                <strong>{x.value}%</strong>
              </div>
            ))}
          </div>
          <p className="small">
            Item 7 reports <strong>disagreement</strong>; the other bars report
            agreement. These are separate items, not parts of one total. Small,
            single-cohort self-report; no causal or representative inference. No
            raw responses or Item 8 result supplied.
          </p>
        </figure>
      </div>
      <details>
        <summary>
          Read the complete reported data <span>＋</span>
        </summary>
        <div className="table-wrap">
          <table>
            <caption>
              Submitted essay results; means are on the original 1–5 scale.
            </caption>
            <thead>
              <tr>
                <th>Item / perception</th>
                <th>Direction</th>
                <th>%</th>
                <th>Mean</th>
              </tr>
            </thead>
            <tbody>
              {[
                ...survey,
                ...surveyOther.map((x) => ({ ...x, direction: "Agreement" })),
              ]
                .sort((a, b) => a.item - b.item)
                .map((x) => (
                  <tr key={x.item}>
                    <th scope="row">
                      {x.item}. {x.label}
                    </th>
                    <td>{x.direction}</td>
                    <td>{x.value}</td>
                    <td>{x.mean}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </details>
      <p className="chapter-bridge">
        The literature gives us lenses.{" "}
        <em>The notes show where they meet a person.</em>{" "}
        <span aria-hidden="true">↓</span>
      </p>
    </section>
  );
}
