export const chapters = [
  {
    id: "introduction",
    short: "The answer",
    title: "Introduction: Learning from HE Pedagogy Course",
  },
  {
    id: "literature",
    short: "The lenses",
    title: "Learning from Reading and Engagement with Literature",
  },
  {
    id: "reflections",
    short: "Five voices",
    title: "Learning from Group/Individual Reflective Notes",
  },
  {
    id: "feedback",
    short: "The revision",
    title: "Learning from Peer Feedback and Reflection",
  },
  {
    id: "process",
    short: "The making",
    title: "Learning from the Poster Development and Presentation",
  },
  {
    id: "assessment",
    short: "The evidence",
    title: "Learning through Assessment",
  },
  {
    id: "conclusion",
    short: "What changed",
    title:
      "Conclusion: Critical Reflection: What Have We/I Learned About HE Pedagogy?",
  },
] as const;

export const survey = [
  {
    item: 2,
    label: "Clear outcomes and structured requirements",
    value: 95.5,
    mean: "4.45",
    direction: "Agreement",
  },
  {
    item: 6,
    label: "Detailed formative feedback over numbers",
    value: 72.7,
    mean: "4.09",
    direction: "Agreement",
  },
  {
    item: 7,
    label: "Final grades accurately reflect understanding",
    value: 59.1,
    mean: "2.77",
    direction: "Disagreement",
  },
  {
    item: 10,
    label: "Staged assessment: process, revision, oral defense",
    value: 77.3,
    mean: "4.09",
    direction: "Agreement",
  },
];
export const surveyOther = [
  {
    item: 1,
    label: "Critical thinking beyond vocational training",
    value: 86.4,
    mean: "4.00",
  },
  {
    item: 3,
    label: "Explanation and worked examples before independent work",
    value: 81.8,
    mean: "4.18",
  },
  { item: 4, label: "Value of active discussion", value: 86.4, mean: "4.14" },
  {
    item: 5,
    label: "Participation grading disadvantages slower-to-speak students",
    value: 68.2,
    mean: "3.95",
  },
  {
    item: 9,
    label: "Polished essays do not reliably show independent thinking under AI",
    value: 68.2,
    mean: "3.95",
  },
];
export const concepts = [
  {
    name: "Didaktik",
    tag: "THE RELATION",
    question: "Why this subject, for these students?",
    body: "Magnússon and Rytzler foreground the relation between teacher, student and subject matter. The reading challenged a programmable view of teaching: plans matter, but students do not respond as identical systems.",
    practice:
      "Amina connects this uncertainty to an AI model whose accurate output is not yet an explanation. Ask the learner to justify a decision, then respond to their interpretation.",
    limit:
      "Responsiveness without shared standards can become inconsistent teacher discretion.",
    source: "Magnússon & Rytzler (2022), chs 8–9; Amina, typed Week 6 note.",
    ref: "magnusson",
  },
  {
    name: "Constructive alignment",
    tag: "THE STRUCTURE",
    question: "Do activities and assessment invite the intended learning?",
    body: "Biggs connects intended outcomes, learning activities and assessment. Alignment gives independent work a visible purpose. It does not require every learner to reach the same defensible conclusion.",
    practice:
      "Use the outcome “evaluate competing explanations using evidence”; practise comparing claims; assess the quality of justification.",
    limit:
      "A narrow outcome can exclude unexpected questions. Alignment is a design tool, not a complete account of educational purpose.",
    source:
      "Biggs (1996); submitted group essay, Critical Analysis and Relevance.",
    ref: "biggs",
  },
  {
    name: "Educational purposes",
    tag: "THE PURPOSE",
    question: "Qualified for what, and able to judge for whom?",
    body: "Biesta distinguishes qualification, socialization and subjectification. Skills and disciplinary membership matter alongside becoming a responsible subject. A score cannot settle the question of educational purpose.",
    practice:
      "Alua questions education defined only by employment. Her assessment reflection asks how independent thinking becomes visible when AI can produce a polished submission.",
    limit:
      "Personal development remains vague unless the course explains opportunities for judgement and evidence of it.",
    source: "Biesta (2009); Alua, W6 Reflective Notes HEP.docx.",
    ref: "biesta",
  },
];
export const members = [
  {
    name: "Amina Tuzelova",
    initials: "AT",
    focus: "Independence needs guidance.",
    start:
      "Her early note questions education as an investment and the student as a consumer. Employability matters, but it cannot exhaust the university’s purpose.",
    doubt:
      "The typed Week 6 note compares high AI-model accuracy with being unable to explain a prediction. A successful output can conceal weak understanding.",
    change:
      "The scanned notes propose dialogue, open questions, projects and ethical questioning of AI. Mollenhauer’s direction of attention meets Rancière’s intellectual equality: support should help self-active learners, not produce dependence.",
    next: "Ask students to examine a model’s limitations and ethical consequences, then defend their own interpretation.",
    sources: [
      "Amina_Tuzelova_AAI_2606_Reflective_note.docx",
      "Amina_Tuzelova_AAI-2606_Reflective_Note_Week_6 (1).docx",
      "Amina_Tuzelova_AAI_2606_week_6_Reflective_note (1).pdf, scan pp. 1–2, 3, 5–8",
    ],
    caveat:
      "Scan filename says week_6; scan p. 3 visibly says Week 5, 07.10.2026. These are paraphrases, not handwritten quotations.",
  },
  {
    name: "Alikhan Khamidulla",
    initials: "AK",
    focus: "Challenge carries responsibility.",
    start:
      "The first typed note links higher education’s public and private purposes with team discussion and shared questions about the local context.",
    doubt:
      "The handwritten page broadens teacher responsibility beyond subject expertise to social and psychological considerations. It questions educational ‘violence’: whether teaching can avoid challenging a learner’s immediate preferences. This is a philosophical dilemma, not permission to harm.",
    change:
      "The selectable Week 6 PDF values raising questions rather than only covering content. Together, the records suggest participation needs intellectual challenge and attention to students’ learning conditions.",
    next: "Invite a question before asking for a finished answer; distinguish intellectual challenge from harm or humiliation.",
    sources: [
      "Alikhan_Khamidulla_AAI-2606M_Typed_Notes.docx",
      "Alikhan_Khamidulla_AAI_2606.pdf, scan p. 1",
      "Week 6 Reflective note Alikhan Khamidulla AAI-2606.pdf, text p. 2",
    ],
    caveat:
      "Some handwriting is faint. The page supports a cautious thematic reading; it does not establish that discussion improved measured learning.",
  },
  {
    name: "Temirlan Zholtayev",
    initials: "TZ",
    focus: "A memory is not a fair comparison.",
    start:
      "The Week 1 note connects successful memorization with difficulty expressing an independent position. In Week 6, he initially favours a strict mathematics teacher over a friendly chemistry teacher.",
    doubt:
      "He recognises that he rehearsed mathematics for entrance examinations and again at university. Unequal practice confounds the comparison of teachers.",
    change:
      "The note revises the judgement: recall alone cannot establish teaching effectiveness. He also recognises that waiting to formulate a perfect contribution removes opportunities to practise explaining.",
    next: "Prepare one question before a seminar, contribute it and reflect on the responses. This is his stated intention, not a verified later outcome.",
    sources: [
      "Zholtaev_Temirlan_Reflective_notes_week1(1).docx",
      "Zholtaev_Temirlan_Reflective_notes_week6.docx",
      "ReflectiveNote_Temirlan_Zholtayev_AAI2606M_Week5.docx",
    ],
    caveat:
      "The extended Week 6 file is an alternative version, not an independent observation. Week 5 distinguishes intellectual challenge from attacks on dignity.",
  },
  {
    name: "Alua Nurlybekova",
    initials: "AN",
    focus: "A grade has more than one function.",
    start:
      "Week 1 discusses historical and institutional differences. Her Week 3 essay asks whether formal reforms produce changes in students’ educational experience.",
    doubt:
      "The Week 6 note asks how universities can evaluate independent thinking when AI can answer questions and complete assignments.",
    change:
      "She distinguishes diagnostic, formative and summative assessment and values constructive feedback. Projects, cases and presentations could make knowledge more visible; they still require valid criteria and individual accountability.",
    next: "Use a draft, actionable feedback and a justified revision before a final case-based assessment.",
    sources: [
      "W1 Reflective Notes HEP.docx",
      "W6 Reflective Notes HEP.docx",
      "Alua Nurlybekova Critical Analysis Essay HEP.docx",
    ],
    caveat:
      "The W6 header carries a September date. No chronology is repaired by guess. Her preference for feedback is not proof of comparative effectiveness.",
  },
  {
    name: "Zhanerke Pernesh",
    initials: "ZP",
    focus: "Listening changes what guidance means.",
    start:
      "The supplied emancipatory-teaching note records a preference for a clear explanation and a simple example before independent work.",
    doubt:
      "Rancière’s criticism makes her question when explanation creates dependence. The note distinguishes teaching authority from assumed intellectual superiority.",
    change:
      "Mollenhauer and Rancière help her retain guidance while respecting interpretation. Her discussion of Todd adds attentive listening: inviting speech is insufficient if the contribution receives no serious attention.",
    next: "Allow time for hesitant learners without speaking for them. Explain one’s own reasoning and give others time to develop theirs.",
    sources: ["Reflective_Notes_Zhanerke_Pernesh (1).docx"],
    caveat:
      "One supplied note supports this internal tension, not a measured before-and-after time series. Todd, Mollenhauer and Rancière are attributed through the course note.",
  },
];
export const evidenceChoices = [
  {
    name: "A polished final essay",
    label: "PRODUCT",
    explanation:
      "A coherent product can show disciplinary knowledge and synthesis. By itself, it leaves authorship, decisions and independent judgement uncertain, especially with AI assistance.",
    cost: "Keep the final product, but connect it to annotated evidence and a short explanation of decisions.",
  },
  {
    name: "A revision log with reasons",
    label: "PROCESS",
    explanation:
      "A draft, feedback and a justified revision make the response to evidence visible. This is a stronger match for the outcome “evaluate and revise a claim”. A log can still be manufactured.",
    cost: "Check a small sample of decisions against the evidence. Do not reward the quantity of edits.",
  },
  {
    name: "A short oral explanation",
    label: "DIALOGUE",
    explanation:
      "A focused follow-up question can probe why a student accepted or rejected an interpretation. It can complement the written record; it does not guarantee fair access on its own.",
    cost: "Use shared criteria, preparation time and an equivalent accessible response format. Speaking anxiety and teacher workload matter.",
  },
];
export const rubric = [
  "Understanding and Critical Reflection on HE Pedagogy",
  "Integration of Literature, Reflective Notes and Learning Experiences",
  "Critical Evaluation and Application to HE Practice",
  "Academic Poster Design and Communication",
  "Q&A, Discussion and Response to Peer Feedback",
];
export const references = [
  {
    id: "magnusson",
    label:
      "Magnússon, G., & Rytzler, J. (2022). Towards a pedagogy of higher education: The Bologna process, Didaktik and teaching. Routledge. Chapters 8–9.",
    url: "https://www.routledge.com/Towards-a-Pedagogy-of-Higher-Education-The-Bologna-Process-Didaktik-and-Teaching/Magnusson-Rytzler/p/book/9780367515072",
  },
  {
    id: "biggs",
    label:
      "Biggs, J. (1996). Enhancing teaching through constructive alignment. Higher Education, 32(3), 347–364.",
    url: "https://doi.org/10.1007/BF00138871",
  },
  {
    id: "biesta",
    label:
      "Biesta, G. (2009). Good education in an age of measurement: On the need to reconnect with the question of purpose in education. Educational Assessment, Evaluation and Accountability, 21(1), 33–46.",
    url: "https://doi.org/10.1007/s11092-008-9064-9",
  },
  {
    id: "nicol",
    label:
      "Nicol, D. J., & Macfarlane-Dick, D. (2006). Formative assessment and self-regulated learning: A model and seven principles of good feedback practice. Studies in Higher Education, 31(2), 199–218.",
    url: "https://doi.org/10.1080/03075070600572090",
  },
  {
    id: "boud",
    label:
      "Boud, D., & Falchikov, N. (2006). Aligning assessment with long-term learning. Assessment & Evaluation in Higher Education, 31(4), 399–413.",
    url: "https://doi.org/10.1080/02602930600679050",
  },
  {
    id: "fischer",
    label:
      "Fischer, I., Sweeney, S., Lucas, M., & Gupta, N. (2024). Making sense of generative AI for assessments: Contrasting student claims and assessor evaluations. The International Journal of Management Education, 22(3), 101081.",
    url: "https://doi.org/10.1016/j.ijme.2024.101081",
  },
];
export const questions = [
  [
    "Are you arguing against learning outcomes?",
    "No. Clear outcomes help students understand expectations. Our synthesis combines alignment with Didaktik so that shared criteria assess the quality of justification while allowing different defensible conclusions. [Biggs, 1996; Magnússon & Rytzler, 2022]",
  ],
  [
    "What does N=22 establish?",
    "It describes reported perceptions in one Applied AI master’s cohort. It cannot establish causal improvement, represent all students or validate a teaching method. Five reflective contributors are a separate qualitative corpus.",
  ],
  [
    "Why treat silence carefully?",
    "Temirlan records waiting for a perfect contribution; Zhanerke asks how to support hesitation without speaking for someone. The essay reports 68.2% agreement that live participation grading disadvantages slower-to-speak students (Item 5, mean 3.95).",
  ],
  [
    "Does AI use imply misconduct?",
    "No. The proposal distinguishes permitted support from assessed responsibility. Ask students to disclose assistance, evaluate evidence and explain decisions. Polished prose alone is insufficient evidence of independent judgement. [Submitted essay; Fischer et al., 2024]",
  ],
  [
    "What would you change in a real course?",
    "Publish an outcome about justification, give a concise worked example, allow private preparation, discuss a question, respond to a draft and assess a reasoned revision with an accessible explanation. Pilot the sequence and review workload and fairness.",
  ],
  [
    "How do the individual essays matter?",
    "The Week 3 essays ask whether institutional reform changes learning. The final group essay narrows that concern to independent judgement and assessment. This is a comparison of texts, not proof that every member followed the same learning trajectory.",
  ],
];

// Source-backed scene narrative. Claim-level provenance: docs/content-evidence-map.md.
export const narrative = {
  assessment1:
    "Alua distinguishes diagnostic, formative and summative assessment. Our interpretation is that these functions can work together: establish a starting point, support a usable revision, then judge achievement against transparent criteria.",
  assessment2:
    "Boud and Falchikov extend assessment towards judgement beyond university. The submitted essay proposes staged evidence and an explanation of decisions in AI-rich study. A task’s authenticity still depends on what it actually reveals.",
  conclusion1:
    "The synthesis no longer treats clarity and independence as rival choices. Shared standards can support agency when they assess the quality of explanation, questioning and justified revision.",
  conclusion2:
    "Different records complicate that claim: Amina asks about ethical judgement; Alikhan about teacher responsibility; Temirlan about the evidence behind an evaluation; Alua about assessment validity; Zhanerke about listening without dependence.",
  conclusion3:
    "Clear outcome → concise example → private thinking → structured dialogue → draft feedback → reasoned revision → accessible explanation, with AI assistance disclosed.",
  conclusion4:
    "Limits: situated self-reports; one cohort; no measured causal improvement. The notes suggest interpretations, not a uniform personal transformation. The revised answer is a metaphor for the group synthesis.",
  feedback1:
    "Reading about formative assessment shifted the emphasis from receiving a judgement to using it. Nicol and Macfarlane-Dick connect feedback with self-regulation: students need opportunities to evaluate their work and act on information.",
  feedback2:
    "Alua’s W6 note values constructive feedback over numbers. Our synthesis adds a condition: a comment must arrive in time, identify a usable next step and leave room for the learner’s judgement.",
  feedback3:
    "Alikhan values question-raising; Temirlan records hesitation. Private preparation and written contributions could broaden access. These accounts do not measure learning gains.",
  introduction1:
    "Our learning in HE Pedagogy brings readings, classroom questions, five members’ reflective notes and a small local survey into conversation. The submitted group essay argues that standards can support agency when assessment reveals explanation, questioning and revision.",
  introduction2:
    "The Week 3 essays ask whether institutional reforms change students’ learning. The final group argument narrows the question: what counts as evidence of independent judgement? This is a comparison of texts, not a measured learning trajectory.",
  process1:
    "This artifact’s development makes three communication decisions visible. They are design decisions in this presentation, not testimony about the team’s classroom collaboration.",
  process2:
    "The Week 3 essays connect reform to learning. The submitted group essay focuses on judgement. This site keeps that narrower question and maps all seven final appendix sections to it.",
  process3:
    "Separate five authors’ reflections from N=22 perceptions. Show Item 7’s negative direction. Keep precise files, scan pages, week-label conflicts and limits beside the interpretation.",
  process4:
    "The proposed defense uses chapter links, one deliberate interaction per speaker and a static poster. Each member can explain their own source, one interpretation and one limitation.",
  process5:
    "A visible source trail lets an audience question the interpretation. A stable fallback gives the explanation priority over the interaction. In a future group presentation, assign source ownership early and rehearse questions as well as transitions. These are proposals for practice.",
  reflections1:
    "Five contributors. Different starting points. These interpretations compare self-reported records; they do not establish a common timeline or measured learning gains.",
  reflections2:
    "The synthesis moves from judging a teaching style or a finished product to asking what evidence warrants that judgement. Temirlan’s confound, Amina’s explainability question and Zhanerke’s concern with listening make a single measure difficult to defend.",
} as const;
