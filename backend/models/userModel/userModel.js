const mongoose = require("mongoose");
const { any } = require("../../middlewares/multer");

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
    role: {
        type: String,
        default: "customer"
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    postalCode: {
        type: String
    },
    password: { 
        type: String,
        required: true
    },
    totalStoragePurchased: {
        type: Number,
        default: 0
    },
    numberOfFolders: {
        type: Number,
        default : 0
    },
    numberOfFiles: {
        type: Number,
        default: 0
    },
    totalStorageUsed: {
        type: Number,
        default: 0
    },
    userUniqueNumber: {
        type: String
    },
    totalStorageUsed: {
        type: Number,
        default : 0
    },
    profileAvatar : {
        type: String
    }
},{
    timestamps : true
} )

var userModel = mongoose.model("users", userSchema);

module.exports = userModel;