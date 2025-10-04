// services/aiService.js
// import OpenAI from "openai";
// import OpenAI from 'openai';
const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // set in .env
});

exports.cleanFactors = async function(ocrText) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
            role: "system",
            content: `You are a health data normalizer. 
            Your task is to extract key health factors from the input text. The factors are:
              - Age
              - Smoker (yes or no)
              - Exercise (one of: low, moderate, high)
              - Diet
          
            Instructions:
            - Correct any obvious typos in the input, especially for exercise and smoking.
              For example, if exercise is written incorrectly (like "Iow"), infer the intended category.
            - Do not invent any values; if a factor is missing, return null.
            - Always return a valid JSON object containing only the above factors.
            - Do not include any additional explanation or text.`
          }
          ,
        { role: "user", content: ocrText },
      ],
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (err) {
    console.error("AI Error:", err);
    return null; // fallback
  }
}
