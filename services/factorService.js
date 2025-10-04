exports.extractFactors = (answers) => {
  const factors = [];
  let signals = 0;

  if (typeof answers.smoker !== 'undefined') {
    if (answers.smoker === true || String(answers.smoker).toLowerCase().startsWith('y')) factors.push('smoking');
    signals += 1;
  }
  if (typeof answers.diet !== 'undefined') {
    const diet = String(answers.diet).toLowerCase();
    if (diet.includes('high sugar') || diet.includes('poor') || diet.includes('bad')) factors.push('poor diet');
    signals += 1;
  }
  if (typeof answers.exercise !== 'undefined') {
    const exercise = String(answers.exercise).toLowerCase();
    if (exercise.includes('rarely') || exercise.includes('low') || exercise.includes('none')) factors.push('low exercise');
    signals += 1;
  }
  if (typeof answers.age !== 'undefined') {
    const age = parseInt(answers.age);
    if (!isNaN(age) && age >= 65) factors.push('age');
    signals += 1;
  }

  const confidence = signals > 0 ? Math.min(1, 0.6 + factors.length * 0.1) : 0.5;
  return { factors, confidence };
};


