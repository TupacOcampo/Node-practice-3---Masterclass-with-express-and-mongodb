//@desc     Loggs request into console
function requestLogger (req, res, next) {
    console.log(`Req: ${req.method} ${req.path}`);
    next();
}

module.exports = requestLogger;