const express = require('express');
const router = express.Router();
const { protect } = require("../functions/auth/authFunctions");

router.post("/addFile", protect, (req,res) => {
    res.json("Hello file");
})

module.exports = router;