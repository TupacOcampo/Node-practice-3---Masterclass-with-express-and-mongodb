const User = require("../models/useModel");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async")

//@Desc      Create new user
//@Route     POST /api/v1/auth/register
//@Access    Public
const registerUser = asyncHandler (async (req, res, next) =>{
    const { name, email, password, role } = req.body;

    const newUser = await User.create({
        name,
        email,
        password,
        role
    });

    //Create token
    const token = newUser.getSignedJwtToken();

    res.status(200).json({success:true, user: token})
});


//@Desc      Login user
//@Route     Post /api/v1/auth/login
//@Access    Public
const loginUser = asyncHandler (async (req, res, next) =>{
    const { email, password } = req.body;

    //Validate email and password
    if (!email || !password){
        return next(new ErrorResponse("Please provide email and password", 400));
    }

    //Check for user
    const foundUser = await User.findOne({ email }).select("+password");
    if (!foundUser){
        return next(new ErrorResponse("Invalid credentials", 401));
    }

    //Validate password
    if(!await foundUser.matchPassword(password)){
        return next(new ErrorResponse("Wrong pasword", 401));
    }

    sendTokenResponse(foundUser, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE *24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if(process.env.NODE_ENV === "production"){
        options.secure = true;
    }

    res .status(statusCode)
        .cookie("token", token, options)
        .json({success:true, token})
};

//@Desc      Get current logged user
//@Route     Get /api/v1/auth/user
//@Access    Private
const getLoggedUser = asyncHandler (async (req, res, next) => {
    const currentUser = await User.findById(req.user.id);

    if (!currentUser){
        next(new ErrorResponse("This user does not exist!", 401));
    }

    res.status(200).json({
        success:true,
        data:currentUser
    })
});

//@Desc      Forgot password
//@Route     Get /api/v1/auth/forgotPassword
//@Access    Public
const forgotPassword = asyncHandler (async (req, res, next) => {
    const currentUser = await User.findOne({email: req.body.email});

    if (!currentUser){
        next(new ErrorResponse("This email does not exist!", 404));
    }

    //Get Reset token
    const resetToken = currentUser.getResetToken()
    
    await currentUser.save();

    res.status(200).json({
        success:true,
        user:currentUser
    })
});


module.exports = { registerUser, loginUser, getLoggedUser, forgotPassword }