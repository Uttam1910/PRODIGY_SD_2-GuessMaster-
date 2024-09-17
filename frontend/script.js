async function submitGuess() {
    let guess = document.getElementById('guessInput').value;
    let response = await fetch('http://127.0.0.1:5000/guess', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guess: guess }),
    });
    let data = await response.json();
    document.getElementById('feedback').innerText = data.result;
    document.getElementById('attempts').innerText = data.attempts;
}
