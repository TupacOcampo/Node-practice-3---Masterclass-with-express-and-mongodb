const express = require("express");
const bootcampRouter = express.Router();

const { getAllBootcamps, 
        getBootcampById, 
        createNewBootcamp, 
        updateBootcampById, 
        deleteBootcampById } = require("../controllers/bootcampController");

bootcampRouter.route("/")
    .get(getAllBootcamps)
    .post(createNewBootcamp)

bootcampRouter.route("/:id")
    .get(getBootcampById)
    .put(updateBootcampById)
    .delete(deleteBootcampById)

module.exports = bootcampRouter;