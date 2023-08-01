const Bootcamp = require("../models/bootcampModel");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async")

//@Desc      Get all bootcamps
//@Route     GET /api/v1/bootcamps
//@Access    Public
const getAllBootcamps = asyncHandler (async (req, res, next) =>{
    
    let query;

    //Copy req.query
    const reqQuery = {...req.query};

    //Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    //Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    //Crefate query string
    let queryStr = JSON.stringify(reqQuery);

    //Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    //Finding resource
    query = Bootcamp.find(JSON.parse(queryStr));

    //Select fields 
    if (req.query.select){
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    //Sort 
    if(req.query.sort){
        const sortOrder = req.query.sort.split(',').join(' ');
        query = query.sort(sortOrder);
    }
    else{
        query = query.sort('-createdAt');
    }

    //pagination 
    const page = parseInt(req.query.page, 10) || 1; 
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Bootcamp.countDocuments();

    query = query.skip(startIndex).limit(limit);

    //Pagination Result
    const pagination = {};
    if (endIndex < total){
        pagination.next = {
            page:page+1,
            limit
        }
    }

    if (startIndex>0){
        pagination.prev = {
            page:page-1,
            limit
        }
    }

    //Executing query
    const bootcamps = await query

    res.status(200).json({success:true, count: bootcamps.length, pagination, data:bootcamps});
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
