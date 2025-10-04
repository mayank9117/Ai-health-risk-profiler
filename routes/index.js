
const express = require('express');
const healthAnalysisController = require('../controllers/healthAnalysisController');

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'AI-Powered Health Risk Profiler',
    endpoint: '/health-analysis',
    method: 'POST',
    description: 'Upload an image with health data to get complete analysis'
  });
});

// POST /health-analysis - Single endpoint that does everything (image only)
router.post('/health-analysis', (req, res, next) => {
  const upload = req.upload;
  if (!upload) return next(new Error('Upload middleware not initialized'));
  const single = upload.single('image');
  single(req, res, (err) => {
    if (err) return next(err);
    healthAnalysisController.handleHealthAnalysis(req, res, next);
  });
});

module.exports = router;


