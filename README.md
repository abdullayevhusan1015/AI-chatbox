# AI-chatbox
FenixAI – Minimal AI Web Chat

FenixAI is a simple web chat app that allows users to send messages and receive responses from an AI model.
The frontend communicates with a backend server, which handles the LLM API requests securely.

Live Demo: https://xfenixai.netlify.app/

Features
Send messages and receive AI responses
Backend handles API requests securely
Basic error handling for missing messages or API issues
Tech Stack
Frontend: HTML, CSS, JavaScript (Fetch API)
Backend: Node.js, Express.js
AI API: Groq LLM API
Run Locally
Clone: git clone https://github.com/yourusername/fenixai.git
Install: npm install
Add .env with GROQ_API_KEY=your_key_here
Start server: node server.js
Open index.html in browser
API Endpoint

POST /chat – send JSON { "message": "Hello" } → receive { "reply": "AI response" }
