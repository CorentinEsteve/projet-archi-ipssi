const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    password: { 
        type: String,
        required: true
    },
    totalStoragePurchased: {
        type: Number
    },
    numberOfFolders: {
        type: Number
    },
    numberOfFiles: {
        type: Number
    },
    userUniqueNumber: {
        type: String
    },
    totalSorageUsed: {
        type: Number
    }
},{
    timestamps : true
} )

var userModel = mongoose.model("users", userSchema);

module.exports = userModel;