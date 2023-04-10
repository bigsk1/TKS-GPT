# Standard library
import os

# Third-party libraries
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
import openai


# Load variables from the .env file
load_dotenv()

# Load your API key from an environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)


@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message', '')
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"{user_message}\nAI:",
        temperature=0.8,
        max_tokens=150,
    )

    ai_message = response.choices[0].text.strip()
    return jsonify({'message': ai_message})

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
