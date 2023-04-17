# Use the official Python image as a base image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy the requirements.txt to the working directory
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the chatbot-ui folder to the working directory
COPY chatbot-ui /app/chatbot-ui

# Install Node.js
RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install npm dependencies for the chatbot-ui
WORKDIR /app/chatbot-ui
RUN npm install

# Build the React app
RUN npm run build

# Copy the rest of the application code to the working directory
WORKDIR /app
COPY . .

# Set the environment variable for Flask
ENV FLASK_APP=app.py

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD ["flask", "run", "--host=0.0.0.0"]
