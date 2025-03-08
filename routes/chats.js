const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.post('/', async (req, res) => {
  console.log('Received body:', req.body);
  const userMessage = req.body.message;
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-1106",
        messages: [{ role: "user", content: userMessage }]
      })
    });
    const data = await response.json();
    const reply = data.choices && data.choices[0] ? data.choices[0].message.content : "I'm not sure how to respond.";
    res.json({ reply });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ reply: "I'm sorry, I'm having trouble connecting." });
  }
});

module.exports = router;