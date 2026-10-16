"use strict";

function renderDragDropQuestion(questionObj, containerElement) {
  containerElement.innerHTML = `
    <div class="question-card" data-id="${questionObj.id}">
      <span class="criterion-badge">${questionObj.criterion}</span>
      <p class="scenario">${questionObj.scenario}</p>
      
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
      
      <button id="submit-${questionObj.id}" class="submit-btn" style="margin-top: 15px;">Check Answer</button>
      <div id="feedback-${questionObj.id}" class="feedback-container"></div>
    </div>
  `;

  const draggables = containerElement.querySelectorAll('.draggable-item');
  const dropZones = containerElement.querySelectorAll('.drop-zone');
  const sourcePool = containerElement.querySelector(`#pool-${questionObj.id}`);

  // Track drag states
  draggables.forEach(item => {
    item.addEventListener('dragstart', (e) => {
      item.classList.add('dragging');
      e.dataTransfer.setData('text/plain', item.id);
    });

    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
    });
  });

  // Enable drop handling for target zones and returning to pool
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

  // Evaluation Handler
  const submitBtn = containerElement.querySelector(`#submit-${questionObj.id}`);
  submitBtn.addEventListener('click', () => {
    let allCorrect = true;
    let unplacedItems = sourcePool.querySelectorAll('.draggable-item').length;
    const feedbackEl = containerElement.querySelector(`#feedback-${questionObj.id}`);

    if (unplacedItems > 0) {
      feedbackEl.innerHTML = `<p style="color: #d97706; font-weight: bold;">Please place all sources into a category before checking your answer.</p>`;
      return;
    }

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

    if (allCorrect) {
      feedbackEl.innerHTML = `<p style="color: #16a34a; font-weight: bold;">${questionObj.feedback.correct}</p>`;
    } else {
      feedbackEl.innerHTML = `<p style="color: #dc2626; font-weight: bold;">${questionObj.feedback.incorrect}</p>`;
    }
  });
}
