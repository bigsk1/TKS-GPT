# Build stage for the React app
FROM node:19 AS react-build
WORKDIR /app/chatbot-ui
COPY chatbot-ui/package*.json ./
RUN npm ci
COPY chatbot-ui/ ./
RUN npm run build

# Production stage for the Python Flask app
FROM python:3.11-slim
WORKDIR /app

# Upgrade pip
RUN pip install --upgrade pip

# Install setuptools version 66.1
RUN pip install 'setuptools==66.1.1'

# Copy the requirements.txt to the working directory
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the React build output from the build stage
COPY --from=react-build /app/chatbot-ui/build /app/chatbot-ui/build

# Copy the rest of the application code to the working directory
COPY . .

# Set the environment variable for Flask
ENV FLASK_APP=app.py

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD ["flask", "run", "--host=0.0.0.0"]
