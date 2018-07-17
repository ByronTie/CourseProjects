const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); //use for password hashing

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: { //one way password hashing
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }]
});

//use hook before the save
userSchema.pre("save", async function (next) {
    try {
        //check if 'this' user is not modified by the password
        if (!this.isModified("password")) {
            return next(); //move on, dont need to hash the password again
        }

        let hashedPassword = await bcrypt.hash(this.password, 10); //10 is the salt
        this.password = hashedPassword;
        return next();

    } catch (err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword, next) {
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        return next(err);
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;