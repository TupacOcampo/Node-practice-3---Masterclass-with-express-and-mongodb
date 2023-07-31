const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    //Log to console for developer
    console.log(err.stack.red);

    let error = { ...err }
    error.message = err.message;

    //Error bad ObjectId
    if (err.name === 'CastError'){
        const message = `Resource not fount with id of ${req.params.id}`
        error = new ErrorResponse(message, 404);
    }

    //Mongoose duplicated key
    if (err.name === 11000){
        const message = `Duplicated field value entered`;
        error = new ErrorResponse(message, 400);
    }
    
    //Mongoose Validation error
    if (err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({success:false, error:error.message || 'Server error'});
}   

module.exports = errorHandler;