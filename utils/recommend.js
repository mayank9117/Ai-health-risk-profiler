const RECOMMENDATIONS = {
  'smoking': 'Quit smoking',
  'poor diet': 'Reduce sugar',
  'low exercise': 'Walk 30 mins daily',
  'age': 'Regular health checkups and monitoring',
};

exports.getRecommendations = (factors) => {
  return factors.map((f) => RECOMMENDATIONS[f] || 'Maintain healthy lifestyle');
};

exports._internal = { RECOMMENDATIONS };


