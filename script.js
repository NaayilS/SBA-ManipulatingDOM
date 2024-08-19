// Cache at least one element using selectElementById
const gameContainer = document.getElementById('game-container');
const form = document.getElementById('username-form');
const usernameInput = document.getElementById('username');
const game = document.getElementById('game');
const greeting = document.getElementById('greeting');
const movingButton = document.getElementById('moving-button');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const gameOverScreen = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');
const scoreLog = document.getElementById('score-log');
const restartButton = document.getElementById('restart-button');

// Cache at least one element using querySelector or querySelectorAll
const score = document.querySelector('#score');

let scoreCount = 0;
let timeLeft = 35; // Initial time in seconds
let gameTimer;

// Register at least two different event listeners and create the associated event handler function
form.addEventListener('submit', startGame);
movingButton.addEventListener('click', updateScore);
restartButton.addEventListener('click', restartGame);

function startGame(e) {
    e.preventDefault();

    // Modify the HTML or text content of at least one element in response to user interaction using innerHTML, innerText, or textContent
    greeting.textContent = `Hello, ${usernameInput.value}!`;

    // Modify the style and/or CSS classes of an element in response to user interactions using the style or classList properties
    game.classList.remove('hidden');
    form.classList.add('hidden');

    // Use the parent-child-sibling relationship to navigate between elements at least once
    console.log(movingButton.parentNode); // Logs the parent of the button, which is the gameContainer
    console.log(movingButton.nextElementSibling); // Logs the next sibling of the button, which is the scoreDisplay

    // Start the countdown timer
    startTimer();

    moveButton();
}

function updateScore() {
    scoreCount++;
    // Modify the HTML or text content of at least one element in response to user interaction using innerHTML, innerText, or textContent
    scoreDisplay.textContent = `Score: ${scoreCount}`;
    
    // Decrease time with each successful click
    timeLeft = Math.max(1, timeLeft - 1); // Ensure the time doesn't go below 1 second
    // Modify the HTML or text content of at least one element in response to user interaction using innerHTML, innerText, or textContent
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    moveButton();
}

function moveButton() {
    // Modify at least one attribute of an element in response to user interaction
    const x = Math.floor(Math.random() * (gameContainer.offsetWidth - movingButton.offsetWidth));
    const y = Math.floor(Math.random() * (gameContainer.offsetHeight - movingButton.offsetHeight));
    
    movingButton.style.left = `${x}px`;
    movingButton.style.top = `${y}px`;
}

function startTimer() {
    // Use at least two Browser Object Model (BOM) properties or methods
    gameTimer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(gameTimer);
            endGame();
        }
    }, 1000);
}

function endGame() {
    game.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');

    finalScoreDisplay.textContent = `Your final score is: ${scoreCount}`;
    
    // Create at least one element using createElement
    // Use appendChild and/or prepend to add new elements to the DOM
    const scoreEntry = document.createElement('li');
    scoreEntry.textContent = `${usernameInput.value}: ${scoreCount}`;
    scoreLog.appendChild(scoreEntry);
}

function restartGame() {
    // Reset game variables
    scoreCount = 0;
    timeLeft = 35;
    scoreDisplay.textContent = `Score: 0`;
    timerDisplay.textContent = `Time Left: 35s`;

    // Hide game over screen and show the game again
    gameOverScreen.classList.add('hidden');
    form.classList.remove('hidden');
    
    // Clear previous greeting
    greeting.textContent = '';

    usernameInput.value = '';
}

// Include at least one form and/or input with DOM event-based validation
usernameInput.addEventListener('input', function () {
    if (usernameInput.value.length < 3) {
        usernameInput.setCustomValidity("Name must be at least 3 characters long.");
    } else {
        usernameInput.setCustomValidity("");
    }
});
