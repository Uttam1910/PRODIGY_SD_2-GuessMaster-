// Initialize game variables
let secretNumber = generateRandomNumber();
let attempts = 0;
let bestScore = localStorage.getItem('bestScore') || null;
let guessHistory = JSON.parse(localStorage.getItem('guessHistory')) || [];

// Display the best score (if exists) and update guess history
document.getElementById('bestScore').innerText = bestScore ? bestScore : 'N/A';
updateGuessHistory();

// Function to generate a random number between 1 and 100
function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// Handle the submission of a guess
function submitGuess() {
    const guessInput = document.getElementById('guessInput');
    const guess = parseInt(guessInput.value);
    const feedbackElement = document.getElementById('feedback');

    // Check for a valid number input
    if (isNaN(guess)) {
        feedbackElement.innerText = 'Please enter a valid number!';
        return;
    }

    attempts++;
    let feedback = '';

    // Compare the guess with the secret number
    if (guess > secretNumber) {
        feedback = `Your guess of ${guess} is higher than the chosen number.`;
    } else if (guess < secretNumber) {
        feedback = `Your guess of ${guess} is lower than the chosen number.`;
    } else {
        feedback = `Correct! You guessed the number in ${attempts} attempts.`;

        // Check for best score
        if (!bestScore || attempts < bestScore) {
            bestScore = attempts;
            localStorage.setItem('bestScore', bestScore);
            document.getElementById('bestScore').innerText = bestScore;
        }

        // Save the history and start a new game
        saveHistory(guess, feedback);
        feedbackElement.innerText = feedback;
        alert('Congratulations! You guessed the correct number! Starting a new game...');
        startNewGame();
        return;
    }

    // Save the guess history and update UI feedback
    saveHistory(guess, feedback);
    feedbackElement.innerText = feedback;
    document.getElementById('attempts').innerText = attempts;

    // Clear the input for the next guess
    guessInput.value = '';
    guessInput.focus();
}

// Start a new game with a fresh secret number and reset attempts and history
function startNewGame() {
    secretNumber = generateRandomNumber();
    attempts = 0;
    guessHistory = [];

    // Update UI elements
    document.getElementById('feedback').innerText = '';
    document.getElementById('attempts').innerText = attempts;
    localStorage.setItem('guessHistory', JSON.stringify(guessHistory));
    updateGuessHistory();
}

// Reset the guess history and clear the best score
function resetHistory() {
    guessHistory = [];
    localStorage.setItem('guessHistory', JSON.stringify(guessHistory));
    localStorage.removeItem('bestScore');
    document.getElementById('bestScore').innerText = 'N/A';
    updateGuessHistory();
}

// Reveal the secret number and start a new game
function revealNumber() {
    alert('The correct number was: ' + secretNumber);
    startNewGame();
}

// Save the current guess and feedback to the history
function saveHistory(guess, feedback) {
    guessHistory.push({ guess, feedback });
    localStorage.setItem('guessHistory', JSON.stringify(guessHistory));
    updateGuessHistory();
}

// Update the guess history list in the UI
function updateGuessHistory() {
    const historyElement = document.getElementById('guessHistory');
    historyElement.innerHTML = '';

    // Populate the guess history
    guessHistory.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.innerText = `Attempt ${index + 1}: ${entry.guess} (${entry.feedback})`;
        historyElement.appendChild(listItem);
    });
}
