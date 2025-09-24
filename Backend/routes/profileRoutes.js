const express = require("express");
const {
    getMyProfiles,   // ✅ correct function name
    createProfile,
    getProfileById,
    updateProfile,
    deleteProfile,
    addTrailer,
    updateTrailer,
    deleteTrailer,
    getProfilesByUserId,
    activateProfile
} = require("../controller/profileController");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect,createProfile);
router.get("/",protect, getMyProfiles);
router.get("/:profileId", protect, getProfileById);
router.put("/:profileId", protect, updateProfile);
router.delete("/:profileId", protect, deleteProfile);
router.post("/:profileId/trailers", protect, addTrailer);
router.put("/:profileId/trailers/:trailerId", protect, updateTrailer);
router.delete("/:profileId/trailers/:trailerId", protect, deleteTrailer);
router.get("/user/:userId", getProfilesByUserId);
router.put("/activate/:profileId", protect, activateProfile);   

module.exports = router;
