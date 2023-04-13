# Standard library
import os
import logging

# Third-party libraries
from dotenv import load_dotenv
from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
import openai

logging.basicConfig(filename='flask_app.log', level=logging.WARNING)

# Load variables from the .env file
load_dotenv()

# Load your API key from an environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

# Initializes the Flask app with the specified static folder for serving the React build
app = Flask(__name__, static_folder='chatbot-ui/build', static_url_path='')

# Enables Cross-Origin Resource Sharing for your Flask app, allowing your React app to make requests to the Flask server
CORS(app)


# Sets up the root route to serve the index.html file from the React build folder.
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

# Sets up the /chat route to handle chat requests from the React app.
@app.route("/chat", methods=["POST"])
def chat():
    message = request.json["message"]

    try:
        # Adding explicit instructions to the message
        message_with_instructions = (
            f"Provide the response in an appropriate format (code block, bullet points, numbered list, or email template) if applicable: {message}"
        )

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": message_with_instructions}
            ],
            max_tokens=700,
            temperature=0.7,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0,
        )
        ai_message = response.choices[0].message["content"].strip()

    except openai.error.APIError as e:
        print(f"OpenAI API returned an API Error: {e}")
        ai_message = "Error: API Error"

    except openai.error.APIConnectionError as e:
        print(f"Failed to connect to OpenAI API: {e}")
        ai_message = "Error: Connection Error"

    except openai.error.RateLimitError as e:
        print(f"OpenAI API request exceeded rate limit: {e}")
        ai_message = "Error: Rate Limit Exceeded"

    # You can also add additional logic here to further process
        # the response before sending it to the front-end.
    except Exception as e:
        # Handle exceptions
        pass

    return jsonify({"message": ai_message})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
