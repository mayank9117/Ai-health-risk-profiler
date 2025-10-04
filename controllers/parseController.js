const ocrService = require('../services/ocrService');

function isEmptyObject(obj) {
  return !obj || Object.keys(obj).length === 0;
}

exports.handleParse = async (req, res, next) => {
  try {
    let answers = null;
    let confidence = 1.0;

    if (req.is('application/json')) {
      answers = req.body || {};
    } else if (req.file) {
      const ocrResult = await ocrService.extractTextFromImage(req.file.path);
      answers = ocrService.parseAnswersFromText(ocrResult.text);
      confidence = ocrResult.confidence;
    } else {
      return res.status(400).json({ status: 'incomplete_profile', reason: 'Provide JSON body or image file under field "image".' });
    }

    const requiredFields = ['age', 'smoker', 'exercise', 'diet'];
    const missingFields = requiredFields.filter((key) => answers[key] === undefined || answers[key] === null || answers[key] === '');

    if (isEmptyObject(answers) || missingFields.length > 0) {
      return res.status(200).json({ status: 'incomplete_profile', reason: 'Missing required fields', missing_fields: missingFields });
    }

    return res.json({ answers, missing_fields: [], confidence });
  } catch (err) {
    next(err);
  }
};


