const Course = require("../models/courseModel");
const Bootcamp = require("../models/bootcampModel");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async")

//@Desc      Get all courses
//@Route     GET /api/v1/courses
//@Route     GET /api/v1/bootcamps/:bootcampId/courses
//@Access    Public
const getAllCourses = asyncHandler( async (req, res)=> {
    if (req.params.bootcampId){
        const courses = await Course.find({bootcamp:req.params.bootcampId});
        return res.status(200).json({success:true, count:courses.length, data:courses})
    }
    else{
        res.status(200).json(res.advancedResults);
    }
});

//@Desc      Get all courses
//@Route     GET /api/v1/courses/:id
//@Access    Public
const getCourseById = asyncHandler (async(req, res) => {
    const course = await Course.findById(req.params.id).populate('bootcamp')

    if (!course){
        return next(new ErrorResponse(`No course with the id of ${req.params.id}`, 404))
    }

    res.status(200).json({success:true, course:course});
})

//@Desc      Create new courses
//@Route     POST /api/v1/bootcamps/:bootcampId/courses
//@Access    Private
const addCourse = asyncHandler(async(req, res) => {
    req.body.bootcamp = req.params.bootcampId;

    const bootcamp = await Bootcamp.findById(req.params.bootcampId);
    if (!bootcamp){
        return next(new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId}`))
    }

    const course = await Course.create(req.body);
    res.status(200).json({success:true, course:course});
})

//@Desc      Update courses
//@Route     PUT /api/v1/courses/:id
//@Access    Private
const updateCourse = asyncHandler(async(req, res) => {
    const foundCourse = await Course.findById(req.params.id);
    if (!foundCourse){
        return next(new ErrorResponse(`No course with the id of ${req.params.bootcampId}`))
    }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true});
    res.status(200).json({success:true, 'Updated course':updatedCourse});
})

//@Desc      Delete courses
//@Route     DELETE /api/v1/courses/:id
//@Access    Private
const deleteCourse = asyncHandler(async(req, res) => {
    const foundCourse = await Course.findById(req.params.id);
    if (!foundCourse){
        return next(new ErrorResponse(`No course with the id of ${req.params.bootcampId}`, 404))
    }

    foundCourse.deleteOne();
    res.status(200).json({success:true});
})


module.exports = { getAllCourses, getCourseById, addCourse, updateCourse, deleteCourse }