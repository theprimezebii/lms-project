import API from './api';

export const authService = {
  register: async (name, email, password, role) => {
    const { data } = await API.post('/auth/register', { name, email, password, role });
    return data;
  },

  login: async (email, password) => {
    const { data } = await API.post('/auth/login', { email, password });
    return data;
  },

  getProfile: async () => {
    const { data } = await API.get('/auth/profile');
    return data;
  },

  updateProfile: async (profileData) => {
    const { data } = await API.put('/auth/profile', profileData);
    return data;
  },
};
