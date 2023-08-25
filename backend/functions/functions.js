const bcrypt = require("bcrypt");
const fs = require('fs');

 const ComparePassword = (password, bddHashedPassword) => {
    return bcrypt.compare(password, bddHashedPassword)
  }
  
 const HashPassword = (password) => {
    return bcrypt.hash(password, 10)
  }

const asyncWrapper = (fn) => {
  return async (req,res,next) => {
    try {
      await fn(req,res,next);
    }catch(error){
      next(error);
    }
  }
}

const ConvertToBase64 = (filePath) => {

  // Lecture du contenu du fichier de manière asynchrone
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error("Erreur lors de la lecture du fichier :", err);
      return;
    }
    
    // Convertir les données du fichier en base64
    const base64Data = data.toString('base64');
    
    console.log("Contenu du fichier en base64 :", base64Data);

    return base64Data;
  });
}

 module.exports = {ComparePassword, HashPassword, asyncWrapper, ConvertToBase64}