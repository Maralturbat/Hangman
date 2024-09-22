import { drawInitialStructure } from "./canvas.js";
import { categories, alphabetLetters } from "./words.js";

let chosenWord = "";

const categoryContainer = document.querySelector("#category-container");
const alphabetContainer = document.querySelector("#alphabet-container");

document.addEventListener("DOMContentLoaded", () => {
    displayCategories();
    createAlphabetButtons();
    drawInitialStructure();
});

const displayCategories = () => {
    Object.keys(categories).forEach((category) => {
        const button = document.createElement("button");
        button.className = "category";
        button.textContent = category;
        button.addEventListener("click", () => selectCategory(category));
        categoryContainer.appendChild(button);
    });
};

const createAlphabetButtons = () => {
    const alphabetLettersArray = alphabetLetters.split("");
    alphabetLettersArray.forEach((letter) => {
        const button = document.createElement("button");
        button.className = "letter";
        button.textContent = letter;
        alphabetContainer.appendChild(button);
    });
};

// fruits
// animals
// countries

// categories[fruits]

const selectCategory = (selectedCategory) => {
    document.querySelectorAll(".category").forEach((button) => {
        button.textContent === selectedCategory
            ? button.classList.add("active")
            : (button.disabled = true);
    });
    if (!chosenWord) {
        const wordsArray = categories[selectedCategory];
        const randomIndex = Math.floor(Math.random() * wordsArray.length);
        chosenWord = wordsArray[randomIndex];
        console.log(chosenWord);
    }

    alphabetContainer.classList.add("active");

    const hiddenWord = document.querySelector("#hidden-word");
    hiddenWord.textContent = "";
    hiddenWord.classList.add("active");
    hiddenWord.innerHTML = chosenWord
        .split("")
        .map(() => '<span class="dashes">-</span>')
        .join("");
};
