#!/bin/bash
set -e

if [ ! -f .env ]; then
    echo "Creating .env file from env.template"
    cp .env.template .env
fi

# Install Python dependencies if needed
if [ ! -d "venv" ]; then
    python3 -m venv venv
    . venv/bin/activate
    pip install -r requirements.txt
else
    . venv/bin/activate
fi

echo "Enter your OpenAI API key:"
read OPENAI_API_KEY

# Remove any existing OPENAI_API_KEY line from the .env file
grep -v "^OPENAI_API_KEY=" .env > .env.tmp && mv .env.tmp .env

# Append the new OPENAI_API_KEY value to the .env file
echo "OPENAI_API_KEY=$OPENAI_API_KEY" >> .env

echo "Starting Flask app..."
flask run --host=0.0.0.0
