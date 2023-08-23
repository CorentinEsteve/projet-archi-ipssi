const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true
    },
    firstName:  {
        type : String,
        required: true
    }
},{
    timestamps : true
} )

var userModel = mongoose.model("users", userSchema);

module.exports = userModel;