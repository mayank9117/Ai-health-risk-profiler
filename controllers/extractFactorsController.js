// const factorService = require('../services/factorService');

// exports.handleExtract = async (req, res, next) => {
//   try {
//     const answers = req.body;
//     if (!answers || typeof answers !== 'object') {
//       return res.status(400).json({ status: 'error', message: 'answers JSON required' });
//     }
//     const { factors, confidence } = factorService.extractFactors(answers);
//     return res.json({ factors, confidence });
//   } catch (err) {
//     next(err);
//   }
// };


const { cleanFactors } = require('../services/aiService');

exports.handleExtract = async (req, res, next) => {
  try {
    const input = req.body;

    if (!input || (typeof input !== 'string' && typeof input !== 'object')) {
      return res.status(400).json({ status: 'error', message: 'OCR text or answers JSON required' });
    }

    // Send to AI (OCR text or JSON.stringify if object)
    const rawText = typeof input === 'string' ? input : JSON.stringify(input);
    const factors = await cleanFactors(rawText);

    if (!factors) {
      return res.status(500).json({ status: 'error', message: 'AI extraction failed' });
    }

    return res.json({ status: 'ok', factors });
  } catch (err) {
    next(err);
  }
};
