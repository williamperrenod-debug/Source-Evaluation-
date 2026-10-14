"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // ----- Find the HTML elements -----
  const startButton = document.getElementById("start-button");
  const activitySection = document.getElementById("activity");
  const introSection = document.querySelector(".intro-card");
  const resultsSection = document.getElementById("results");

  const progressText = document.getElementById("progress-text");
  const scoreText = document.getElementById("score-text");
  const progressFill = document.getElementById("progress-fill");

  const criterionLabel = document.getElementById("criterion-label");
  const questionHeading = document.getElementById("question-heading");
  const sourceTitle = document.getElementById("source-title");
  const sourceDescription = document.getElementById("source-description");
  const answerOptions = document.getElementById("answer-options");

  const feedbackBox = document.getElementById("feedback");
  const submitButton = document.getElementById("submit-button");
  const nextButton = document.getElementById("next-button");
  const restartButton = document.getElementById("restart-button");

  const finalScore = document.getElementById("final-score");
  const resultsMessage = document.getElementById("results-message");

  // Questions may be declared with `const questions = [...]`
  // in questions.js or assigned to `window.questions`.
  const questionBank =
    typeof questions !== "undefined"
      ? questions
      : window.questions;

  const validCriteria = [
    "Authority",
    "Evidence",
    "Relevance",
    "Currency"
  ];

  let questionOrder = [];
  let currentQuestionIndex = 0;
  let score = 0;
  let answerSubmitted = false;

  // ----- Validate the question data -----
  function validateQuestionBank(bank) {
    if (!Array.isArray(bank) || bank.length === 0) {
      return "No questions were found. Check that questions.js loads an array of questions.";
    }

    for (let i = 0; i < bank.length; i++) {
      const question = bank[i];

      if (
        !question ||
        typeof question.criterion !== "string" ||
        typeof question.scenario !== "string" ||
        !question.source ||
        typeof question.source.title !== "string" ||
        typeof question.source.description !== "string" ||
        !Array.isArray(question.options) ||
        question.options.length < 2 ||
        !Number.isInteger(question.correctAnswer) ||
        question.correctAnswer < 0 ||
        question.correctAnswer >= question.options.length
      ) {
        return `Question ${i + 1} has missing or invalid data. Check questions.js.`;
      }

      if (
        !validCriteria.some(
          criterion =>
            criterion.toLowerCase() === question.criterion.toLowerCase()
        )
      ) {
        return `Question ${i + 1} has an unrecognized criterion: ${question.criterion}`;
      }

      if (
        question.options.some(
          option => typeof option !== "string" || option.trim() === ""
        )
      ) {
        return `Question ${i + 1} contains an empty or invalid answer option.`;
      }
    }

    return null;
  }

  const dataError = validateQuestionBank(questionBank);

  if (dataError) {
    startButton.disabled = true;
    startButton.textContent = "Activity Unavailable";

    const errorNotice = document.createElement("p");
    errorNotice.className = "data-error";
    errorNotice.setAttribute("role", "alert");
    errorNotice.textContent = dataError;
    introSection.appendChild(errorNotice);
    return;
  }

  // ----- Utility functions -----
  function show(element) {
    element.classList.remove("hidden");
  }

  function hide(element) {
    element.classList.add("hidden");
  }

  function getCurrentQuestion() {
    return questionBank[questionOrder[currentQuestionIndex]];
  }

  function getSelectedAnswerIndex() {
    const selected = answerOptions.querySelector(
      'input[name="answer"]:checked'
    );

    return selected ? Number(selected.value) : null;
  }

  function updateProgress() {
    const total = questionOrder.length;
    const completed = currentQuestionIndex + (answerSubmitted ? 1 : 0);
    const percentage = (completed / total) * 100;

    progressText.textContent =
      `Question ${currentQuestionIndex + 1} of ${total}`;

    scoreText.textContent = `Score: ${score}`;

    progressFill.style.width = `${percentage}%`;
    progressFill.setAttribute("role", "progressbar");
    progressFill.setAttribute("aria-valuemin", "0");
    progressFill.setAttribute("aria-valuemax", "100");
    progressFill.setAttribute("aria-valuenow", String(Math.round(percentage)));
  }

  // ----- Start or restart the activity -----
  function startActivity() {
    questionOrder = questionBank.map((_, index) => index);
    currentQuestionIndex = 0;
    score = 0;
    answerSubmitted = false;

    // Shuffle the question order for each attempt.
    for (let i = questionOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questionOrder[i], questionOrder[j]] =
        [questionOrder[j], questionOrder[i]];
    }

    hide(introSection);
    hide(resultsSection);
    show(activitySection);

    displayQuestion();
  }

  // ----- Display a question -----
  function displayQuestion() {
    const question = getCurrentQuestion();

    answerSubmitted = false;

    criterionLabel.textContent = `Criterion: ${question.criterion}`;
    questionHeading.textContent = question.scenario;
    sourceTitle.textContent = question.source.title;
    sourceDescription.textContent = question.source.description;

    answerOptions.replaceChildren();

    question.options.forEach((optionText, index) => {
      const label = document.createElement("label");
      label.className = "answer-option";
      label.htmlFor = `answer-${index}`;

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "answer";
      input.id = `answer-${index}`;
      input.value = String(index);

      const text = document.createElement("span");
      text.textContent = optionText;

      label.append(input, text);
      answerOptions.appendChild(label);
    });

    hide(feedbackBox);
    feedbackBox.replaceChildren();

    submitButton.disabled = false;
    submitButton.textContent = "Check Answer";
    show(submitButton);
    hide(nextButton);

    nextButton.textContent =
      currentQuestionIndex === questionOrder.length - 1
        ? "View Results"
        : "Next Question";

    updateProgress();
  }

  // ----- Check the selected answer -----
  function checkAnswer() {
    if (answerSubmitted) return;

    const selectedIndex = getSelectedAnswerIndex();

    if (selectedIndex === null) {
      feedbackBox.className = "feedback feedback-warning";
      feedbackBox.textContent = "Please select an answer before continuing.";
      show(feedbackBox);
      return;
    }

    const question = getCurrentQuestion();
    const isCorrect = selectedIndex === question.correctAnswer;

    answerSubmitted = true;

    if (isCorrect) {
      score++;
    }

  const feedback = question.feedback || {};
    
    // Determine the correct message based on whether the selected index has tailored feedback
    let message = "";
    if (isCorrect) {
      message = feedback.correct || "Correct. You selected the best evaluation.";
    } else {
      // Pull specific feedback for the chosen option, or fall back to a default message
      message = (feedback.options && feedback.options[selectedIndex]) 
        || feedback.incorrect 
        || "Not quite. Review the source information and consider why another option is stronger.";
    }

    feedbackBox.replaceChildren();

    const heading = document.createElement("strong");
    heading.textContent = isCorrect ? "Correct!" : "Not quite.";

    const explanation = document.createElement("p");
    explanation.textContent = message;

    feedbackBox.append(heading, explanation);
    feedbackBox.className = isCorrect
      ? "feedback feedback-correct"
      : "feedback feedback-incorrect";

    show(feedbackBox);

    // Lock the answer choices after submission.
    answerOptions.querySelectorAll('input[name="answer"]').forEach(input => {
      input.disabled = true;
    });

    answerOptions.querySelectorAll(".answer-option").forEach((label, index) => {
      if (index === question.correctAnswer) {
        label.classList.add("answer-correct");
      }

      if (index === selectedIndex && !isCorrect) {
        label.classList.add("answer-incorrect");
      }
    });

    hide(submitButton);
    show(nextButton);

    updateProgress();
  }

  // ----- Move to the next question or results -----
  function nextQuestion() {
    if (!answerSubmitted) return;

    if (currentQuestionIndex < questionOrder.length - 1) {
      currentQuestionIndex++;
      displayQuestion();
    } else {
      showResults();
    }
  }

  // ----- Display final results -----
  function showResults() {
    hide(activitySection);
    show(resultsSection);

    const total = questionOrder.length;
    const percentage = Math.round((score / total) * 100);

    finalScore.textContent =
      `You answered ${score} out of ${total} questions correctly (${percentage}%).`;

    if (percentage === 100) {
      resultsMessage.textContent =
        "Excellent work! You demonstrated strong source-evaluation skills across the activity.";
    } else if (percentage >= 80) {
      resultsMessage.textContent =
        "Good work! Review the explanations for any questions you missed to strengthen your evaluation skills.";
    } else if (percentage >= 60) {
      resultsMessage.textContent =
        "You're developing your source-evaluation skills. Review the feedback and try the activity again.";
    } else {
      resultsMessage.textContent =
        "Keep practicing. Pay close attention to authority, evidence, relevance, and currency when evaluating a source.";
    }
  }

 // ----- Connect the controls -----
  startButton.addEventListener("click", startActivity);
  submitButton.addEventListener("click", checkAnswer);
  nextButton.addEventListener("click", nextQuestion);
  restartButton.addEventListener("click", startActivity);


}); 
