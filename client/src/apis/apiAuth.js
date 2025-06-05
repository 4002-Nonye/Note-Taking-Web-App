import axios from "axios";

// new user register
export const register = async ({ email, password }) => {
  try {
    const response = await axios.post(
      "/api/register",
      { email, password },
      { withCredentials: true },
    );
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

// existing user login
export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(
      "/api/login",
      { email, password },
      { withCredentials: true },
    );
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
