const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  addLesson,
  getInstructorCourses,
  getAdminAllCourses,
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getAllCourses);
router.get('/my-courses', protect, authorize('instructor'), getInstructorCourses);
router.get('/admin/all', protect, authorize('admin'), getAdminAllCourses);
router.get('/:id', getCourseById);
router.post('/', protect, authorize('instructor', 'admin'), createCourse);
router.put('/:id', protect, authorize('instructor', 'admin'), updateCourse);
router.delete('/:id', protect, authorize('instructor', 'admin'), deleteCourse);
router.post('/:id/lessons', protect, authorize('instructor', 'admin'), addLesson);

module.exports = router;
