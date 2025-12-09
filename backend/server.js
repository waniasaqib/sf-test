const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data store
let claims = [];
let rules = [];

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Claims endpoints
app.get('/api/claims', (req, res) => {
  res.json(claims);
});

app.post('/api/claims', (req, res) => {
  const claim = {
    id: uuidv4(),
    ...req.body,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  claims.push(claim);
  res.status(201).json(claim);
});

app.get('/api/claims/:id', (req, res) => {
  const claim = claims.find(c => c.id === req.params.id);
  if (!claim) return res.status(404).json({ error: 'Claim not found' });
  res.json(claim);
});

// Rules endpoints
app.get('/api/rules', (req, res) => {
  res.json(rules);
});

app.post('/api/rules', (req, res) => {
  const rule = {
    id: uuidv4(),
    ...req.body,
    active: true,
    createdAt: new Date().toISOString()
  };
  rules.push(rule);
  res.status(201).json(rule);
});

// Analytics endpoint
app.get('/api/analytics', (req, res) => {
  res.json({
    totalClaims: claims.length,
    pendingClaims: claims.filter(c => c.status === 'pending').length,
    approvedClaims: claims.filter(c => c.status === 'approved').length,
    deniedClaims: claims.filter(c => c.status === 'denied').length,
    activeRules: rules.filter(r => r.active).length
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
