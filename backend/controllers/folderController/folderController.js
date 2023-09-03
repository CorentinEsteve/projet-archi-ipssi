const folderModel = require("../../models/folderModel/folderModel");
const { asyncWrapper } = require("../../functions/functions");
const fileModel = require("../../models/fileModel/fileModel");
const userModel = require("../../models/userModel/userModel");

const addFolder = asyncWrapper( async (req, res) => {

  try {

    const { userId, folderLabel } = req.body
  
    const userFound = await userModel.findById(userId);
  
    const userFoundTotalFolderNumber = userFound.numberOfFolders;
    const newTotalFolderNumber = userFoundTotalFolderNumber + 1;
  
    await userModel.findByIdAndUpdate(userId, {numberOfFolders : newTotalFolderNumber});
  
    await folderModel.create({userId, folderLabel});

    const userUpdated = await userModel.findById(userId);
    const newFolderList = await folderModel.find({userId});
  
    res.status(201).json({ userUpdated, newFolderList });

  }catch(error){
    console.log(error);
  }
});

const deleteFolder = asyncWrapper( async (req, res) => {

  try {

      const userId = req.body.userId;
      const folderId = req.params.id;
    
      const userFound = await userModel.findById(userId);
      const filesFound = await fileModel.find({folderId : folderId});

      console.log("userFound", userFound);
      console.log("userFound storage",userFound.totalStorageUsed);
    
      const userFoundTotalFolderNumber = userFound.numberOfFolders;
      console.log("userFoundTotalFolderNumber", userFoundTotalFolderNumber)
      const userFoundTotalFileNumber = userFound.numberOfFiles;
      const userFoundTotalStorageUsed = userFound.totalStorageUsed;
      const filesFoundLength = filesFound.length;
      const filesFoundTotalStorage = filesFound.reduce((acc, element) => acc + element.fileSizeMb, 0);

      console.log("file found reduce storage", filesFoundTotalStorage);

      const newTotalFolderNumber = userFoundTotalFolderNumber - 1;
      const newTotalFileNumber = userFoundTotalFileNumber - filesFoundLength;
      const newTotalFileStorage = userFoundTotalStorageUsed - filesFoundTotalStorage;

     // console.log("newtotalstorage", newTotalFileStorage);
      console.log("newtotalfilenumber", newTotalFileNumber);
      console.log("newtotalfoldernumber", newTotalFolderNumber);
    
      await userModel.findByIdAndUpdate(userId, {numberOfFolders : newTotalFolderNumber, numberOfFiles: newTotalFileNumber, totalStorageUsed: newTotalFileStorage});
    
      filesFound.map(async(file) => {
    
       const fileDeleted = await fileModel.findByIdAndDelete(file._id);
    
      })
    
      await folderModel.findByIdAndDelete(folderId);

      const userUpdated = await userModel.findById(userId);
      const newFolderList = await folderModel.find({userId});
    
      res.status(200).json({ newFolderList, userUpdated });

  }catch(error){
    console.log(error);
  }
});


const getCurrentUserFolders = asyncWrapper( async (req, res) => {

  try{
    
      const foldersFound = await folderModel.find({userId: req.params.userId});
    
      res.status(200).json(foldersFound);

  }catch(error){
    console.log(error);
  }
});

module.exports = { addFolder, getCurrentUserFolders, deleteFolder };