const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type:String,
        required: true,
        enum: ['doctor', 'staff'],
        default: 'staff'
    }
});

module.exports = mongoose.model("User", userSchema);