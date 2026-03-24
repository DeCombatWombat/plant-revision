document.addEventListener("DOMContentLoaded", () => {
    let currentIndex = parseInt(localStorage.getItem("spellingCurrentIndex")) || 0;
    let score = parseInt(localStorage.getItem("spellingScore")) || 0;
    let missedCounts = JSON.parse(localStorage.getItem("missedCounts")) || {};
    cards.forEach(c => { if (!(c.id in missedCounts)) missedCounts[c.id] = 0; });

    const questionEl = document.getElementById("question");
    const cardImage = document.getElementById("cardImage");
    const spellingInput = document.getElementById("spellingInput");
    const submitBtn = document.getElementById("submitSpelling");
    const nextBtn = document.getElementById("nextSpelling");
    const feedbackEl = document.getElementById("feedback");
    const scoreEl = document.getElementById("score");
    const progressBar = document.getElementById("progressBar");

    function loadCard() {
        if (currentIndex >= cards.length) return;
        const card = cards[currentIndex];
        questionEl.textContent = card.question;
        cardImage.src = "images/" + card.image;

        spellingInput.value = "";
        feedbackEl.textContent = "";
        nextBtn.style.display = "none";

        spellingInput.disabled = false;
        submitBtn.disabled = false;

        updateProgress();
        saveProgress();
    }

    function updateProgress() {
        scoreEl.textContent = `Score: ${score} / ${currentIndex}`;
        progressBar.style.width = `${(currentIndex / cards.length) * 100}%`;
    }

    function saveProgress() {
        localStorage.setItem("spellingCurrentIndex", currentIndex);
        localStorage.setItem("spellingScore", score);
        localStorage.setItem("missedCounts", JSON.stringify(missedCounts));
    }

    submitBtn.addEventListener("click", () => {
        const card = cards[currentIndex];
        const userAnswer = spellingInput.value.trim().toLowerCase();
        let wasMissed = false;

        spellingInput.disabled = true;
        submitBtn.disabled = true;

        if (userAnswer === card.spelling.toLowerCase()) {
            feedbackEl.textContent = "✅ Correct!";
            feedbackEl.style.color = "#3c5a3c";
            score++;
        } else {
            feedbackEl.textContent = `❌ Incorrect. Correct: ${card.spelling}`;
            feedbackEl.style.color = "#9b2f2f";
            wasMissed = true;
            missedCounts[card.id] = (missedCounts[card.id] || 0) + 1;
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

    nextBtn.addEventListener("click", () => {
        currentIndex++;
        if (currentIndex < cards.length) {
            loadCard();
        } else {
            alert(`Spelling revision complete! Final score: ${score} / ${cards.length}`);
            currentIndex = 0;
            score = 0;
            localStorage.removeItem("spellingCurrentIndex");
            localStorage.removeItem("spellingScore");
            saveProgress();
            loadCard();
        }
    });

    loadCard();
});