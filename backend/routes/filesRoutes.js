const upload = require("../middlewares/multer");
const express = require("express");
const fileController = require("../controllers/fileController/fileController");
const { protect } = require("../functions/auth/authFunctions");

const router = express.Router();

router.get("/", protect, fileController.getFiles);
router.get("/today", protect, fileController.getFilesUploadedToday);
router.get("/:id", protect, fileController.getOneFile);
router.get("/folder-files/:folderId", protect, fileController.getFolderFiles);
router.get("/download/:id", protect, fileController.downloadFile);

router.post("/", upload.single("file"), fileController.addFile);

router.delete("/", protect, fileController.deleteFile);

module.exports = router;