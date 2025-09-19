const express = require('express');
const router = express.Router();
const helpSupportController = require("../controller/HelpController");
const { protect } = require("../middleware/authMiddleware"); 


router.post("/", protect, helpSupportController.createHelp);
router.get("/", protect, helpSupportController.getHelps);
router.get("/:id", protect, helpSupportController.getHelpById);
router.delete("/:id", protect, helpSupportController.deleteHelp);


module.exports = router;