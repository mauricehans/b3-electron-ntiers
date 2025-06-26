const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
  host: process.env.PGHOST || 'db',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'mysecretpassword',
  database: process.env.PGDATABASE || 'tododb',
  port: 5432,
});

// Crée la table à l'initialisation
(async () => {
  const client = await pool.connect();
  await client.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT FALSE,
      priority VARCHAR(10) DEFAULT 'medium',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);
  client.release();
})();

// Obtenir toutes les tâches
app.get('/tasks', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM tasks ORDER BY created_at DESC');
    client.release();
    res.json({ tasks: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Créer une nouvelle tâche
app.post('/tasks', async (req, res) => {
  try {
    const { title, description, priority = 'medium' } = req.body;
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO tasks(title, description, priority) VALUES($1, $2, $3) RETURNING *',
      [title, description, priority]
    );
    client.release();
    res.json({ task: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mettre à jour une tâche
app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed, priority } = req.body;
    const client = await pool.connect();
    const result = await client.query(
      'UPDATE tasks SET title=$1, description=$2, completed=$3, priority=$4, updated_at=NOW() WHERE id=$5 RETURNING *',
      [title, description, completed, priority, id]
    );
    client.release();
    res.json({ task: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Marquer une tâche comme complétée/non complétée
app.patch('/tasks/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params;
    const client = await pool.connect();
    const result = await client.query(
      'UPDATE tasks SET completed = NOT completed, updated_at=NOW() WHERE id=$1 RETURNING *',
      [id]
    );
    client.release();
    res.json({ task: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Supprimer une tâche
app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const client = await pool.connect();
    await client.query('DELETE FROM tasks WHERE id=$1', [id]);
    client.release();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log('Todo Business Logic running on port 5000');
});
