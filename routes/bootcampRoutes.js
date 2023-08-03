const express = require("express");
const bootcampRouter = express.Router();

const { getAllBootcamps, 
        getBootcampById, 
        createNewBootcamp, 
        updateBootcampById, 
        deleteBootcampById } = require("../controllers/bootcampController");

const Bootcamp = require('../models/bootcampModel');
const advancedResoults = require("../middleware/advancedResoults");

const courseRouter = require('./courseRoutes');

//reRoute into other resource routers

bootcampRouter.use('/:bootcampId/courses', courseRouter);

bootcampRouter.route("/")
    .get(advancedResoults(Bootcamp, 'courses'), getAllBootcamps)
    .post(createNewBootcamp)

bootcampRouter.route("/:id")
    .get(getBootcampById)
    .put(updateBootcampById)
    .delete(deleteBootcampById)

module.exports = bootcampRouter;