const mongoose = require("mongoose");

var folderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    folderName: {
        type: String,
        required: true
    }
},{
    timestamps : true
} )

var folderModel = mongoose.model("folders", folderSchema);

module.exports = folderModel;