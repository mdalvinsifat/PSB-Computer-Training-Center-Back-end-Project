const mongoose = require("mongoose");

const AuthSchema = mongoose.Schema({
    name:{
        type:String, 
        required:true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "moderator", "student", "default"],
        default: "default"
    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpire: {
        type: Date,
        default: null
    }
});

const AuthModel = mongoose.model("Auth", AuthSchema);

module.exports = AuthModel;
