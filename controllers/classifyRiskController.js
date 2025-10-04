const scoring = require('../utils/scoring');

exports.handleClassify = async (req, res, next) => {
  try {
    const { factors } = req.body || {};
    if (!Array.isArray(factors)) {
      return res.status(400).json({ status: 'error', message: 'factors array required' });
    }
    const { riskLevel, score, rationale } = scoring.classifyRisk(factors);
    return res.json({ risk_level: riskLevel, score, rationale });
  } catch (err) {
    next(err);
  }
};


