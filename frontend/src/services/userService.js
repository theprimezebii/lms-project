import API from './api';

export const userService = {
  getAllUsers: async () => {
    const { data } = await API.get('/users');
    return data;
  },

  deleteUser: async (id) => {
    const { data } = await API.delete(`/users/${id}`);
    return data;
  },

  getAnalytics: async () => {
    const { data } = await API.get('/users/analytics');
    return data;
  },
};
