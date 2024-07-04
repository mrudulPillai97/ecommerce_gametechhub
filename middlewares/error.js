const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    // wrong mongodb id error
    if(err.name === "CastError") {
        const message = "Resource not found - Invalid id";
        err = new ErrorHandler(message, 400);
    }

    // duplicate mongodb key error
    if(err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)}`;
        err = new ErrorHandler(message, 400);
    }

    // wrong JWT token error
    if(err.name === "JsonWebTokenError") {
        const message = "Json web token is invalid";
        err = new ErrorHandler(message, 400);
    }

    // expire JWT token error
    if(err.name === "TokenExpiredError") {
        const message = "Json web token is expired";
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        error: err.message,
    });
}