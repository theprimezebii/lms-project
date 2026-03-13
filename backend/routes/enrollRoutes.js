const express = require('express');
const router = express.Router();
const { enrollCourse, getMyCourses, updateProgress } = require('../controllers/enrollController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('student'), enrollCourse);
router.get('/my-courses', protect, authorize('student'), getMyCourses);
router.put('/:courseId/progress', protect, authorize('student'), updateProgress);

module.exports = router;
