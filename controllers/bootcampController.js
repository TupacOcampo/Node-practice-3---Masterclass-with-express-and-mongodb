const Bootcamp = require("../models/bootcampModel");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async")

//@Desc      Get all bootcamps
//@Route     GET /api/v1/bootcamps
//@Access    Public
const getAllBootcamps = asyncHandler (async (req, res, next) =>{
    const bootcamps = await Bootcamp.find();
    res.status(200).json({success:true, count: bootcamps.length ,data:bootcamps});
});

//@Desc      Get bootcamp
//@Route     GET /api/v1/bootcamps/:id
//@Access    Public
const getBootcampById = asyncHandler (async (req, res, next) => {
    const foundBootcamp = await Bootcamp.findById(req.params.id);
    if (!foundBootcamp){
        return next(new ErrorResponse(`Bootcamp not fount with id of ${req.params.id}`, 404));
    }    
    res.status(200).json({success:true, data: foundBootcamp})
});

//@Desc      Create bootcamp
//@Route     POST /api/v1/bootcamps/
//@Access    Private
const createNewBootcamp = asyncHandler (async (req, res, next) => {
    const createdBootcamp = await Bootcamp.create(req.body);
    res.status(201).json({success:true, msg:createdBootcamp});
})

//@Desc      Update bootcamp
//@Route     PUT /api/v1/bootcamps/:id
//@Access    Private
const updateBootcampById =asyncHandler (async (req, res, next) => {
    const updatedBootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body)
    if (!updatedBootcamp){
        return next(new ErrorResponse(`Bootcamp not fount with id of ${req.params.id}`, 404));
    }
    res.status(200).json({success:true, data: updatedBootcamp})  
})

//@Desc      Delete bootcamp
//@Route     DELETE /api/v1/bootcamps/:id
//@Access    Private
const deleteBootcampById = asyncHandler (async (req, res, next) => {
    const deletedBootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!deletedBootcamp){
        return next(new ErrorResponse(`Bootcamp not fount with id of ${req.params.id}`, 404));
    }
    res.status(200).json({success:true, data: deletedBootcamp})    
});

module.exports = { 
    getAllBootcamps, 
    getBootcampById,
    createNewBootcamp,
    updateBootcampById,
    deleteBootcampById }
