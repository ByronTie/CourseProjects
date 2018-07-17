require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const db = require("./models");
const authRoutes = require("./routes/auth");
const meesagesRoutes = require("./routes/messages");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");

const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(bodyParser.json());

//all my routes here - they will come later
app.use("/api/auth", authRoutes);
app.use("/api/users/:id/messages",
    loginRequired,
    ensureCorrectUser,
    meesagesRoutes);

app.use("/api/messages",
    loginRequired,
    async function (req, res, next) {
        try {
            let messages = await db.Message.find()
                .sort({ createdAt: "desc" })
                .populate("user", {
                    username: true,
                    profileImageUrl: true
                });
            return res
                .status(200)
                .json(messages);
        } catch (err) {
            return next(err);
        }
    });

//if routes not reached, run this function
//next - move to next piece of middleware
app.use(function (rez, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(PORT, function () {
    console.log(`Server starting on port, ${PORT}`);
});