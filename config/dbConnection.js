const mongoose = require("mongoose")

const connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`connection to Database was established`);
        console.log(`Host: ${conn.connection.host}`);
        console.log(`Name: ${conn.connection.name}`);
    } catch (error) {
        console.log("There was a problem connecting to the database".red.underline.bold);
    }
};

module.exports = connect;