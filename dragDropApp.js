"use strict";

const dragDropQuestions = [
  {
    id: "DD-Q07",
    criterion: "Relevance",
    scenario: "Your assignment asks how remote work affects employee collaboration in U.S. hospitals. Match each source description to its correct evaluative category.",
    sources: [
      { 
        id: "srcA", 
        text: "Source A: A study of remote work and collaboration among hospital employees in the United States." 
      },
      { 
        id: "srcB", 
        text: "Source B: An article about remote work and software developers in another country." 
      },
      { 
        id: "srcC", 
        text: "Source C: A general article about the history of hospitals." 
      }
    ],
    categories: [
      { id: "cat-relevant", title: "Most Directly Relevant" },
      { id: "cat-background", title: "Contextual / Background Support" },
      { id: "cat-irrelevant", title: "Low Relevance / Mismatched Context" }
    ],
    // Correct mapping of source ID to category ID
    correctMapping: {
      "srcA": "cat-relevant",
      "srcB": "cat-irrelevant",
      "srcC": "cat-background"
    },
    feedback: {
      correct: "Correct. Relevance is determined by how closely a source's scope, population, and context align with your specific research parameters.",
      incorrect: "Not quite. Review how well each source's specific population, setting, and topic match your research question."
    }
  }
];
