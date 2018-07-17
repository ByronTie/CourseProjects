require('dotenv').load(); //extra insurance step to make sure we load .env file at this time
const jwt = require("jsonwebtoken");

//make sure user is logged - Authentication
exports.loginRequired = function (req, res, next) {
    try {
        // (realm) Bearer ____
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function (err, decodedPayload) {
            if (decodedPayload) {
                //go to next middleware if payload exists
                return next();
            } else {
                return next({
                    status: 401,
                    message: "Please log in first" //be generic
                });
            }
        });
    } catch (err) {
        return next({
            status: 401,
            message: "Please log in first" //be generic
        });
    }
}

//make sure we get teh correct user - Authorisation
exports.ensureCorrectUser = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function (err, decodedPayload) {
            if (decodedPayload && decodedPayload.id === req.params.id) {
                return next();
            } else {
                return next({
                    status: 401,
                    message: "Unauthorised" //be generic
                });
            }
        });
    } catch (err) {
        return next({
            status: 401,
            message: "Unauthorised" //be generic
        });
    }
}