import axios from 'axios';

// new user register
export const register = async ({ email, password }) => {
  try {
    const response = await axios.post(
      '/api/register',
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
    const response = await axios.post('/api/login', { email, password }, { withCredentials: true });
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get('/api/current-user', {
      withCredentials: true,
    });

    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const changePassword = async ({ currentPassword, newPassword }) => {
  try {
    const response = await axios.put(
      '/api/account/passwordchange',
      { currentPassword, newPassword },
      { withCredentials: true },
    );
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const logout = async () => {
  try {
    const response = await axios.get('/api/logout');
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
