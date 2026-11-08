import { useEffect, useRef, useState } from "react";
import {
  GAME_GOAL,
  GAME_TIME,
  gameRounds,
  totalsFor,
  verdictFor,
} from "../game";
import type { Delta } from "../game";

type Phase = "intro" | "choose" | "feedback" | "result";

function Meter({
  label,
  value,
  max = 10,
  goal,
  suffix,
}: {
  label: string;
  value: number;
  max?: number;
  goal?: number;
  suffix?: string;
}) {
  const shown = Math.max(0, value);
  return (
    <div
      className={"g-meter" + (goal && value < goal ? " below" : "")}
      role="img"
      aria-label={`${label}: ${value} of ${max}${goal ? `, goal ${goal} or more` : ""}${suffix ? `, ${suffix}` : ""}`}
    >
      <span className="g-meter-label">{label}</span>
      <span className="g-cells" aria-hidden="true">
        {Array.from({ length: max }, (_, i) => (
          <i
            key={i}
            className={
              (i < shown ? "on " : "") + (goal === i + 1 ? "goal" : "")
            }
          />
        ))}
      </span>
      <b aria-hidden="true">
        {value}/{max}
      </b>
    </div>
  );
}

const sign = (n: number) =>
  n > 0 ? `+${n}` : n < 0 ? `−${Math.abs(n)}` : "±0";

function Chips({ delta }: { delta: Delta }) {
  const items: [string, number][] = [
    ["Structure", delta.structure],
    ["Agency", delta.agency],
    ["Fairness", delta.fairness],
    ["Teacher time", -delta.time],
  ];
  return (
    <ul className="g-chips" aria-label="Effect of this choice">
      {items.map(([name, n]) => (
        <li key={name} className={n > 0 ? "up" : n < 0 ? "down" : "flat"}>
          {name} {sign(n)}
        </li>
      ))}
    </ul>
  );
}

export default function BalanceGame() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [round, setRound] = useState(0);
  const [picks, setPicks] = useState<number[]>([]);
  const focusTarget = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);
  const totals = totalsFor(picks);
  const current = gameRounds[round];
  const lastPick = picks[round];

  // Move focus to the new heading after each step, but not on first render.
  useEffect(() => {
    if (!started.current) {
      started.current = true;
      return;
    }
    focusTarget.current?.focus({ preventScroll: false });
  }, [phase, round]);

  const choose = (i: number) => {
    setPicks([...picks, i]);
    setPhase("feedback");
  };
  const next = () => {
    if (round + 1 >= gameRounds.length) setPhase("result");
    else {
      setRound(round + 1);
      setPhase("choose");
    }
  };
  const restart = () => {
    setPicks([]);
    setRound(0);
    setPhase("choose");
  };
  const verdict = phase === "result" ? verdictFor(totals) : null;

  return (
    <div className="game no-print" aria-labelledby="game-title">
      <div className="lab-heading">
        <span className="eyebrow">A SMALL GAME · ONE ROUND PER SPEAKER</span>
        <span>ILLUSTRATIVE MODEL · NOT SURVEY DATA</span>
      </div>
      <h3 id="game-title" className="game-head">
        Balance the course.
      </h3>

      <div className="g-meters">
        <Meter label="Structure" value={totals.structure} goal={GAME_GOAL} />
        <Meter label="Agency" value={totals.agency} goal={GAME_GOAL} />
        <Meter label="Fairness" value={totals.fairness} goal={GAME_GOAL} />
        <Meter
          label="Teacher time"
          value={totals.timeLeft}
          max={GAME_TIME}
          suffix={totals.timeLeft < 0 ? "over budget" : undefined}
        />
      </div>

      <div aria-live="polite" className="g-stage">
        {phase === "intro" && (
          <div>
            <p className="g-lead">
              Our essay argues that structure and independence work together
              only when assessment makes reasoning visible. Test that. Five
              situations come from our five reflections. Finish with{" "}
              <strong>
                structure, agency and fairness all at {GAME_GOAL} or more
              </strong>
              , without spending more than {GAME_TIME} units of teacher time.
            </p>
            <p className="small">
              Each choice helps one thing and costs another, as in real
              teaching. The numbers are invented game mechanics, not measured
              effects.
            </p>
            <button className="g-primary" onClick={() => setPhase("choose")}>
              Start round 1 →
            </button>
          </div>
        )}

        {phase === "choose" && (
          <div>
            <p className="mini-label">
              ROUND {round + 1} / {gameRounds.length} ·{" "}
              {current.who.toUpperCase()}
            </p>
            <h4 className="g-title" tabIndex={-1} ref={focusTarget}>
              {current.title}
            </h4>
            <p className="g-lead">{current.situation}</p>
            <p className="small g-source">Drawn from: {current.source}</p>
            <div
              className="g-options"
              role="group"
              aria-label="Choose a response"
            >
              {current.options.map((o, i) => (
                <button key={o.label} onClick={() => choose(i)}>
                  <small>OPTION {i + 1}</small>
                  <span>{o.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === "feedback" && lastPick !== undefined && (
          <div>
            <p className="mini-label">ROUND {round + 1} · YOU CHOSE</p>
            <h4 className="g-title" tabIndex={-1} ref={focusTarget}>
              {current.options[lastPick].label}
            </h4>
            <Chips delta={current.options[lastPick].delta} />
            <div className="g-outcome">
              <div>
                <p className="mini-label">WHAT IT GAINS</p>
                <p>{current.options[lastPick].gain}</p>
              </div>
              <div>
                <p className="mini-label">WHAT COULD FAIL</p>
                <p>{current.options[lastPick].risk}</p>
              </div>
            </div>
            <button className="g-primary" onClick={next}>
              {round + 1 >= gameRounds.length
                ? "See your course →"
                : `Next situation (${round + 2}/${gameRounds.length}) →`}
            </button>
          </div>
        )}

        {phase === "result" && verdict && (
          <div>
            <p className="mini-label">
              YOUR COURSE ·{" "}
              {verdict.tier === "defensible"
                ? "ABOVE THE LINE"
                : "BELOW THE LINE"}
            </p>
            <h4 className="g-title" tabIndex={-1} ref={focusTarget}>
              {verdict.title}
            </h4>
            <p className="g-lead">{verdict.text}</p>
            <ol className="g-recap">
              {gameRounds.map((r, i) => (
                <li key={r.title}>
                  <span>{r.who}</span>
                  {r.options[picks[i]].label}
                </li>
              ))}
            </ol>
            <p className="small">
              Illustrative only: no choice here is proven best, and the essay’s
              evidence (N=22, one cohort) cannot establish causal effects. Pilot
              any real design and review workload and fairness.
            </p>
            <button className="g-primary" onClick={restart}>
              Play again ↻
            </button>
            <p className="g-end">THE ANSWER IS NOT THE END.</p>
          </div>
        )}
      </div>
    </div>
  );
}
