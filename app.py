# Standard library
import os

# Third-party libraries
from dotenv import load_dotenv
from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
import openai


# Load variables from the .env file
load_dotenv()

# Load your API key from an environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__, static_folder='chatbot-ui/build', static_url_path='')

CORS(app)


@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route("/chat", methods=["POST"])
def chat():
    message = request.json["message"]

    openai.api_key = os.getenv("OPENAI_API_KEY")

    response = openai.Completion.create(
        model="text-davinci-003",  # <-- Update the engine here
        prompt=f"User: {message}\nAssistant:",
        temperature=0.5,
        max_tokens=300,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
        stop=["\n"],
    )

    ai_message = response.choices[0].text.strip()

    return jsonify({"message": ai_message})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
