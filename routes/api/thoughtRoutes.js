const router = require('express').Router();
const {
  getCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../../controllers/thoughtController.js');

// api/thoughts
router.route('/').get(getCourses).post(createCourse);

// /api/courses/:courseId
router
  .route('/:thoughtId/reactions')
  .get(getSingleCourse)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;
