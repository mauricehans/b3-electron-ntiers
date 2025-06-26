const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const BUSINESS_URL = process.env.BUSINESS_URL || 'http://business:5000';

// Obtenir toutes les tâches
app.get('/api/tasks', async (req, res) => {
  try {
    const result = await axios.get(`${BUSINESS_URL}/tasks`);
    res.json(result.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Créer une nouvelle tâche
app.post('/api/tasks', async (req, res) => {
  try {
    const result = await axios.post(`${BUSINESS_URL}/tasks`, req.body);
    res.json(result.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mettre à jour une tâche
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const result = await axios.put(`${BUSINESS_URL}/tasks/${req.params.id}`, req.body);
    res.json(result.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Basculer le statut d'une tâche
app.patch('/api/tasks/:id/toggle', async (req, res) => {
  try {
    const result = await axios.patch(`${BUSINESS_URL}/tasks/${req.params.id}/toggle`);
    res.json(result.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Supprimer une tâche
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const result = await axios.delete(`${BUSINESS_URL}/tasks/${req.params.id}`);
    res.json(result.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Todo Router listening on port 3000');
});
