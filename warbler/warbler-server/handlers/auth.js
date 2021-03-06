const db = require("../models");
const jwt = require("jsonwebtoken"); //header, payload, signature

exports.signin = async function (req, res, next) {
    try {
        //finding a user
        let user = await db.User.findOne({
            email: req.body.email
        });
        let { id, username, profileImageUrl } = user;
        //checking if their password matches what was sent to the server
        let isMatch = await user.comparePassword(req.body.password);
        //if it all matches
        if (isMatch) {
            //log them in (e.g send a cookie, sending session info, signing/creating a jwt token, etc)
            let token = jwt.sign({
                id,
                username,
                profileImageUrl
            }, process.env.SECRET_KEY);

            return res
                .status(200)
                .json({
                    id,
                    username,
                    profileImageUrl,
                    token
                });
        } else {
            return next({
                status: 400,
                message: "Invalid Email/Password."
            });
        }
    } catch (err) {
        return next({
            status: 400,
            message: "Invalid Email/Password."
        });
    }
}

exports.signup = async function (req, res, next) {
    try {
        //create a user
        let user = await db.User.create(req.body);
        let { id, username, profileImageUrl } = user;

        //create a token (signing a token)
        //process.env.SECRET_KEY
        let token = jwt.sign({
            id,
            username,
            profileImageUrl
        }, process.env.SECRET_KEY);

        return res
            .status(200)
            .json({
                id,
                username,
                profileImageUrl,
                token
            });
    } catch (err) {
        //see what kind of error
        //if it is a certain error, ie. 'if a validation fails' error
        if (err.code === 11000) {
            err.message = "Sorry, that username and/or email is taken.";
        }
        //response with username/email already taken
        return next({
            status: 400,
            message: err.message
        });
        //otherwise just send back a generic 400 (bad request)
    }
}