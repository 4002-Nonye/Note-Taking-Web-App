const { GoogleGenAI } = require('@google/genai');
const keys = require('./keys');

const ai = new GoogleGenAI({ apiKey: keys.GEMINI_AI_KEY });

module.exports = ai;
