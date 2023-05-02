#!/bin/bash
set -e

if [ ! -f .env ]; then
    echo "Creating .env file from env.template"
    cp .env.template .env
fi

echo "Enter your OpenAI API key:"
read API_KEY
echo "API_KEY=$API_KEY" >> .env

echo "Starting Flask app..."
flask run --host=0.0.0.0
