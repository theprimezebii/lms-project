import API from './api';

export const courseService = {
  getAllCourses: async (filters = {}) => {
    const { data } = await API.get('/courses', { params: filters });
    return data;
  },

  getCourseById: async (id) => {
    const { data } = await API.get(`/courses/${id}`);
    return data;
  },

  createCourse: async (courseData) => {
    const { data } = await API.post('/courses', courseData);
    return data;
  },

  updateCourse: async (id, courseData) => {
    const { data } = await API.put(`/courses/${id}`, courseData);
    return data;
  },

  deleteCourse: async (id) => {
    const { data } = await API.delete(`/courses/${id}`);
    return data;
  },

  addLesson: async (courseId, lessonData) => {
    const { data } = await API.post(`/courses/${courseId}/lessons`, lessonData);
    return data;
  },

  getInstructorCourses: async () => {
    const { data } = await API.get('/courses/my-courses');
    return data;
  },

  getAdminAllCourses: async () => {
    const { data } = await API.get('/courses/admin/all');
    return data;
  },
};
