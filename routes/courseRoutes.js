const express = require("express");
const coursesRouter = express.Router({mergeParams: true});
const { protect, grantAccessToSpecificRole }= require("../middleware/authentication");

const { getAllCourses, getCourseById, addCourse, updateCourse,deleteCourse } = require("../controllers/coursesController");

const Course = require('../models/courseModel');
const advancedResults = require('../middleware/advancedResoults');

coursesRouter.route('/')
    .get(advancedResults(Course, 'bootcamp'), getAllCourses)
    .post(protect, addCourse);

coursesRouter.route('/:id')
    .get(getCourseById)
    .put(protect, grantAccessToSpecificRole("publisher", "admin"), updateCourse)
    .delete(protect, grantAccessToSpecificRole("publisher", "admin"), deleteCourse)

module.exports = coursesRouter;