const express = require("express");
const coursesRouter = express.Router({mergeParams: true});

const { getAllCourses, getCourseById, addCourse, updateCourse,deleteCourse } = require("../controllers/coursesController");

const Course = require('../models/courseModel');
const advancedResults = require('../middleware/advancedResoults');

coursesRouter.route('/')
    .get(advancedResults(Course, 'bootcamp'), getAllCourses)
    .post(addCourse);

coursesRouter.route('/:id')
    .get(getCourseById)
    .put(updateCourse)
    .delete(deleteCourse)

module.exports = coursesRouter;