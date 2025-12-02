const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'data.json');

// Middleware
app.use(cors());
app.use(express.json());

// Helper functions to read/write data
const readData = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { items: [] };
  }
};

const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// GET all items
app.get('/api/items', (req, res) => {
  const data = readData();
  res.json(data.items);
});

// POST new item
app.post('/api/items', (req, res) => {
  const { name } = req.body;
  
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Item name is required' });
  }

  const data = readData();
  const newItem = {
    id: uuidv4(),
    name: name.trim(),
    purchased: false,
    createdAt: new Date().toISOString()
  };
  
  data.items.push(newItem);
  writeData(data);
  
  res.status(201).json(newItem);
});

// PUT update item (toggle purchased)
app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const { purchased } = req.body;
  
  const data = readData();
  const itemIndex = data.items.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  data.items[itemIndex].purchased = purchased;
  writeData(data);
  
  res.json(data.items[itemIndex]);
});

// DELETE item
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  
  const data = readData();
  const itemIndex = data.items.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  data.items.splice(itemIndex, 1);
  writeData(data);
  
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Shopping List API running on http://localhost:${PORT}`);
});

