
const express = require('express');
// import { handleExtract } from '../controllers/extractFactorsController';

const parseController = require('../controllers/parseController');
const extractFactorsController = require('../controllers/extractFactorsController');
const classifyRiskController = require('../controllers/classifyRiskController');
const recommendationsController = require('../controllers/recommendationsController');

const router = express.Router();

// POST /parse - accepts JSON or image upload
router.post('/parse', (req, res, next) => {
  const contentType = req.headers['content-type'] || '';
  const isMultipart = contentType.includes('multipart/form-data');

  if (!isMultipart) {
    // Handle JSON directly, avoid invoking multer for non-multipart
    return parseController.handleParse(req, res, next);
  }

  const upload = req.upload;
  if (!upload) return next(new Error('Upload middleware not initialized'));
  const single = upload.single('image');
  single(req, res, (err) => {
    if (err) return next(err);
    parseController.handleParse(req, res, next);
  });
});

// POST /extract-factors
router.post('/extract-factors', extractFactorsController.handleExtract);

// POST /classify-risk
router.post('/classify-risk', classifyRiskController.handleClassify);

// POST /recommendations
router.post('/recommendations', recommendationsController.handleRecommendations);

module.exports = router;


