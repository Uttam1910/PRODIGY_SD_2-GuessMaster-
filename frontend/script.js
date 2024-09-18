let secretNumber = generateRandomNumber();
let attempts = 0;
let bestScore = localStorage.getItem('bestScore') || null;
let guessHistory = JSON.parse(localStorage.getItem('guessHistory')) || [];

document.getElementById('bestScore').innerText = bestScore ? bestScore : 'N/A';
updateGuessHistory();

function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function submitGuess() {
    let guess = parseInt(document.getElementById('guessInput').value);
    if (isNaN(guess)) {
        alert('Please enter a valid number');
        return;
    }
    attempts++;
    let feedback = '';

    if (guess > secretNumber) {
        feedback = 'Too high';
    } else if (guess < secretNumber) {
        feedback = 'Too low';
    } else {
        feedback = 'Correct! You guessed it in ' + attempts + ' attempts.';
        if (!bestScore || attempts < bestScore) {
            bestScore = attempts;
            localStorage.setItem('bestScore', bestScore);
            document.getElementById('bestScore').innerText = bestScore;
        }
        saveHistory(guess, feedback);
        alert('You won! Starting a new game...');
        startNewGame();
        return;
    }
    
    saveHistory(guess, feedback);
    document.getElementById('feedback').innerText = feedback;
    document.getElementById('attempts').innerText = attempts;
}

function startNewGame() {
    secretNumber = generateRandomNumber();
    attempts = 0;
    document.getElementById('feedback').innerText = '';
    document.getElementById('attempts').innerText = attempts;
    guessHistory = [];
    localStorage.setItem('guessHistory', JSON.stringify(guessHistory));
    updateGuessHistory();
}

function resetHistory() {
    guessHistory = [];
    localStorage.setItem('guessHistory', JSON.stringify(guessHistory));
    localStorage.removeItem('bestScore');
    document.getElementById('bestScore').innerText = 'N/A';
    updateGuessHistory();
}

function revealNumber() {
    alert('The correct number was: ' + secretNumber);
    startNewGame();
}

function saveHistory(guess, feedback) {
    guessHistory.push({ guess: guess, feedback: feedback });
    localStorage.setItem('guessHistory', JSON.stringify(guessHistory));
    updateGuessHistory();
}

function updateGuessHistory() {
    let historyElement = document.getElementById('guessHistory');
    historyElement.innerHTML = '';
    guessHistory.forEach((entry, index) => {
        let li = document.createElement('li');
        li.innerText = `Attempt ${index + 1}: ${entry.guess} (${entry.feedback})`;
        historyElement.appendChild(li);
    });
}
