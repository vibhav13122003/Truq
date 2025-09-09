// Import the Profile model from your truckingModels.js file
const { Profile } = require('../model/TruqProfile.js');
const mongoose = require('mongoose');
const User = require('../model/User');

const createProfile = async (req, res) => {
    try {
        const { profileName, vehicle, isArticulated, trailers } = req.body;

        const newProfile = new Profile({
            profileName,
            vehicle,
            isArticulated,
            trailers: trailers || [],
            user: req.user.id,   // dynamic user
        });

        const savedProfile = await newProfile.save();
        res.status(201).json(savedProfile);
    } catch (error) {
        res.status(400).json({ message: 'Error creating profile', error: error.message });
    }
};

const getMyProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find({ user: req.user.id });
        if (!profiles || profiles.length === 0) {
            return res.status(404).json({ message: 'No profiles found for this user.' });
        }
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profiles', error: error.message });
    }
};

const getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findOne({ _id: req.params.profileId, user: req.user.id });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found or user not authorized.' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { profileName, vehicle, isArticulated } = req.body;
        const profile = await Profile.findOneAndUpdate(
            { _id: req.params.profileId, user: req.user.id },
            { $set: { profileName, vehicle, isArticulated } },
            { new: true, runValidators: true }
        );

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found or user not authorized.' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(400).json({ message: 'Error updating profile', error: error.message });
    }
};

const deleteProfile = async (req, res) => {
    try {
        const profile = await Profile.findOneAndDelete({
            _id: req.params.profileId,
            user: req.user.id
        });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found or user not authorized.' });
        }
        res.status(200).json({ message: 'Profile deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting profile', error: error.message });
    }
};

const addTrailer = async (req, res) => {
    try {
        const profile = await Profile.findOne({ _id: req.params.profileId, user: req.user.id });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found or user not authorized.' });
        }

        const newTrailer = req.body;
        profile.trailers.push(newTrailer);

        await profile.save();
        res.status(201).json(profile);
    } catch (error) {
        res.status(400).json({ message: 'Error adding trailer', error: error.message });
    }
};

const updateTrailer = async (req, res) => {
    try {
        const { profileId, trailerId } = req.params;
        const updatedTrailerData = req.body;

        const updateFields = {};
        for (const key in updatedTrailerData) {
            updateFields[`trailers.$.${key}`] = updatedTrailerData[key];
        }

        const updatedProfile = await Profile.findOneAndUpdate(
            { _id: profileId, user: req.user.id, 'trailers._id': trailerId },
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile or trailer not found, or user not authorized.' });
        }

        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(400).json({ message: 'Error updating trailer', error: error.message });
    }
};

const deleteTrailer = async (req, res) => {
    try {
        const { profileId, trailerId } = req.params;

        const originalProfile = await Profile.findOne({ _id: profileId, user: req.user.id });
        if (!originalProfile) {
            return res.status(404).json({ message: 'Profile not found or user not authorized.' });
        }

        const originalLength = originalProfile.trailers.length;

        const updatedProfile = await Profile.findOneAndUpdate(
            { _id: profileId, user: req.user.id },
            { $pull: { trailers: { _id: trailerId } } },
            { new: true }
        );

        if (updatedProfile.trailers.length === originalLength) {
            return res.status(404).json({ message: 'Trailer not found in this profile.' });
        }

        res.status(200).json({ message: 'Trailer deleted successfully', updatedProfile });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting trailer', error: error.message });
    }
};

// profileController.js
const getProfilesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        // find user first
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // then query profile by email (if profile.user stores email)
        const profiles = await Profile.find({ user: user._id });

        if (!profiles || profiles.length === 0) {
            return res.status(404).json({ message: "No profiles found for this user." });
        }

        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ message: "Error fetching profiles", error: error.message });
    }
};


module.exports = {
    getProfilesByUserId,
    createProfile,
    getMyProfiles,
    getProfileById,
    updateProfile,
    deleteProfile,
    addTrailer,
    updateTrailer,
    deleteTrailer,
};
