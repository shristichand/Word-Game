//List of variables
const words = [
    "apple",       // Common fruit
    "banana",      // Common fruit
    "mango",       // Common fruit
    "strawberry",  // Common fruit
    "blueberry",   // Common fruit
    "cherry",      // Common fruit
    "python",      // Programming language
    "javascript",  // Programming language
    "react",       // JavaScript library
    "developer",   // Profession
    "computer",    // Electronic device
    "keyboard",    // Input device
    "giraffe",     // Animal
    "elephant",    // Animal
    "mountain",    // Geographical feature
    "ocean",       // Body of water
    "dinosaur",    // Extinct animal
    "unicorn",     // Mythical creature
    "astronaut",   // Occupation
    "galaxy",      // Space feature
    "puzzle",      // Game type
    "adventure",   // Game type
    "journey",     // Experience
    "mystery",     // Genre
    "secret",      // Concept
    "hero",        // Character role
    "villain",     // Character role
    "treasure",    // Concept
    "castle",      // Structure
    "dragon"       // Mythical creature
];

const secretword = words[Math.floor(Math.random()*words.length)];
const maxAttempts = 6;
let attemptsLeft = maxAttempts;
let guessedLetters = [];
let randomWord = Array(secretword.length).fill("-");

//Extract from Html

const wordContainer = document.getElementById("word");
const attemptsContainer = document.querySelector(".attempts");  // Fixed
const keyboardContainer = document.querySelector(".keyboard");  // Correct selection
const resultContainer = document.querySelector(".results");     // Fixed

function revealInitialLetters() {
    // Choose positions to reveal (e.g., 1 and 3)
    const a = Math.floor(Math.random()*secretword.length);
    const b = Math.floor(Math.random()*secretword.length);
    let positionsToReveal = [a, b];
    positionsToReveal.forEach(pos => {
        if (pos < secretword.length) {
            randomWord[pos] = secretword[pos];
        }
    });
}

function initGame() {
    revealInitialLetters();
    displayWord();

   

        // Create A-Z buttons
        for (let i = 65; i <= 90; i++) {
            const letter = String.fromCharCode(i);
            const button = document.createElement("button");
            button.textContent = letter;
            button.setAttribute("data-key", letter.toLowerCase());
            button.onclick = handleGuess;


            // Append the button to the keyboard container
            keyboardContainer.appendChild(button);
        }
    } 
    

    function handleGuess(event) {
        const key = event.target.getAttribute("data-key");
        event.target.disabled = true;
        if(secretword.includes(key)){
            for(let i = 0; i < secretword.length; i++){
                if(secretword[i] === key){
                    
                    randomWord[i] = key;
                }
            }
            displayWord();
        }
        else {
            // Decrease attempts if the guess is wrong
            attemptsLeft--;
            attemptsContainer.textContent = `Attempts left: ${attemptsLeft}`;
        }

        checkGameOver();
    }

function displayWord(){
    wordContainer.innerHTML = "";
    randomWord.forEach(letters => {
        const span = document.createElement("span");
        span.textContent = letters;
        span.classList.add("letter");
        wordContainer.appendChild(span);

    })

}

function checkGameOver(){

    if(randomWord.join("") === secretword){
        resultContainer.textContent = "Congratulations! You won!";
        disableAllButtons();
    }
    else if(attemptsLeft === 0){
        resultContainer.textContent = "Sorry, you lost! The correct word was: " + secretword;
        disableAllButtons();
    }
}

function disableAllButtons(){
    const buttons = document.querySelectorAll(".keyboard button");
    buttons.forEach(button => button.disabled = true);
}


initGame();