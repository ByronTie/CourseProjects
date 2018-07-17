//for connecting to mongodb and setting up mongoose
//mongoose is an object data manager, ODM
const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise; //using ES2017 async functions..that return promises
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/warbler", {
    keepAlive: true
});

module.exports.User = require("./user");
module.exports.Message = require("./message");