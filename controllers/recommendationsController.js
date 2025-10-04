const recommend = require('../utils/recommend');

exports.handleRecommendations = async (req, res, next) => {
  try {
    const { risk_level: riskLevel, factors } = req.body || {};
    if (!riskLevel || !Array.isArray(factors)) {
      return res.status(400).json({ status: 'error', message: 'risk_level and factors required' });
    }
    const recommendations = recommend.getRecommendations(factors);
    return res.json({ risk_level: riskLevel, factors, recommendations, status: 'ok' });
  } catch (err) {
    next(err);
  }
};


