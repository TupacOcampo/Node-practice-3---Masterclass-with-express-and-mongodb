const express = require("express")
const dotEnv = require("dotenv").config();
const requestLogger = require("./middleware/loggerMiddleware");
const connect = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const colors = require("colors");

const PORT = process.env.PORT || 5000;
const app = express();

connect();

app.use(express.json());
app.use(requestLogger);
app.use("/api/v1/bootcamps", require("./routes/bootcampRoutes"));
app.use("/api/v1/courses", require("./routes/courseRoutes"));
app.use(errorHandler);

const server = app.listen(PORT, (req, res) => {
    console.log(`Server running in ${process.env.NODE_ENV} mode`.green.bold);
    console.log(`on port ${PORT}`.green.bold);
});

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(()=> process.exit(1));
})