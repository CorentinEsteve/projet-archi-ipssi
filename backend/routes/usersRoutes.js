const express = require("express");
const upload = require("../middlewares/multer");
const userController = require("../controllers/userController/userController");
const { protect } = require("../functions/auth/authFunctions");

const router = express.Router();

router.patch("/avatar/update/:id", upload.single("file"), userController.UpdateUserAvatar);

router.get("/", protect, userController.GetAllUsers);

router.delete("/:id", protect, userController.deleteUser);

router.patch("/addStorageAfterPayment", protect, userController.addStorageAfterPayment)

module.exports = router;