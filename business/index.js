const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
  host: process.env.PGHOST || 'db',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'mysecretpassword',
  database: process.env.PGDATABASE || 'calcdb',
  port: 5432,
});

// Crée la table à l'initialisation
(async () => {
  const client = await pool.connect();
  await client.query(`
    CREATE TABLE IF NOT EXISTS operations (
      id SERIAL PRIMARY KEY,
      type VARCHAR(20),
      a NUMERIC,
      b NUMERIC,
      result NUMERIC,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
  client.release();
})();

// Logique métier + enregistrement en DB
const calculate = async (type, a, b) => {
  let result;
  switch (type) {
    case 'add': result = a + b; break;
    case 'subtract': result = a - b; break;
    case 'multiply': result = a * b; break;
    case 'divide': result = a / b; break;
    default: throw new Error('Invalid operation');
  }

  const client = await pool.connect();
  await client.query(
    'INSERT INTO operations(type, a, b, result) VALUES($1, $2, $3, $4)',
    [type, a, b, result]
  );
  client.release();

  return result;
};

app.post('/add', async (req, res) => {
  const { a, b } = req.body;
  res.json({ result: await calculate('add', a, b) });
});

app.post('/subtract', async (req, res) => {
  const { a, b } = req.body;
  res.json({ result: await calculate('subtract', a, b) });
});

app.post('/multiply', async (req, res) => {
  const { a, b } = req.body;
  res.json({ result: await calculate('multiply', a, b) });
});

app.post('/divide', async (req, res) => {
  const { a, b } = req.body;
  res.json({ result: await calculate('divide', a, b) });
});

app.listen(5000, () => {
  console.log('Business Logic running on port 5000');
});
