document.addEventListener("DOMContentLoaded", () => {
    const statsContainer = document.getElementById("statsContainer");
    const resetBtn = document.getElementById("resetStatsBtn");

    if (!statsContainer) return;

    function renderStats() {
        statsContainer.innerHTML = "";

        // Retrieve missed counts from localStorage
        const missedCounts = JSON.parse(localStorage.getItem("missedCounts")) || {};

        // Merge counts with card data
        const statsData = cards.map(card => ({
            commonName: card.answer.commonName,
            latinName: card.answer.latinName,
            missed: missedCounts[card.id] || 0
        }));

        // Sort descending by missed count
        statsData.sort((a, b) => b.missed - a.missed);

        // Create table
        const table = document.createElement("table");
        table.style.width = "100%";
        table.style.borderCollapse = "collapse";

        // Header row
        const headerRow = document.createElement("tr");
        ["Common Name", "Latin Name", "Mistakes"].forEach(header => {
            const th = document.createElement("th");
            th.textContent = header;
            th.style.padding = "8px";
            th.style.textAlign = "left";
            th.style.borderBottom = "2px solid #91c99c";
            th.style.color = "#2f5d3e";
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        // Data rows
        statsData.forEach(item => {
            const row = document.createElement("tr");
            [item.commonName, item.latinName, item.missed].forEach(value => {
                const td = document.createElement("td");
                td.textContent = value;
                td.style.padding = "8px";
                td.style.borderBottom = "1px solid #c1e0cd";
                td.style.color = "#3c5d3c";
                td.style.textAlign = "left";
                row.appendChild(td);
            });
            table.appendChild(row);
        });

        statsContainer.appendChild(table);
    }

    renderStats();

    // Reset button functionality
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to reset all stats?")) {
                localStorage.removeItem("missedCounts");
                localStorage.removeItem("flashcardsScore");
                localStorage.removeItem("spellingScore");
                localStorage.removeItem("flashcardsCurrentIndex");
                localStorage.removeItem("spellingCurrentIndex");
                renderStats();
                alert("Stats have been reset!");
            }
        });
    }
});