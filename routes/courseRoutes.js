const express = require("express");
const coursesRouter = express.Router({mergeParams: true});
const { protect, grantAccessToSpecificRole }= require("../middleware/authentication");

const { getAllCourses, getCourseById, addCourse, updateCourse,deleteCourse } = require("../controllers/coursesController");

const Course = require('../models/courseModel');
const advancedResults = require('../middleware/advancedResoults');

coursesRouter.route('/')
    .get(advancedResults(Course, 'bootcamp'), getAllCourses)
<<<<<<< HEAD
    .post(protect, addCourse);
=======
    .post(addCourse);
>>>>>>> ac33b9d3ed2173d3d3901755e906dcb15b3dbd3c

coursesRouter.route('/:id')
    .get(getCourseById)
    .put(protect, grantAccessToSpecificRole("publisher", "admin"), updateCourse)
    .delete(protect, grantAccessToSpecificRole("publisher", "admin"), deleteCourse)

module.exports = coursesRouter;