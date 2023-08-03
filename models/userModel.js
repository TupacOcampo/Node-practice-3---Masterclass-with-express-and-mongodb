const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true, "Name required"]
    },
    email:{
        type:String,
        required:[true, "Email required"]
    },
    password:{
        type:String,
        required:[true, "Password required"]
    }
});

//Hash password after save
userSchema.pre('save', function(){
    const salt = bcrypt.salt(10);
    const hashedPassword = bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
});


module.exports = mongoose.model("User", userSchema);
