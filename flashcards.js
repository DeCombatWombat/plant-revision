document.addEventListener("DOMContentLoaded", () => {
    let currentIndex = parseInt(localStorage.getItem("flashcardsCurrentIndex")) || 0;
    let score = parseInt(localStorage.getItem("flashcardsScore")) || 0;
    let missedCounts = JSON.parse(localStorage.getItem("missedCounts")) || {};
    let activeCards = JSON.parse(localStorage.getItem("activeCards")) || cards;;

    activeCards.forEach(c => { if (!(c.id in missedCounts)) missedCounts[c.id] = 0; });

    const questionEl = document.getElementById("question");
    const cardImage = document.getElementById("cardImage");
    const correctBtn = document.getElementById("correctBtn");
    const incorrectBtn = document.getElementById("incorrectBtn");
    const scoreEl = document.getElementById("score");
    const progressBar = document.getElementById("progressBar");
    const flashContainer = document.getElementById("flashContainer");

    let sessionResults = []

    if (!questionEl || !cardImage || !correctBtn || !incorrectBtn) return;

    function loadCard() {
        if (currentIndex >= activeCards.length) return;
        const card = activeCards[currentIndex];
        questionEl.textContent = "Identify the common name and Latin name of this plant";
        const randomImage = card.images[Math.floor(Math.random() * card.images.length)];
        cardImage.src = "images/" + randomImage;        
        correctBtn.style.display = "none";
        incorrectBtn.style.display = "none";

        const oldAnswer = questionEl.querySelector(".answer");
        if (oldAnswer) oldAnswer.remove();

        questionEl.style.opacity = 0;
        cardImage.style.opacity = 0;
        setTimeout(() => {
            questionEl.style.opacity = 1;
            cardImage.style.opacity = 1;
            questionEl.style.transition = "opacity 0.3s ease";
            cardImage.style.transition = "opacity 0.3s ease";
        }, 50);

        updateProgress();
        saveProgress();
    }

    cardImage.addEventListener("click", () => {
        if (questionEl.querySelector(".answer")) return;

        const card = activeCards[currentIndex];
        const answerDiv = document.createElement("div");
        answerDiv.classList.add("answer");
        answerDiv.style.marginTop = "10px";

        const table = document.createElement("table");
        table.style.width = "100%";
        table.style.borderCollapse = "collapse";

        function addRow(label, value) {
            const row = document.createElement("tr");
            const th = document.createElement("th");
            th.textContent = label;
            th.style.textAlign = "left";
            th.style.padding = "5px";
            th.style.borderBottom = "1px solid #c1e0cd";

            const td = document.createElement("td");
            td.textContent = value;
            td.style.padding = "5px";
            td.style.borderBottom = "1px solid #c1e0cd";
            td.style.textAlign = "left";

            row.appendChild(th);
            row.appendChild(td);
            table.appendChild(row);
        }

        addRow("Common Name", card.answer.commonName);
        addRow("Latin Name", card.answer.latinName);
        addRow("Additional Comments", card.answer.comments);

        answerDiv.appendChild(table);
        questionEl.appendChild(answerDiv);

        correctBtn.style.display = "inline-block";
        incorrectBtn.style.display = "inline-block";
    });

    function updateProgress() {
        scoreEl.textContent = `Score: ${score} / ${activeCards.length}`;
        progressBar.style.width = `${(currentIndex / activeCards.length) * 100}%`;
    }

    function saveProgress() {
        localStorage.setItem("flashcardsCurrentIndex", currentIndex);
        localStorage.setItem("flashcardsScore", score);
        localStorage.setItem("missedCounts", JSON.stringify(missedCounts));
    }

    function showResultsScreen() {
        localStorage.removeItem("activeCards");
        localStorage.removeItem("flashcardsCurrentIndex");
        localStorage.removeItem("flashcardsScore");
        localStorage.removeItem("missedCounts");

        flashContainer.innerHTML = "";

        const title = document.createElement("h2");
        title.textContent = `Session Complete! Score: ${score} / ${activeCards.length}`;

        const table = document.createElement("table");
        table.style.width = "100%";
        table.style.borderCollapse = "collapse";
        table.style.marginTop = "15px";

        // Header
        const headerRow = document.createElement("tr");
        ["Result", "Common Name", "Latin Name", "Category"].forEach(text => {
            const th = document.createElement("th");
            th.textContent = text;
            th.style.padding = "8px";
            th.style.borderBottom = "2px solid #91c99c";
            th.style.textAlign = "left";
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        // Rows
        sessionResults.forEach(result => {
            const row = document.createElement("tr");

            const resultCell = document.createElement("td");
            resultCell.textContent = result.correct ? "✅ Correct" : "❌ Incorrect";
            resultCell.style.padding = "8px";
            resultCell.style.textAlign = "left";

            const commonCell = document.createElement("td");
            commonCell.textContent = result.card.answer.commonName;
            commonCell.style.padding = "8px";
            commonCell.style.textAlign = "left";

            const latinCell = document.createElement("td");
            latinCell.textContent = result.card.answer.latinName;
            latinCell.style.padding = "8px";
            latinCell.style.textAlign = "left";

            const categoryCell = document.createElement("td");
            categoryCell.textContent = result.card.category;
            categoryCell.style.padding = "8px";
            categoryCell.style.textAlign = "left";

            row.appendChild(resultCell);
            row.appendChild(commonCell);
            row.appendChild(latinCell);
            row.appendChild(categoryCell);

            table.appendChild(row);
        });

        // Restart button
        const restartBtn = document.createElement("button");
        restartBtn.textContent = "Restart Session";
        restartBtn.className = "button";
        restartBtn.style.marginTop = "20px";

        restartBtn.addEventListener("click", () => {
            currentIndex = 0;
            score = 0;
            sessionResults = [];
            flashContainer.innerHTML = "";
            activeCards = cards;

            location.reload(); 
        });
        flashContainer.appendChild(title);
        flashContainer.appendChild(table);
        flashContainer.appendChild(restartBtn);
        
        if (score != activeCards.length) {
            const retryIncorrectBtn = document.createElement("button");
            retryIncorrectBtn.textContent = "Retry Incorrect Questions";
            retryIncorrectBtn.className = "button";
            retryIncorrectBtn.style.marginTop = "20px";
    
            retryIncorrectBtn.addEventListener("click", () => {
                currentIndex = 0;
                score = 0;
                activeCards = sessionResults
                                .filter(r => !r.correct)
                                .map(r => r.card);
                sessionResults = [];
                flashContainer.innerHTML = "";
                localStorage.setItem("activeCards", JSON.stringify(activeCards));
    
                location.reload(); 
            });
    
    
    
            flashContainer.appendChild(retryIncorrectBtn);
        }
    }

    correctBtn.addEventListener("click", () => nextCard(false));
    incorrectBtn.addEventListener("click", () => nextCard(true));

    function nextCard(wasMissed) {
        const card = activeCards[currentIndex];
        if (wasMissed) {
            missedCounts[card.id] = (missedCounts[card.id] || 0) + 1;
        } else score++;

        sessionResults.push({
            card,
            correct: !wasMissed
        });
        currentIndex++;

        if (currentIndex < activeCards.length) {
            updateProgress();
            saveProgress();
            loadCard();
        } else {
            showResultsScreen();
            return
        }
    }

    loadCard();
});