const Tesseract = require('tesseract.js');
const fs = require('fs');

exports.extractTextFromImage = async (imagePath) => {
  const { data } = await Tesseract.recognize(imagePath, 'eng');
  console.log('data',data);
  const text = data.text || '';
  const confidence = Array.isArray(data.words) && data.words.length > 0
    ? data.words.reduce((acc, w) => acc + (w.confidence || 0), 0) / data.words.length / 100
    : (data.confidence ? data.confidence / 100 : 0.7);
  // cleanup temp file
  try { fs.unlinkSync(imagePath); } catch (_e) {}
  return { text, confidence };
};

exports.parseAnswersFromText = (text) => {
  const lower = (text || '').toLowerCase();
  const answers = {};
  
  // Extract age
  const ageMatch = lower.match(/(?:age|aged?)\s*:?\s*(\d+)/);
  if (ageMatch) {
    answers.age = parseInt(ageMatch[1]);
  }
  
  // Extract smoker
  if (lower.includes('smoker') || lower.includes('smok')) {
    answers.smoker = /no\s*smok|non[- ]smoker/.test(lower) ? false : true;
  }
  
  // Extract exercise
  if (lower.includes('exercise') || lower.includes('activity')) {
    answers.exercise = /rarely|low|sedentar|none/.test(lower) ? 'rarely' : 'regular';
  }
  
  // Extract diet
  if (lower.includes('diet')) {
    answers.diet = /high sugar|poor|bad|junk/.test(lower) ? 'high sugar' : 'balanced';
  }
  
  console.log('answers',answers);
  return answers;
};


