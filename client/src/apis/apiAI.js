import axios from 'axios';

export const suggestTags = async (title) => {
  try {
    const response = await axios.post('/api/ai/suggest-tags', { title }, { withCredentials: true });
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
