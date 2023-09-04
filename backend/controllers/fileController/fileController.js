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
const getFilesUploadedToday = async (req, res) => {
    try {

        const aujourdHui = new Date();
        aujourdHui.setHours(0, 0, 0, 0); // Met à 00:00:00 pour le début de la journée
        const demain = new Date(aujourdHui);
        demain.setDate(demain.getDate() + 1);

        const filesFound = await fileModel.find({ createdAt: { $gte: aujourdHui, $lt: demain } });

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
        console.log("req.file",req.file);
        const { fileLabel, userId } = req.body;
        const filePath = req.file.path;
        const fileName = req.file.originalname;
        const fileSizeMb = req.file.size;
        const folderId = req.body.folderId;

        console.log("fileSizeMb",fileSizeMb)

        const userFound = await userModel.findById(userId);
        console.log("userfound", userFound);

        const userFoundTotalStorageUsed = userFound.totalStorageUsed;
        console.log("userFoundTotalStorageUsed", userFoundTotalStorageUsed)
        const newTotalStorageUsed = userFoundTotalStorageUsed + fileSizeMb;
        console.log("newTotalStorageUsed",newTotalStorageUsed)

        const userFoundTotalFileNumber = userFound.numberOfFiles;
        const newTotalFileNumber = userFoundTotalFileNumber + 1;
    
        const userUpdated = await userModel.findByIdAndUpdate(userId, {totalStorageUsed : newTotalStorageUsed, numberOfFiles : newTotalFileNumber}, {new: true});

        const file = await fileModel.create({fileName, filePath, folderId, userId, fileLabel, fileSizeMb});
        res.status(201).json({ file, userUpdated })
    }catch(error){
        console.log(error);
    }
})

const deleteFile = asyncWrapper( async (req, res) => {
    try{

        const { userId, fileId, fileSizeMb, folderId } = req.body;

        const userFound = await userModel.findById(userId);

        const newTotalStorageUsed = userFound.totalStorageUsed - fileSizeMb;

        const userFoundTotalFileNumber = userFound.numberOfFiles;
        const newTotalFileNumber = userFoundTotalFileNumber - 1;

        const userUpdated = await userModel.findByIdAndUpdate(userId, {totalStorageUsed: newTotalStorageUsed, numberOfFiles : newTotalFileNumber},{new: true});

        const fileDeleted = await fileModel.findOneAndDelete({_id : fileId});
        DeleteLocalFile(fileDeleted.filePath);

        const newFilesList = await fileModel.find({folderId});

        res.status(200).json({userUpdated, newFilesList});


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

module.exports = { getOneFile, addFile, downloadFile, deleteFile, getFiles, getFolderFiles, getFilesUploadedToday };