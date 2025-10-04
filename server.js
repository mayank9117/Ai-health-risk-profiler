const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const routes = require('./routes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// File uploads (for OCR)
const upload = multer({ dest: path.join(__dirname, 'uploads') });
app.use((req, res, next) => {
  req.upload = upload; // expose for routes needing it
  next();
});

// Routes
app.use('/', routes);

// Health
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'AI-Powered Health Risk Profiler' });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ status: 'error', message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;


