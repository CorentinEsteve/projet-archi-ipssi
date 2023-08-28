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
  
    const userCreated = await folderModel.create({userId, folderLabel});
  
    res.status(201).json(userCreated);

  }catch(error){
    console.log(error);
  }
});

const deleteFolder = asyncWrapper( async (req, res) => {

  try {

    
      const userId = req.body.userId;
    
      const userFound = await userModel.findById(userId);
    
      const userFoundTotalFolderNumber = userFound.numberOfFolders;
      const newTotalFolderNumber = userFoundTotalFolderNumber - 1;
    
      await userModel.findByIdAndUpdate(userId, {numberOfFolders : newTotalFolderNumber});
    
      const folderId = req.params.id;
    
      const filesFound = await fileModel.find({folderId : folderId});
    
      filesFound.map(async(file) => {
    
       const fileDeleted = await fileModel.findByIdAndDelete(file._id);
    
      })
    
      const folderFound = await folderModel.findByIdAndDelete(folderId);
    
      res.status(200).json({filesDeleted : filesFound, folderDeleted : folderFound});

  }catch(error){
    console.log(error);
  }
});


const getFolder = asyncWrapper( async (req, res) => {

  try{
    
      const foldersFound = await folderModel.find({userId: req.body.userId});
    
      res.status(200).json(foldersFound);

  }catch(error){
    console.log(error);
  }
});

module.exports = { addFolder, getFolder, deleteFolder };