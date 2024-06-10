import express from 'express';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 9000;
app.get('/health-check', (req, res) => {
  res.send('Chat server is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});