const ai = require('../config/geminiAiConfig');
const suggestTagsPrompt = require('../config/prompts');
const aiRateLimiter = require('../middlewares/aiRateLimiter');
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  app.post(
    '/api/ai/suggest-tags',
    requireLogin,
    aiRateLimiter,
    async (req, res) => {
      const { title } = req.body;
      if (!title) {
        return res
          .status(400)
          .send({ error: 'Provide a title to generate tags' });
      }

      try {
        const prompt = suggestTagsPrompt(title);

        const response = await ai.models.generateContent({
          model: 'models/gemini-1.5-flash',
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
        });

        const tags = JSON.parse(response.text);

        res.status(200).send({ tags });
      } catch (error) {
        console.error('AI tag generation error:', error);
        res.status(500).json({
          error: 'Failed to generate tags',
          details:
            process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
      }
    }
  );
};
