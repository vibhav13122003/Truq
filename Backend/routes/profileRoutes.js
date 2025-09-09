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
    getProfilesByUserId
} = require("../controller/profileController");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

router.post("/", createProfile);
router.get("/", getMyProfiles);
router.get("/profiles/:profileId", protect, getProfileById);
router.put("/profiles/:profileId", protect, updateProfile);
router.delete("/profiles/:profileId", protect, deleteProfile);
router.post("/profiles/:profileId/trailers", protect, addTrailer);
router.put("/profiles/:profileId/trailers/:trailerId", protect, updateTrailer);
router.delete("/profiles/:profileId/trailers/:trailerId", protect, deleteTrailer);
router.get("/user/:userId", getProfilesByUserId);

module.exports = router;
