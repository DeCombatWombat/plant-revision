document.addEventListener("DOMContentLoaded", () => {
    let currentIndex = parseInt(localStorage.getItem("viewCurrentIndex")) || 0;
    let viewMode = "single";

    const container = document.getElementById("cardsContainer");
    const viewSelect = document.getElementById("viewModeSelect");
    const nextBtn = document.getElementById("nextCardBtn");
    const prevBtn = document.getElementById("prevCardBtn");
    const counterEl = document.getElementById("viewCounter");

    function updateCounter() {
        if (viewMode === "single") {
            counterEl.textContent = `Card ${currentIndex + 1} of ${cards.length}`;
        } else {
            counterEl.textContent = `Showing all ${cards.length} cards`;
        }
    }
    function createCardElement(card) {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");

        const qDiv = document.createElement("div");
        qDiv.id = "question";
        qDiv.classList.add("question-card");

        const img = document.createElement("img");
        img.src = "images/" + card.image;
        img.id = "cardImage";
        img.classList.add("card-image");

        cardDiv.appendChild(qDiv);
        cardDiv.appendChild(img);

        // Answer table
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
        cardDiv.appendChild(answerDiv);

        cardDiv.style.opacity = 0;
        setTimeout(() => {
            cardDiv.style.opacity = 1;
            cardDiv.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        }, 50);

        return cardDiv;
    }

    function renderCards() {
        container.innerHTML = "";

        if (viewMode === "scroll") {
            cards.forEach(card => {
                const el = createCardElement(card);
                el.style.display = "block";
                el.style.marginBottom = "20px";
                container.appendChild(el);
            });
            nextBtn.style.display = "none";
            prevBtn.style.display = "none";
        } else {
            if (cards.length === 0) return;
            const card = cards[currentIndex];
            container.appendChild(createCardElement(card));
            nextBtn.style.display = "inline-block";
            prevBtn.style.display = "inline-block";
        }

        updateCounter();

        localStorage.setItem("viewCurrentIndex", currentIndex);
    }

    viewSelect.addEventListener("change", () => {
        viewMode = viewSelect.value;
        renderCards();
    });

    nextBtn.addEventListener("click", () => {
        if (viewMode === "single" && currentIndex < cards.length - 1) {
            currentIndex++;
            renderCards();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (viewMode === "single" && currentIndex > 0) {
            currentIndex--;
            renderCards();
        }
    });

    renderCards();
});