// super basic - will need an update in future

import express = require('express');
import cors = require('cors');

const app = express();
app.use(cors());

app.get('/', async (req, res) => {
  const url = (req.query.url as string) || '';
  if (!url) return res.status(400).send('Missing URL');

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err: any) {
    res.status(500).send(err.toString());
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));