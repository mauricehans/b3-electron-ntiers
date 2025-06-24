const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const BUSINESS_URL = process.env.BUSINESS_URL || 'http://business:5000';

// Proxy pour addition
app.post('/add', async (req, res) => {
  const { a, b } = req.body;
  const result = await axios.post(`${BUSINESS_URL}/add`, { a, b });
  res.json(result.data);
});

// Proxy pour soustraction
app.post('/subtract', async (req, res) => {
  const { a, b } = req.body;
  const result = await axios.post(`${BUSINESS_URL}/subtract`, { a, b });
  res.json(result.data);
});

// Proxy pour multiplication
app.post('/multiply', async (req, res) => {
  const { a, b } = req.body;
  const result = await axios.post(`${BUSINESS_URL}/multiply`, { a, b });
  res.json(result.data);
});

// Proxy pour division
app.post('/divide', async (req, res) => {
  const { a, b } = req.body;
  const result = await axios.post(`${BUSINESS_URL}/divide`, { a, b });
  res.json(result.data);
});

app.listen(3000, () => {
  console.log('Router listening on port 3000');
});
