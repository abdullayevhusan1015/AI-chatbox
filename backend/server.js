const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

function debugLog(...args) {
  const text = args.map(arg => (typeof arg === 'string' ? arg : JSON.stringify(arg))).join(' ');
  fs.appendFileSync('server-debug.log', `${new Date().toISOString()} ${text}\n`);
  console.log(...args);
}

const app = express();
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: 'API key is missing' });
  }

  debugLog('Incoming chat:', userMessage);

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: userMessage }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    debugLog('Groq response:', response.data);
    const aiReply = response.data?.choices?.[0]?.message?.content;
    if (!aiReply) {
      throw new Error('Invalid Groq response structure');
    }

    res.json({ reply: aiReply });
  } catch (error) {
    debugLog('Chat error:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message || 'Something went wrong' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
