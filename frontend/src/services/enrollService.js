import API from './api';

export const enrollService = {
  enroll: async (courseId) => {
    const { data } = await API.post('/enroll', { courseId });
    return data;
  },

  getMyCourses: async () => {
    const { data } = await API.get('/enroll/my-courses');
    return data;
  },

  updateProgress: async (courseId, progressData) => {
    const { data } = await API.put(`/enroll/${courseId}/progress`, progressData);
    return data;
  },
};
