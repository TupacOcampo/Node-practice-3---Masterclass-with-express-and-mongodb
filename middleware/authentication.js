const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/useModel");

exports.protect = asyncHandler (async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1];
    }
    //else if (req.cookies.token) {
    //    token=req.cookies.token;
    //}

    //Make sure token exists
    if(!token){
        return next(new ErrorResponse("Not authorized", 401));
    }

    //If it exists, verify token
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(new ErrorResponse("Not authorized", 401));
    }
})

exports.grantAccessToSpecificRole = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)){
        return next(new ErrorResponse("User role not authorized", 403));
    }
    next();
}
