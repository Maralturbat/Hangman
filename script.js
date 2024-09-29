import {
    drawBody,
    drawHead,
    drawInitialStructure,
    drawLeftArm,
    drawLeftLeg,
    drawRightArm,
    drawRightLeg,
} from "./canvas.js";
import { categories, alphabetLetters } from "./words.js";
import { blastConfetti } from "./confetti.js";

let chosenWord = "";
let letterGuessed = 0;
let incorrectGuessedCount = 0;

const categoryContainer = document.querySelector("#category-container");
const alphabetContainer = document.querySelector("#alphabet-container");
const newGamePopup = document.querySelector(".new-game-popup");
const newGameButton = document.querySelector("#new-game-button");
document.addEventListener("DOMContentLoaded", () => {
    displayCategories();
    createAlphabetButtons();
    drawInitialStructure();
    newGameButton.addEventListener("click", newGame);
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
        button.addEventListener("click", selectLetter);
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

const selectLetter = (e) => {
    const selectedLetter = e.target.textContent.toLowerCase();
    const chosenWordArray = chosenWord.toLowerCase().split("");
    if (chosenWordArray.includes(selectedLetter)) {
        reavealLetters(chosenWordArray, selectedLetter);
        if (letterGuessed === chosenWordArray.length) {
            displayResult(true);
        }
    } else {
        incorrectGuessedCount++;
        drawMan();
        if (incorrectGuessedCount === 6) {
            displayResult(false);
        }
    }

    e.target.disabled = true;
};
const reavealLetters = (chosenWordArray, selectedLetter) => {
    const dashes = document.querySelectorAll(".dashes");

    chosenWordArray.forEach((letter, position) => {
        if (letter === selectedLetter) {
            dashes[position].textContent = selectedLetter;
            letterGuessed++;
        }
    });
};

const drawMan = () => {
    const drawFunctions = [
        drawHead,
        drawBody,
        drawLeftArm,
        drawRightArm,
        drawLeftLeg,
        drawRightLeg,
    ];
    if (incorrectGuessedCount <= drawFunctions.length) {
        drawFunctions[incorrectGuessedCount - 1]();
    }
};
const displayResult = (isWin) => {
    const h2 = document.querySelector(".new-game-popup h2");
    h2.textContent = isWin ? "You Win" : "You Lose";

    const p = document.querySelector(".new-game-popup p");
    p.textContent = `The chosen word was ${chosenWord}`;
    setTimeout(() => {
        newGamePopup.classList.add("active");
        if (isWin) blastConfetti();
    }, 500);
    categoryContainer.style.pointerEvents = "none";
};
const newGame = () => {
    letterGuessed = 0;
    incorrectGuessedCount = 0;
    chosenWord = "";
    document.getElementById("hidden-word").textContent = "";
    categoryContainer.innerHTML = "";
    alphabetContainer.innerHTML = "";
    categoryContainer.style.pointerEvents = "all";
    alphabetContainer.classList.remove("active");
    newGamePopup.classList.remove("active");
    displayCategories();
    createAlphabetButtons();
    drawInitialStructure();
    document
        .querySelectorAll(".category")
        .forEach((button) => (button.disabled = false));
};
