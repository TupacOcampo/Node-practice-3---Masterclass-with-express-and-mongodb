const Course = require("../models/courseModel");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async")

//@Desc      Get all courses
//@Route     GET /api/v1/courses
//@Route     GET /api/v1/bootcamps/:bootcampId/courses
//@Access    Public
const getAllCourses = asyncHandler( async (req, res)=> {
    let query;

    if (req.params.bootcampId){
        query = Course.find({bootcamp:req.params.bootcampId})
    }
    else{
        query = Course.find().populate({
            path:'bootcamp',
            select:'name description'
        });
    }

    const courses = await query;

    res.status(200).json({success:true, count:courses.length, data:courses});
});

module.exports = { getAllCourses }