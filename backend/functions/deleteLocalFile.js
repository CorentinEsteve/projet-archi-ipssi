const fs = require('fs');

const DeleteLocalFile = (filePath) => {
    // Vérifier si le fichier existe avant de le supprimer
if (fs.existsSync(filePath)) {

    // Supprimer le fichier
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Une erreur s\'est produite lors de la suppression du fichier :', err);
      } else {
        console.log('Le fichier a été supprimé avec succès.');
      }
    });

  } else {
    console.log('Le fichier n\'existe pas.');
  }
}

module.exports = DeleteLocalFile;