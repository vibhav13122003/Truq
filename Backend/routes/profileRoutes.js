const express = require("express");
const {
    getMyProfiles,   // ✅ correct function name
    createProfile,
    getProfileById,
    updateProfile,
    deleteProfile,
    addTrailer,
    updateTrailer,
    deleteTrailer
} = require("../controller/profileController");

const router = express.Router();

// Profile routes
router.route("/")
    .get(getMyProfiles)    // ✅ corrected here
    .post(createProfile);

router.route("/:profileId")
    .get(getProfileById)
    .put(updateProfile)
    .delete(deleteProfile);

router.route("/:profileId/trailers")
    .post(addTrailer);

router.route("/:profileId/trailers/:trailerId")
    .put(updateTrailer)
    .delete(deleteTrailer); // ✅ also include delete for trailers

module.exports = router;
