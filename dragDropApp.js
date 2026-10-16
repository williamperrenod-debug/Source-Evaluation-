"use strict";

function renderDragDropQuestion(questionObj, containerElement, onCompleteCallback) {
  containerElement.innerHTML = `
    <div class="question-card" data-id="${questionObj.id}">
      <div class="drag-drop-layout">
        <!-- Pool of draggable sources -->
        <div class="sources-pool" id="pool-${questionObj.id}">
          <h4>Available Sources</h4>
          ${questionObj.sources.map(src => `
            <div class="draggable-item" draggable="true" id="${src.id}" data-id="${src.id}">
              ${src.text}
            </div>
          `).join('')}
        </div>
        
        <!-- Target Drop Zones -->
        <div class="drop-zones-container">
          <h4>Evaluative Categories</h4>
          ${questionObj.categories.map(cat => `
            <div class="drop-zone" data-category-id="${cat.id}">
              <div class="drop-zone-title">${cat.title}</div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <button id="submit-dd-${questionObj.id}" class="primary-button" style="margin-top: 15px;">Check Answer</button>
      <div id="feedback-dd-${questionObj.id}" class="feedback hidden" role="status" aria-live="polite"></div>
    </div>
  `;

  const draggables = containerElement.querySelectorAll('.draggable-item');
  const dropZones = containerElement.querySelectorAll('.drop-zone');
  const sourcePool = containerElement.querySelector(`#pool-${questionObj.id}`);
  const submitBtn = containerElement.querySelector(`#submit-dd-${questionObj.id}`);
  const feedbackEl = containerElement.querySelector(`#feedback-dd-${questionObj.id}`);

  // HTML5 Drag and Drop Handlers
  draggables.forEach(item => {
    item.addEventListener('dragstart', (e) => {
      item.classList.add('dragging');
      e.dataTransfer.setData('text/plain', item.id);
    });

    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
    });
  });

  [...dropZones, sourcePool].forEach(zone => {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.classList.add('drag-over');
    });

    zone.addEventListener('dragleave', () => {
      zone.classList.remove('drag-over');
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      const id = e.dataTransfer.getData('text/plain');
      const draggableElement = document.getElementById(id);
      zone.appendChild(draggableElement);
    });
  });

  // Submission & Validation Logic
  submitBtn.addEventListener('click', () => {
    let unplacedItems = sourcePool.querySelectorAll('.draggable-item').length;

    if (unplacedItems > 0) {
      feedbackEl.className = "feedback feedback-warning";
      feedbackEl.textContent = "Please place all sources into a category before checking your answer.";
      feedbackEl.classList.remove("hidden");
      return;
    }

    let allCorrect = true;
    dropZones.forEach(zone => {
      const catId = zone.dataset.categoryId;
      const items = zone.querySelectorAll('.draggable-item');
      
      items.forEach(item => {
        const itemId = item.dataset.id;
        if (questionObj.correctMapping[itemId] !== catId) {
          allCorrect = false;
        }
      });
    });

    // Display feedback message
    feedbackEl.replaceChildren();
    const heading = document.createElement("strong");
    heading.textContent = allCorrect ? "Correct!" : "Not quite.";
    const explanation = document.createElement("p");
    explanation.textContent = allCorrect ? questionObj.feedback.correct : questionObj.feedback.incorrect;

    feedbackEl.append(heading, explanation);
    feedbackEl.className = allCorrect ? "feedback feedback-correct" : "feedback feedback-incorrect";
    feedbackEl.classList.remove("hidden");

    // Lock draggables after submission
    draggables.forEach(item => {
      item.setAttribute('draggable', 'false');
      item.style.cursor = 'default';
    });

    submitBtn.disabled = true;

    // Trigger callback back to app.js to update score and show "Next Question" button
    if (typeof onCompleteCallback === "function") {
      onCompleteCallback(allCorrect);
    }
  });
}
