"use strict";

const questions = [
  // =========================================
  // AUTHORITY IS CONSTRUCTED AND CONTEXTUAL
  // =========================================
  {
    id: "Q01",
    criterion: "Authority",
    scenario: "You are researching the causes of a local increase in asthma. Which source would be the strongest starting point for understanding possible environmental causes?",
    source: {
      title: "Three possible sources",
      description: "Source A: A personal blog written by someone who lives near the affected area. Source B: A report from a public health agency whose researchers investigate environmental health. Source C: A social media post from an anonymous account."
    },
    options: [
      "Source A, because a local resident necessarily knows the scientific causes.",
      "Source B, because its researchers have relevant expertise in environmental health.",
      "Source C, because anonymous posts are more objective than named sources."
    ],
    correctAnswer: 1,
    feedback: {
      correct: "Correct. In line with the ACRL Framework, authority is contextual and demonstrated through recognized expertise and peer review. The public health agency's researchers possess subject-matter expertise relevant to environmental health.",
      options: [
        "A local resident's personal experience provides valuable community perspective, but living in an area does not automatically establish scientific expertise regarding environmental causes.",
        "Correct. In line with the ACRL Framework, authority is contextual and demonstrated through recognized expertise and peer review. The public health agency's researchers possess subject-matter expertise relevant to environmental health.",
        "Anonymity obscures accountability and credentials, making it impossible to evaluate the author's expertise or institutional backing."
      ]
    }
  },

  {
    id: "Q02",
    criterion: "Authority",
    scenario: "A student finds an article about cybersecurity written by an author whose biography identifies years of professional cybersecurity experience. What is the best conclusion?",
    source: {
      title: "Cybersecurity article",
      description: "The article appears on a technology website. The author's biography describes professional experience responding to cybersecurity incidents, but the article's claims have not yet been checked."
    },
    options: [
      "The article must be accurate because the author has professional experience.",
      "The author's experience is relevant evidence of authority, but the article's claims still need evaluation.",
      "The article is unreliable because it appears on a website rather than in a book."
    ],
    correctAnswer: 1,
    feedback: {
      correct: "Correct. Expert credentials provide a strong indicator of authority, but information literacy requires evaluating claims on their own merits rather than relying solely on author reputation.",
      options: [
        "Expert credentials are an important signal of authority, but they do not make an author infallible. Claims should still be examined against supporting evidence.",
        "Correct. Expert credentials provide a strong indicator of authority, but information literacy requires evaluating claims on their own merits rather than relying solely on author reputation.",
        "Publication format does not dictate reliability. Rigorous professional insights frequently appear on reputable websites rather than in traditional books."
      ]
    }
  },

  {
    id: "Q03",
    criterion: "Authority",
    scenario: "You need to understand a new state law for a class assignment. Which source is most appropriate for verifying the law's actual wording?",
    source: {
      title: "Sources about a new law",
      description: "Source A: A friend's social media summary. Source B: A newspaper editorial discussing the law. Source C: The official state legislature website containing the enacted law."
    },
    options: [
      "The social media summary, because it is easiest to understand.",
      "The newspaper editorial, because editorials explain what everyone should think.",
      "The official legislative text, because it is the primary source for the law's wording."
    ],
    correctAnswer: 2,
    feedback: {
      correct: "Correct. Authority and appropriateness depend heavily on your specific information need. To verify exact statutory wording, you must consult the primary legislative authority.",
      options: [
        "While social media summaries are brief, they are secondary interpretations that often omit, simplify, or mischaracterize exact legal wording.",
        "Editorials provide valuable political commentary and opinion, but they are not authoritative primary documentation of legal statutes.",
        "Correct. Authority and appropriateness depend heavily on your specific information need. To verify exact statutory wording, you must consult the primary legislative authority."
      ]
    }
  },

  // =========================================
  // INFORMATION CREATION AS A PROCESS / EVIDENCE
  // =========================================
  {
    id: "Q04",
    criterion: "Evidence",
    scenario: "A blog claims that a particular study method improves exam scores by 40%. Which action would best help you evaluate this claim?",
    source: {
      title: "Study Success Blog",
      description: "The blog makes a numerical claim but does not identify the study, explain how the percentage was calculated, or link to supporting research."
    },
    options: [
      "Accept the claim because it includes a precise percentage.",
      "Look for the original research, examine its methods, and compare the claim with other credible evidence.",
      "Reject the claim immediately because all blogs contain unreliable information."
    ],
    correctAnswer: 1,
    feedback: {
      correct: "Correct. Information creation is a process. Statistics and claims must be traced back to their original methodology and context to determine if the evidence is robust.",
      options: [
        "A precise number can be fabricated, exaggerated, or stripped of vital context. It does not replace verifiable methodology.",
        "Correct. Published claims and statistics are created through a specific process and various methods; you need to trace them back to their origins to check if the evidence holds up.",
        "Dismissing a source solely based on its format (a blog) is a generalization; instead, evaluate whether the source provides verifiable paths to its evidence."
      ]
    }
  },

  {
    id: "Q05",
    criterion: "Evidence",
    scenario: "Two websites make conflicting claims about the safety of a common household product. What should you do next?",
    source: {
      title: "Conflicting safety claims",
      description: "One website is maintained by a consumer advocacy organization. The other is maintained by a company that sells the product. Both make claims but provide limited supporting evidence."
    },
    options: [
      "Choose the website that agrees with your existing opinion.",
      "Automatically trust the company because it manufactures the product.",
      "Trace both claims to their supporting evidence and compare them with independent research or relevant expert guidance."
    ],
    correctAnswer: 2,
    feedback: {
      correct: "Correct. Critical thinkers examine the underlying evidence and the socioeconomic or commercial motivations behind information creation rather than defaulting to bias or brand loyalty.",
      options: [
        "Selecting sources based solely on personal agreement introduces confirmation bias, running counter to objective inquiry.",
        "A commercial manufacturer has a vested financial interest in product perception, requiring independent verification of its safety claims.",
        "Correct. Critical thinkers examine the underlying evidence and the socioeconomic or commercial motivations behind information creation rather than defaulting to bias or brand loyalty."
      ]
    }
  },

  {
    id: "Q06",
    criterion: "Evidence",
    scenario: "An article makes several claims about a scientific discovery and includes links to published research. What is the best next step?",
    source: {
      title: "Science news article",
      description: "The article links to two research papers. You have not yet checked whether the papers support the article's interpretation or whether other research reaches different conclusions."
    },
    options: [
      "Treat the article as unquestionably accurate because it includes links.",
      "Open the research papers and check whether they support the claims and are represented fairly.",
      "Ignore the links because published research is always too specialized to be useful."
    ],
    correctAnswer: 1,
    feedback: {
      correct: "Correct. Hyperlinks and citations are professional courtesy markers, but critical evaluation requires verifying whether the primary source actually substantiates the journalist's claims.",
      options: [
        "Links are useful trails, but popular science articles frequently overstate, simplify, or misinterpret the nuance of underlying academic studies.",
        "Correct. Hyperlinks and citations are professional courtesy markers, but critical evaluation requires verifying whether the primary source actually substantiates the journalist's claims.",
        "Ignoring academic citations discards your best mechanism for evaluating the evidentiary strength of a claim."
      ]
    }
  },

  // =========================================
  // INFORMATION HAS VALUE / RELEVANCE
  // =========================================
  {
    id: "Q07",
    criterion: "Relevance",
    scenario: "Your assignment asks how remote work affects employee collaboration in U.S. hospitals. Which source is most directly relevant?",
    source: {
      title: "Three research sources",
      description: "Source A: A study of remote work and collaboration among hospital employees in the United States. Source B: An article about remote work and software developers in another country. Source C: A general article about the history of hospitals."
    },
    options: [
      "Source A, because its population, setting, and topic closely match the research question.",
      "Source B, because any source about remote work answers the question equally well.",
      "Source C, because hospital history provides background on the subject."
    ],
    correctAnswer: 0,
    feedback: {
      correct: "Correct. Relevance is determined by how closely a source's scope, population, and context align with your specific research parameters.",
      options: [
        "Correct. Relevance is determined by how closely a source's scope, population, and context align with your specific research parameters.",
        "Software developers in a different national and industrial context experience drastically different operational constraints, limiting direct relevance to U.S. hospital workers.",
        "While hospital history offers broad contextual background, it fails to address the specific intersection of modern remote work and collaboration."
      ]
    }
  },

  {
    id: "Q08",
    criterion: "Relevance",
    scenario: "You are writing a college research paper about the effects of urban green spaces on neighborhood health. How should you evaluate a well-written article about the history of city parks that lacks health data?",
    source: {
      title: "History of City Parks",
      description: "The article describes how public parks developed over time. It provides historical details but does not examine health outcomes or present research about neighborhood health."
    },
    options: [
      "Use it as the main evidence for health effects because it discusses parks.",
      "Reject it for every possible purpose because it does not study health.",
      "Consider using it for historical background, but find other sources that directly address health outcomes."
    ],
    correctAnswer: 2,
    feedback: {
      correct: "Correct. A source's utility is relative to your information need. Historical background can enrich your introductory framework, but it cannot serve as direct evidence for health outcomes.",
      options: [
        "Treating a historical timeline as direct empirical evidence for health impacts misapplies the source's actual contents.",
        "Complete rejection is unnecessary; contextual background still supports broader historical framing even if it lacks empirical health metrics.",
        "Correct. A source's utility is relative to your information need. Historical background can enrich your introductory framework, but it cannot serve as direct evidence for health outcomes."
      ]
    }
  },

  // =========================================
  // SCHOLARLY CONVERSATION / CURRENCY
  // =========================================
  {
    id: "Q09",
    criterion: "Currency",
    scenario: "You are researching current recommendations for protecting computers against newly discovered security threats. Which source is the best starting point?",
    source: {
      title: "Two cybersecurity guides",
      description: "Source A: A technical guide last updated six years ago. Source B: A guide updated last month by a relevant cybersecurity agency. Neither has yet been examined in detail."
    },
    options: [
      "Source A, because older information has had more time to prove itself.",
      "Source B, because current guidance is especially important for newly emerging security threats.",
      "Either source, because publication dates never affect source usefulness."
    ],
    correctAnswer: 1,
    feedback: {
      correct: "Correct. Currency is a vital evaluative dimension in fast-moving fields where the scholarly and professional conversation evolves rapidly to address emerging vulnerabilities.",
      options: [
        "In dynamic technological domains, six-year-old guides often address obsolete systems and fail to protect against contemporary threat vectors.",
        "Correct. Currency is a vital evaluative dimension in fast-moving fields where the scholarly and professional conversation evolves rapidly to address emerging vulnerabilities.",
        "Ignoring publication timelines ignores the fluid nature of research and technological advancement."
      ]
    }
  },

  {
    id: "Q10",
    criterion: "Currency",
    scenario: "A student is researching historical arguments made during the early women's suffrage movement. Is the age of a contemporary newspaper article published during that period a reason to reject it?",
    source: {
      title: "Historical newspaper article",
      description: "The article was published more than a century ago, during the period being studied. The student wants to understand the arguments and attitudes expressed at that time."
    },
    options: [
      "Yes. Every useful source must have been published recently.",
      "No. Its date may make it valuable as a primary historical source, although its perspective and accuracy still require critical evaluation.",
      "No. Historical sources are always accurate because they were written at the time."
    ],
    correctAnswer: 1,
    feedback: {
      correct: "Correct. Currency is relative to the research inquiry. For historical scholarship, contemporaneous primary sources are foundational artifacts, provided they are evaluated for ideological bias and perspective.",
      options: [
        "Applying a blanket rule requiring recent publication would eliminate the foundational primary sources necessary for historical inquiry.",
        "Correct. Currency is relative to the research inquiry. For historical scholarship, contemporaneous primary sources are foundational artifacts, provided they are evaluated for ideological bias and perspective.",
        "Being contemporaneous makes a document a primary source, but it does not guarantee factual objectivity or freedom from the prevailing social biases of its era."
      ]
    }
  }
];
