const express = require("express");
const { protect } = require("../functions/auth/authFunctions");
const folderController = require("../controllers/folderController/folderController");

const router = express.Router();

router.get("/", folderController.getFolder);

router.post("/", folderController.addFolder);

router.delete("/:id", folderController.deleteFolder);

module.exports = router;