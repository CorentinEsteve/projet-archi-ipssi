const UserModel = require("../../models/userModel/userModel");
const { HashPassword, ComparePassword, ConvertToBase64, asyncWrapper } = require("../../functions/functions");
const { createJWT } = require("../../functions/auth/authFunctions");
const userModel = require("../../models/userModel/userModel");
const folderModel = require("../../models/folderModel/folderModel");
const fileModel = require("../../models/fileModel/fileModel");

const SignUp = async(req, res) => {

        const userFound = await UserModel.findOne({email : req.body.email});
    
        if( userFound!= null ){
          res.json({ message : "user already exist" });
    
          return;
        }

        req.body.password = await HashPassword(req.body.password)

        const newUser = await UserModel.create(req.body);

        const token = createJWT(newUser);

        res.status(200).json({user : newUser, token : token});
}

const LogIn = async(req, res) => {

    const userFound = await UserModel.findOne({email : req.body.email});

    if(userFound == null){

      res.status(200).json({ message : "adresse email incorrect !" });
      return;
    }

    const isSamePassword = await ComparePassword(req.body.password, userFound.password);

    if(isSamePassword == true){

      const token = createJWT(userFound);

      res.status(200).json({user : userFound, token: token});
      return;
    }

    res.status(200).json({ message : "Mot de passe incorrect !"})
}

const UpdateUserAvatar = asyncWrapper( async (req, res) => {
  const userId = req.params.id;
  
  const filePath = req.file.path;
  const fileName = req.file.originalname;

  const user = await userModel.findByIdAndUpdate(userId,{ profileAvatar : filePath});

  res.status(200).json(user);
});


const GetAllUsers = asyncWrapper( async (req, res) => {

  const AllUsers = await userModel.find()

  res.status(200).json(AllUsers);
});

const deleteUser = asyncWrapper( async (req, res) => {

  const userId = req.params.id;

  const foldersFound = await folderModel.find({userId});

  foldersFound.map(async(folder) => {
    await folderModel.findByIdAndDelete(folder._id);
  })

  const filesFound = await fileModel.find({userId});

  filesFound.map(async(file) => {
    await fileModel.findByIdAndDelete(file._id);
  })

  const userDeleted = await userModel.findByIdAndDelete(userId)

  res.status(200).json({userDeleted, filesDeleted : filesFound, foldersDeleted : foldersFound });
});

module.exports = {SignUp, LogIn, UpdateUserAvatar, GetAllUsers, deleteUser};