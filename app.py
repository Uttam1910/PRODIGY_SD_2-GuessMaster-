from flask import Flask, request, jsonify, send_from_directory
import random
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='frontend', static_url_path='')  # Serving frontend from 'frontend' folder
CORS(app)

# Generate the random number
secret_number = random.randint(1, 100)
attempts = 0

@app.route('/')
def serve_frontend():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/guess', methods=['POST'])
def guess():
    global attempts
    user_guess = int(request.json['guess'])
    attempts += 1
    if user_guess > secret_number:
        return jsonify({'result': 'Too high', 'attempts': attempts})
    elif user_guess < secret_number:
        return jsonify({'result': 'Too low', 'attempts': attempts})
    else:
        return jsonify({'result': 'Correct', 'attempts': attempts})

if __name__ == '__main__':
    app.run(debug=True)
