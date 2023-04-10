# TKS-GPT

## AI Chat Bot

Built with python, flask, node.js and react

All you need is to add your Open AI API Key to the .env and run it!

</br>

To install clone the repo

```bash
git clone https://github.com/bigsk1/TKS-GPT.git
```

```bash
cd TKS-GPT
```
Active Virtual Enviroment


For Python, you'll need to create a virtual environment. In your project directory, run:

```bash
python3 -m venv venv
```
Activate the virtual environment:

```bash
source venv/bin/activate
```

Install Python dependencies:

With the virtual environment activated, install the required Python packages using the requirements.txt file:

```bash
pip install -r requirements.txt
```
Exit out and back to the TKS-GPT folder 

</br>

Install Node.js and npm:

Make sure Node.js and npm are installed on your system. You can check if they are installed by running:

```bash
node -v
npm -v
```

If not installed, you can download them from the official Node.js website https://nodejs.org/en/download/

</br>

Install frontend dependencies:

Navigate to the frontend folder (the folder containing the package.json file, e.g., chatbot-ui), and install the required npm packages:

```bash
cd chatbot-ui
npm install
```

Set up environment variables:

Make sure you have a .env file in your backend folder (TKS-GPT folder and src folder) with the required environment variables (such as OPENAI_API_KEY). Change .env.template to .env
After completing these steps, you should be able to run both the backend and frontend servers and start using your chatbot application.

```bash
TKS-GPT/
├── .env
├── app.py
├── chatbot-ui/ (React app folder)
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── ...
├── venv/ (Python virtual environment folder)
└── ...

```