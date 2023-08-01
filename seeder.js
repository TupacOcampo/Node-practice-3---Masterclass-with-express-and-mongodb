const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv").config();

const Bootcamp = require("./models/bootcampModel");
const Course = require("./models/courseModel");

mongoose.connect(process.env.CONNECTION_STRING);

const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));

const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'));

const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        await Course.create(courses);
        console.log('Data imported...'.green.inverse);
        process.exit()
    } catch (error) {
        console.error(error);
    }
}

const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        console.log('Data destroyed...'.red.inverse);
        process.exit()
    } catch (error) {
        console.error(error);
    }
}

if (process.argv[2] === '-i'){
    importData();
}else if (process.argv[2] === '-d'){
    deleteData();
}