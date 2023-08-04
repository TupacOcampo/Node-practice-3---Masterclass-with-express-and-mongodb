const express = require("express");
const { registerUser, loginUser, getLoggedUser } = require("../controllers/authenticationController")
const { protect, grantAccessToSpecificRole } = require("../middleware/authentication");

const authRouter = express.Router();

authRouter.route("/")
    .get(protect, grantAccessToSpecificRole("publisher", "admin"), getLoggedUser)

authRouter.route("/register")
    .post(registerUser)

authRouter.route("/login")
    .post(loginUser)

module.exports = authRouter;