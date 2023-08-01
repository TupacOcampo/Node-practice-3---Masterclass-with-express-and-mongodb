const express = require("express");
const bootcampRouter = express.Router();

const { getAllBootcamps, 
        getBootcampById, 
        createNewBootcamp, 
        updateBootcampById, 
        deleteBootcampById } = require("../controllers/bootcampController");

const courseRouter = require('./courseRoutes');

//reRoute into other resource routers

bootcampRouter.use('/:bootcampId/courses', courseRouter);

bootcampRouter.route("/")
    .get(getAllBootcamps)
    .post(createNewBootcamp)

bootcampRouter.route("/:id")
    .get(getBootcampById)
    .put(updateBootcampById)
    .delete(deleteBootcampById)

module.exports = bootcampRouter;