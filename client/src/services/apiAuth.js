import axios from "axios";

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post("/api/login", { email, password });
    return response.data;
  } catch (err) {
    if (err.response) throw err.response.data;
  }
};
