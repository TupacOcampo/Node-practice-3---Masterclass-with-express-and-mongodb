const express = require("express");
const coursesRouter = express.Router({mergeParams: true});

const { getAllCourses, getCourseById, addCourse, updateCourse,deleteCourse } = require("../controllers/coursesController");

coursesRouter.route('/')
    .get(getAllCourses)
    .post(addCourse);

coursesRouter.route('/:id')
    .get(getCourseById)
    .put(updateCourse)
    .delete(deleteCourse)

module.exports = coursesRouter;