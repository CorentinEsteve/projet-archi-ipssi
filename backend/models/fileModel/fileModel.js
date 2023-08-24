const mongoose = require("mongoose");

var fileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    folderId: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    }
},{
    timestamps : true
} )

var fileModel = mongoose.model("files", fileSchema);

module.exports = fileModel;