const express = require("express");
const bootcampRouter = express.Router();
const { protect, grantAccessToSpecificRole } = require("../middleware/authentication");

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
    .post(protect, grantAccessToSpecificRole("publisher", "admin"), createNewBootcamp)

bootcampRouter.route("/:id")
    .get(getBootcampById)
    .put(protect, grantAccessToSpecificRole("publisher", "admin"), updateBootcampById)
    .delete(protect, grantAccessToSpecificRole("publisher", "admin"), deleteBootcampById)

module.exports = bootcampRouter;