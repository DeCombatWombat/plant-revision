document.addEventListener("DOMContentLoaded", () => {
    const randomFlashcardButton = document.getElementById("randomFlashcardButton");
    const allFlashcardButton = document.getElementById("allFlashcardButton");
    const randomSpellingButton = document.getElementById("randomSpellingButton");
    const allSpellingButton = document.getElementById("allSpellingButton");

    randomFlashcardButton.addEventListener("click", () => {
        localStorage.setItem("selectedCategory", "random")
    });

    allFlashcardButton.addEventListener("click", () => {
        localStorage.setItem("selectedCategory", "all")
    });
    
    randomSpellingButton.addEventListener("click", () => {
        localStorage.setItem("selectedCategory", "random")
    });

    allSpellingButton.addEventListener("click", () => {
        localStorage.setItem("selectedCategory", "all")
    });
});