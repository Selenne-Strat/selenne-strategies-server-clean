const express = require('express');
//require('dotenv').config();
//console.log('Loaded OPENAI_API_KEY:', process.env.OPENAI_API_KEY); // Debug
const chatRoute = require('./routes/chats.js');
//generic
const app = express();
app.use(express.json({
  verify: (req, res, buf) => {
    console.log('Raw buffer:', buf.toString());
    try {
      JSON.parse(buf.toString());
    } catch (e) {
      console.log('JSON parse error:', e.message);
      throw new Error('Invalid JSON');
    }
  }
}));
app.use('/api/chat', chatRoute);

app.use((err, req, res, next) => {
  if (err.message === 'Invalid JSON') {
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }
  next(err);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
