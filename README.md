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
THERE ARE TWO PARTS TO YOUR PROJECT A BACKEND AND A FRONTEND
## BACKEND
</br>

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
Exit out and back to the TKS-GPT folder ( ctl + c )

</br>

## FRONTEND

Install Node.js and npm:

Make sure Node.js and npm are installed on your system. You can check if they are installed by running:

```bash
node -v
npm -v
```

If not installed, you can download them from the official Node.js website https://nodejs.org/en/download/

</br>

### On Linux / Debian systems 
</br>

See here https://github.com/nodesource/distributions
Install frontend dependencies:

## Ubuntu 22.04

```bash
sudo apt update
sudo apt install -y curl
```
```bash
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```
```bash
sudo apt-get install -y build-essential
```

## Debian

```bash
curl -fsSL https://deb.nodesource.com/setup_current.x | bash - &&\
apt-get install -y nodejs
```
run as root on debian
```bash
apt-get install -y build-essential
```
</br>

Navigate to the frontend folder (the folder containing the package.json file, e.g., chatbot-ui), and install the required npm packages:

```bash
cd chatbot-ui
npm install
```

Set up environment variables:  

Make sure you have a .env file in your backend folder (TKS-GPT folder and chatbot-ui folder) with the required environment variables (such as OPENAI_API_KEY). 

### Change .env.template to .env
</br>

After completing these steps, you should be able to run both the backend and frontend servers and start using your chatbot application in development.

### TREE VIEW of your project
```bash
TKS-GPT
├── chatbot-ui
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   └── reportWebVitals.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
├── venv     (Python virtual environment folder)
│   ├── bin
│   ├── include
│   ├── lib
│   └── lib64
├── app.py
├── .env
└── requirements.txt

```

## Run your project
</br>

### Python / Flask Backend
</br>

In the TKS-GPT project folder

```bash
source venv/bin/activate
```
```bash
python3 app.py
```
Your now running backend on http://localhost:3000 - you do not need to open this on browser

keep terminal open and start a new terminal window

</br>

### Node and React Frontend
</br>

```bash
cd TKS-GPT/chatbot-ui
```
```bash
npm start
```
Now open http://localhost:5000 

Enter a message and hit send it!




