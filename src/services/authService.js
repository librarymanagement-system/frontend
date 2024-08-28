import api from '../interceptor';

export const login = async (username, password) => {
  try {
    const response = await api.post('/api/authenticate', { username, password });
    return response.data;
  } catch (error) {
    throw error;

  }
};

export const signUp = async (name, email, username, password) => {
  try {
    const response = await api.post('/api/register', { name, email, username, password });
    return response.data;
  } catch (error) {
    throw error;

  }
};

export const getUserDetails = async (userId) => {
  try {
    const response = await api.get(`/api/users/getUserDetails/${userId}`);
    return response.data;
  } catch (error) {
    throw error;

  }
};

export const updateUserDetails = async (userId, userDetails) => {
  try {
    const response = await api.put(`/api/users/updateUser/${userId}`, userDetails);
    return response.data;
  } catch (error) {
    throw error;
  }
};