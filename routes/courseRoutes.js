const express = require("express");
const coursesRouter = express.Router({mergeParams: true});

const { getAllCourses } = require("../controllers/coursesController");

coursesRouter.route('/')
    .get(getAllCourses);

module.exports = coursesRouter;