const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// ── Middleware ──────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// ── Rate Limiting (global) ─────────────────────────────
const { globalLimiter } = require('./middleware/rateLimit');
app.use('/api/', globalLimiter);

// ── Health Check ───────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// ── Routes ─────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/outreach', require('./routes/outreach'));
app.use('/api/scrape', require('./routes/scrape'));

// ── Error Handler ──────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ── Database Connection & Server Start ─────────────────
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB (prospect-ai-db)');
    app.listen(PORT, () => {
      console.log(`🚀 Prospect AI backend running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

module.exports = app;
