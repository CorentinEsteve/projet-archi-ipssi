const fileModel = require("../../models/fileModel/fileModel");
const path = require("path");
const { asyncWrapper } = require("../../functions/functions");
const { findById } = require("../../models/userModel/userModel");
const userModel = require("../../models/userModel/userModel");
const DeleteLocalFile = require("../../functions/deleteLocalFile");

const getOneFile = async (req, res) => {
    try {
        const fileFound = await fileModel.findById(req.params.id);
        res.status(200).json({ fileFound });
        
    }catch(error){
        console.log(error);
    }
}

const getFiles = async (req, res) => {
    try {
        const filesFound = await fileModel.find({userId: req.body.userId})
        res.status(200).json({ filesFound });
        
    }catch(error){
        console.log(error);
    }
}

const getFolderFiles = async (req, res) => {
    try {
        const filesFound = await fileModel.find({folderId: req.params.folderId})
        res.status(200).json({ filesFound });
        
    }catch(error){
        console.log(error);
    }
}

const addFile = asyncWrapper( async (req, res) => {
    try {
        const { fileLabel, userId } = req.body;
        const filePath = req.file.path;
        const fileName = req.file.originalname;
        const fileSizeMb = req.file.size;
        const folderId = req.body.folderId;

        const userFound = await userModel.findById(userId);

        const userFoundTotalStorageUsed = userFound.totalSorageUsed;
        const newTotalStorageUsed = userFoundTotalStorageUsed + fileSizeMb;

        const userFoundTotalFileNumber = userFound.numberOfFiles;
        const newTotalFileNumber = userFoundTotalFileNumber + 1;
    
        await userModel.findByIdAndUpdate(userId, {totalSorageUsed : newTotalStorageUsed, numberOfFiles : newTotalFileNumber});

        const file = await fileModel.create({fileName, filePath, folderId, userId, fileLabel, fileSizeMb});
        res.status(201).json({ file })
    }catch(error){
        console.log(error);
    }
})

const deleteFile = asyncWrapper( async (req, res) => {
    try{

        const { userId, fileId, fileSizeMb } = req.body;

        const userFound = await userModel.findById(userId);

        const newTotalStorageUsed = userFound.totalSorageUsed - fileSizeMb;

        const userFoundTotalFileNumber = userFound.numberOfFiles;
        const newTotalFileNumber = userFoundTotalFileNumber - 1;

        await userModel.findByIdAndUpdate(userId, {totalSorageUsed: newTotalStorageUsed, numberOfFiles : newTotalFileNumber});

        const fileDeleted = await fileModel.findOneAndDelete({_id : fileId});
        DeleteLocalFile(fileDeleted.filePath);

        res.status(200).json(fileDeleted);


    }catch(error){
        console.log(error);
    }
})

const downloadFile = asyncWrapper(async (req,res) => {

    try {

        const fileFound = await fileModel.findById(req.params.id);
    
        if(!fileFound){
            return next(new Error("No file found"))
        }
    
        const fileName = fileFound.fileName;
        const fileLocalPath = path.join(__dirname, `../../uploads/${fileName}`);
    
        res.status(200).download(fileLocalPath);
        
    }catch (error){
        console.log(error);
    }
 
})

module.exports = { getOneFile, addFile, downloadFile, deleteFile, getFiles, getFolderFiles };