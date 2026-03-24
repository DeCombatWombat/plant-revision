document.addEventListener("DOMContentLoaded", () => {
    let currentIndex = parseInt(localStorage.getItem("spellingCurrentIndex")) || 0;
    let score = parseInt(localStorage.getItem("spellingScore")) || 0;
    let missedCounts = JSON.parse(localStorage.getItem("missedCounts")) || {};
    let activeSpellingCards = JSON.parse(localStorage.getItem("activeSpellingCards")) || cards;;

    activeSpellingCards.forEach(c => { if (!(c.id in missedCounts)) missedCounts[c.id] = 0; });

    const questionEl = document.getElementById("question");
    const cardImage = document.getElementById("cardImage");
    const spellingInput = document.getElementById("spellingInput");
    const submitBtn = document.getElementById("submitSpelling");
    const nextBtn = document.getElementById("nextSpelling");
    const feedbackEl = document.getElementById("feedback");
    const scoreEl = document.getElementById("score");
    const progressBar = document.getElementById("progressBar");
    const flashContainer = document.getElementById("flashContainer");
    let sessionResults = []

    function loadCard() {
        if (currentIndex >= activeSpellingCards.length) return;
        const card = activeSpellingCards[currentIndex];
        questionEl.textContent = "Spell the Latin name of this plant";
        const randomImage = card.images[Math.floor(Math.random() * card.images.length)];
        cardImage.src = "images/" + randomImage;        

        spellingInput.value = "";
        feedbackEl.textContent = "";
        nextBtn.style.display = "none";

        spellingInput.disabled = false;
        submitBtn.disabled = false;

        updateProgress();
        saveProgress();
    }

    function updateProgress() {
        scoreEl.textContent = `Score: ${score} / ${activeSpellingCards.length}`;
        progressBar.style.width = `${(currentIndex / activeSpellingCards.length) * 100}%`;
    }

    function saveProgress() {
        localStorage.setItem("spellingCurrentIndex", currentIndex);
        localStorage.setItem("spellingScore", score);
        localStorage.setItem("missedCounts", JSON.stringify(missedCounts));
    }

    submitBtn.addEventListener("click", () => {
        const card = activeSpellingCards[currentIndex];
        const userAnswer = spellingInput.value.trim().toLowerCase();
        let wasMissed = false;

        spellingInput.disabled = true;
        submitBtn.disabled = true;

        if (userAnswer === card.spelling.toLowerCase()) {
            feedbackEl.textContent = "✅ Correct!";
            feedbackEl.style.color = "#3c5a3c";
            score++;
            sessionResults.push({
                card,
                correct: true
            });
        } else {
            feedbackEl.textContent = `❌ Incorrect. Correct: ${card.spelling}`;
            feedbackEl.style.color = "#9b2f2f";
            wasMissed = true;
            missedCounts[card.id] = (missedCounts[card.id] || 0) + 1;
            sessionResults.push({
                card,
                correct: false
            });
        }

        // Show answer table
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

            row.appendChild(th);
            row.appendChild(td);
            table.appendChild(row);
        }

        addRow("Common Name", card.answer.commonName);
        addRow("Latin Name", card.answer.latinName);
        addRow("Additional Comments", card.answer.comments);
        answerDiv.appendChild(table);
        questionEl.appendChild(answerDiv);

        updateProgress();
        saveProgress();

        // Show next button now that answer is revealed
        nextBtn.style.display = "inline-block";
    });

    function showResultsScreen() {
        localStorage.removeItem("activeSpellingCards");
        localStorage.removeItem("spellingCurrentIndex");
        localStorage.removeItem("spellingScore");

        flashContainer.innerHTML = "";

        const title = document.createElement("h2");
        title.textContent = `Session Complete! Score: ${score} / ${activeSpellingCards.length}`;

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

            const commonCell = document.createElement("td");
            commonCell.textContent = result.card.answer.commonName;
            commonCell.style.padding = "8px";

            const latinCell = document.createElement("td");
            latinCell.textContent = result.card.answer.latinName;
            latinCell.style.padding = "8px";

            const categoryCell = document.createElement("td");
            categoryCell.textContent = result.card.category;
            categoryCell.style.padding = "8px";

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
            activeSpellingCards = cards;

            location.reload(); 
        });
        flashContainer.appendChild(title);
        flashContainer.appendChild(table);
        flashContainer.appendChild(restartBtn);
        
        if (score != activeSpellingCards.length) {
            const retryIncorrectBtn = document.createElement("button");
            retryIncorrectBtn.textContent = "Retry Incorrect Questions";
            retryIncorrectBtn.className = "button";
            retryIncorrectBtn.style.marginTop = "20px";
    
            retryIncorrectBtn.addEventListener("click", () => {
                currentIndex = 0;
                score = 0;
                activeSpellingCards = sessionResults
                                .filter(r => !r.correct)
                                .map(r => r.card);
                sessionResults = [];
                flashContainer.innerHTML = "";
                localStorage.setItem("activeSpellingCards", JSON.stringify(activeSpellingCards));
    
                location.reload(); 
            });
    
            flashContainer.appendChild(retryIncorrectBtn);
        }
    }

    nextBtn.addEventListener("click", () => {
        currentIndex++;
        if (currentIndex < activeSpellingCards.length) {
            loadCard();
        } else {
            showResultsScreen();
            return
        }
    });

    loadCard();
});