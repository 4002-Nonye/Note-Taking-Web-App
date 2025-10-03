function suggestTagsPrompt(title) {
  return `Generate exactly 3 relevant tags for: "${title}"

STRICT RULES:
1. Return ONLY a raw JavaScript array format like ["tag1","tag2","tag3"]
2. Each tag must be:
   - Single lowercase word
   - No spaces, hyphens, or special characters
   - Highly relevant to the title
3. No additional text, explanations, or formatting
4. Make tags diverse and specific to the title's subject

Examples:
"Best chocolate chip cookies" → ["cookies","baking","dessert"]
"React Router tutorials" → ["react","routing","frontend"]
"Python machine learning" → ["python","ai","datascience"]
`.trim();
}

module.exports = suggestTagsPrompt;
