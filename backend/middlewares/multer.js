const multer = require("multer");

const storage = multer.diskStorage({
    destination : function (req, file, cb){
        //Where to store the file 
        console.log("mon chemin");
        console.log(process.cwd());
        cb(null, `${process.cwd()}/uploads`);
    },
    filename : function (req, file, cb){
        cb(null, file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    // reject inserted file if it's not jpg, png or pdf
    if(
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "application/pdf"

    ){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer({
    storage : storage,
    limits: {
        fileSize : 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

module.exports = upload;