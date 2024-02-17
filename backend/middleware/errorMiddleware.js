const errorHandler = (err,req, res, next) => { //setting our own error Handler
    const statusCode = res.statusCode ? res.statusCode : 500
    //if we have a status code, use it, else use 500
    res.status(statusCode)

    res.json({
        message : err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack //if env is production, show null else show stack
    })

}

module.exports = {
    errorHandler,
}