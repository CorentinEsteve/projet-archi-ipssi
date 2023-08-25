const mongoose = require("mongoose");

var folderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    folderLabel: {
        type: String,
        required: true
    }
},{
    timestamps : true
} )

var folderModel = mongoose.model("folders", folderSchema);

module.exports = folderModel;