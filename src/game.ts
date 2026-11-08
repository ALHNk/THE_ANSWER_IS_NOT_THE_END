// "Balance the course": an illustrative game built from the tensions in our essay.
// The numbers are game mechanics, NOT measured effects. Survey figures quoted in
// the text (Item 5, Items 6-7) are the N=22 results from the submitted essay.

export const GAME_START = 5; // starting value of each meter (0-10)
export const GAME_GOAL = 6; // every meter must end at or above this line
export const GAME_TIME = 7; // teacher-time budget; each option spends some

export type Delta = {
  structure: number;
  agency: number;
  fairness: number;
  time: number;
};

export type GameOption = {
  label: string;
  delta: Delta;
  gain: string;
  risk: string;
};

export type GameRound = {
  who: string;
  title: string;
  situation: string;
  source: string;
  options: GameOption[];
};

const d = (
  structure: number,
  agency: number,
  fairness: number,
  time: number,
): Delta => ({ structure, agency, fairness, time });

export const gameRounds: GameRound[] = [
  {
    who: "Amina Tuzelova",
    title: "The flawless report",
    situation:
      "A student submits an accurate, polished report written with AI help. Like a model with high accuracy and no explanation, it shows an output, not the reasoning behind it.",
    source: "Amina, Week 6 note; Fischer et al. (2024)",
    options: [
      {
        label: "Ban AI and move to an invigilated closed exam.",
        delta: d(2, -2, -1, 1),
        gain: "Clear, strict and easy to apply.",
        risk: "Students still need to evaluate tools they will meet professionally. Prohibition alone is inadequate.",
      },
      {
        label: "Mark the final report against the rubric.",
        delta: d(1, -1, 0, 0),
        gain: "Fast and consistent: everyone meets the same criteria.",
        risk: "The reasoning stays invisible. A polished essay alone is weak evidence of independent judgement.",
      },
      {
        label:
          "Ask for a short oral explanation of the key decisions, with preparation time.",
        delta: d(0, 2, -1, 2),
        gain: "Probes why the student accepted or rejected an interpretation.",
        risk: "Oral tasks can intensify anxiety. Without an equivalent accessible format, fairness suffers.",
      },
    ],
  },
  {
    who: "Alikhan Khamidulla",
    title: "The uncomfortable question",
    situation:
      "Your seminar is built around raising questions rather than covering a topic. Intellectual challenge can deepen thinking, but it can also hurt.",
    source: "Alikhan, Week 6 note and handwritten page",
    options: [
      {
        label: "Open floor: whoever speaks first sets the debate.",
        delta: d(-1, 1, -2, 0),
        gain: "Spontaneous and energetic.",
        risk: "Confident speakers dominate and quieter learners drop out.",
      },
      {
        label:
          "Follow the script and avoid challenging answers, to keep the mood safe.",
        delta: d(2, -2, 0, 0),
        gain: "Predictable and calm.",
        risk: "Intellectual challenge disappears, and with it much of the enquiry.",
      },
      {
        label:
          "Invite one prepared question per student, then challenge the reasoning, never the person.",
        delta: d(0, 2, 0, 1),
        gain: "Keeps challenge intellectual and gives everyone an entry point.",
        risk: "Needs preparation and careful facilitation. Challenge must not become humiliation.",
      },
    ],
  },
  {
    who: "Temirlan Zholtayev",
    title: "The silent student",
    situation:
      "Some students wait until they can make a perfect contribution before speaking. Live participation is part of the grade.",
    source:
      "Temirlan, reflection; survey Item 5 (68.2% agreed, N=22, that participation grading disadvantages slower-to-speak students)",
    options: [
      {
        label: "Drop participation marks entirely.",
        delta: d(-2, 0, 1, 0),
        gain: "Removes the pressure to speak.",
        risk: "Dialogue loses its place in assessment and expectations blur.",
      },
      {
        label: "Keep live participation grading: it is simple and visible.",
        delta: d(1, -1, -2, 0),
        gain: "Easy to run and easy to see.",
        risk: "Rewards speed of speech, not quality of thought.",
      },
      {
        label:
          "Offer private preparation and written contributions as equivalent routes.",
        delta: d(1, 1, 2, 1),
        gain: "More students can explain their thinking while the criteria stay shared.",
        risk: "More to read and mark. A proposed support, not a tested effect.",
      },
    ],
  },
  {
    who: "Alua Nurlybekova",
    title: "The feedback queue",
    situation:
      "Students prefer detailed feedback to a bare number, and many doubt that final grades reflect understanding. You have a large class and limited time.",
    source:
      "Alua, W6 note; Nicol & Macfarlane-Dick (2006); survey Items 6 and 7 (N=22)",
    options: [
      {
        label: "A numerical grade only.",
        delta: d(1, -2, -1, 0),
        gain: "Quick and comparable.",
        risk: "A number rarely tells a learner what to change.",
      },
      {
        label: "Detailed written comments on every draft.",
        delta: d(0, 1, 2, 3),
        gain: "Thorough and fair: each student gets a usable next step.",
        risk: "Workload can delay feedback until it is no longer useful.",
      },
      {
        label:
          "One actionable comment on each draft, then a justified revision before the final.",
        delta: d(1, 2, -1, 1),
        gain: "Feedback arrives in time and students must act on it.",
        risk: "Uneven comments may feel inconsistent without shared criteria.",
      },
    ],
  },
  {
    who: "Zhanerke Pernesh",
    title: "The request for an example",
    situation:
      "A hesitant learner asks you to show how it is done. You can explain everything, hold back, or find a middle path.",
    source: "Zhanerke, note on Mollenhauer, Rancière and Todd",
    options: [
      {
        label:
          "Give a concise example, then wait while the learner explains their own next step.",
        delta: d(1, 2, 0, 1),
        gain: "Guidance first, then responsibility shifts to the learner.",
        risk: "Waiting takes time, and silence needs attentive listening, not pressure.",
      },
      {
        label: "Explain the full solution at once.",
        delta: d(2, -2, 0, 0),
        gain: "Clear and accessible.",
        risk: "Guidance can slide into dependence.",
      },
      {
        label: "Say nothing: discovery only.",
        delta: d(-2, 1, -1, 0),
        gain: "Maximum freedom to interpret.",
        risk: "Beginners often need worked examples before they can question responsibly.",
      },
    ],
  },
];

export type Totals = {
  structure: number;
  agency: number;
  fairness: number;
  timeLeft: number;
};

const clamp = (n: number) => Math.min(10, Math.max(0, n));

export function totalsFor(picks: number[]): Totals {
  let structure = GAME_START;
  let agency = GAME_START;
  let fairness = GAME_START;
  let timeLeft = GAME_TIME;
  picks.forEach((pick, round) => {
    const delta = gameRounds[round].options[pick].delta;
    structure = clamp(structure + delta.structure);
    agency = clamp(agency + delta.agency);
    fairness = clamp(fairness + delta.fairness);
    timeLeft -= delta.time;
  });
  return { structure, agency, fairness, timeLeft };
}

export type Verdict = {
  tier: "defensible" | "close" | "blindspot";
  title: string;
  text: string;
};

// The message names the weakest point, using limits the essay itself states.
export function verdictFor(t: Totals): Verdict {
  const gaps: { key: string; gap: number; text: string }[] = [
    {
      key: "structure",
      gap: GAME_GOAL - t.structure,
      text: "Structure fell short. Responsiveness without shared standards can become inconsistent teacher discretion, so students meet unclear expectations or unequal treatment.",
    },
    {
      key: "agency",
      gap: GAME_GOAL - t.agency,
      text: "Agency fell short. A narrow, tightly controlled design can reward conformity and leave little room for unexpected questions or different defensible conclusions.",
    },
    {
      key: "fairness",
      gap: GAME_GOAL - t.fairness,
      text: "Fairness fell short. Live participation marks and oral tasks can disadvantage slower-to-speak students unless an equivalent accessible route exists.",
    },
    {
      key: "time",
      gap: t.timeLeft < 0 ? 1 : 0,
      text: "You overspent teacher time. Workload can delay feedback, and feedback that arrives late may be unusable.",
    },
  ];
  const missed = gaps.filter((g) => g.gap > 0);
  if (missed.length === 0)
    return {
      tier: "defensible",
      title: "A defensible course. Not a perfect one.",
      text: "Structure, agency and fairness all hold above the line within your time budget. In our essay’s terms: shared criteria for the quality of justification, with space for different defensible conclusions. Every choice you made still carried a cost.",
    };
  const worst = [...missed].sort((a, b) => b.gap - a.gap)[0];
  return {
    tier: missed.length === 1 ? "close" : "blindspot",
    title:
      missed.length === 1
        ? "Close. One blind spot remains."
        : "A course with blind spots.",
    text: worst.text,
  };
}
