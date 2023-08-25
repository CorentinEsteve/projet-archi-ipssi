const folderModel = require("../../models/folderModel/folderModel");
const { asyncWrapper } = require("../../functions/functions");
const fileModel = require("../../models/fileModel/fileModel");


const addFolder = asyncWrapper( async (req, res) => {
  const { userId, folderLabel} = req.body
  console.log("req.body")
  console.log(req.body)
  console.log("req.body")

  const userCreated = await folderModel.create({userId, folderLabel});

  res.status(200).json(userCreated);
});

const deleteFolder = asyncWrapper( async (req, res) => {
  const folderId = req.params.id;

  const filesFound = await fileModel.find({folderId : folderId});

  filesFound.map(async(file) => {

   const fileDeleted = await fileModel.findByIdAndDelete(file._id);

  })

  const folderFound = await folderModel.findByIdAndDelete(folderId);

  res.status(200).json({filesDeleted : filesFound, folderDeleted : folderFound});
});


const getFolder = asyncWrapper( async (req, res) => {

  const foldersFound = await folderModel.find({userId: req.body.userId});

  res.status(200).json(foldersFound);
});

module.exports = { addFolder, getFolder, deleteFolder };