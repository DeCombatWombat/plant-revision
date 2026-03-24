document.addEventListener("DOMContentLoaded", () => {
    let currentIndex = parseInt(localStorage.getItem("flashcardsCurrentIndex")) || 0;
    let score = parseInt(localStorage.getItem("flashcardsScore")) || 0;
    let missedCounts = JSON.parse(localStorage.getItem("missedCounts")) || {};
    cards.forEach(c => { if (!(c.id in missedCounts)) missedCounts[c.id] = 0; });

    const questionEl = document.getElementById("question");
    const cardImage = document.getElementById("cardImage");
    const correctBtn = document.getElementById("correctBtn");
    const incorrectBtn = document.getElementById("incorrectBtn");
    const scoreEl = document.getElementById("score");
    const progressBar = document.getElementById("progressBar");

    if (!questionEl || !cardImage || !correctBtn || !incorrectBtn) return;

    function loadCard() {
        if (currentIndex >= cards.length) return;
        const card = cards[currentIndex];
        questionEl.textContent = "Identify the common name and Latin name of this plant";
        cardImage.src = "images/" + card.image;
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

        const card = cards[currentIndex];
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

        correctBtn.style.display = "inline-block";
        incorrectBtn.style.display = "inline-block";
    });

    function updateProgress() {
        scoreEl.textContent = `Score: ${score} / ${currentIndex}`;
        progressBar.style.width = `${(currentIndex / cards.length) * 100}%`;
    }

    function saveProgress() {
        localStorage.setItem("flashcardsCurrentIndex", currentIndex);
        localStorage.setItem("flashcardsScore", score);
        localStorage.setItem("missedCounts", JSON.stringify(missedCounts));
    }

    correctBtn.addEventListener("click", () => nextCard(false));
    incorrectBtn.addEventListener("click", () => nextCard(true));

    function nextCard(wasMissed) {
        if (wasMissed) {
            const card = cards[currentIndex];
            missedCounts[card.id] = (missedCounts[card.id] || 0) + 1;
        } else score++;

        currentIndex++;
        if (currentIndex < cards.length) {
            updateProgress();
            saveProgress();
            loadCard();
        } else {
            alert(`Revision complete! Final score: ${score} / ${cards.length}`);
            currentIndex = 0;
            score = 0;
            localStorage.removeItem("flashcardsCurrentIndex");
            localStorage.removeItem("flashcardsScore");
            saveProgress();
            loadCard();
        }
    }

    loadCard();
});