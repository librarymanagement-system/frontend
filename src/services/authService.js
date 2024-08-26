import api from '../interceptor';

export const login = async (username, password) => {
  try {
    const response = await api.post('/api/authenticate', { username, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const signUp = async (name, email, username, password) => {
  try {
    const response = await api.post('/api/register', { name, email, username, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getUserDetails = async (userId) => {
  try {
    const response = await api.get(`/api/users/getUserDetails/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
