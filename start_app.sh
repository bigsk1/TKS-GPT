#!/bin/bash
set -e

if [ ! -f ".env" ]; then
    cp env.template .env
    echo "Please enter your OpenAI API Key:"
    read -r api_key
    echo "OPENAI_API_KEY=$api_key" >> .env
fi

flask run --host=0.0.0.0
