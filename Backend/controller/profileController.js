// Import the Profile model from your truckingModels.js file
const { Profile } = require('../model/TruqProfile.js');
const mongoose = require('mongoose');


const createProfile = async (req, res) => {
    try {
        const { profileName, vehicle, isArticulated, trailers } = req.body;

      
        const userId = "68b8448c1c82242e11d951c6";

        const newProfile = new Profile({
            profileName,
            vehicle,
            isArticulated,
            trailers: trailers || [], // Can create a profile with or without trailers initially
            user: userId,
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
        if (!profiles) {
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
            { _id: req.params.profileId, user: req.user.id }, // Ensure user owns this profile
            { $set: { profileName, vehicle, isArticulated } },
            { new: true, runValidators: true } // Return the updated doc and run schema validators
        );

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found or user not authorized.' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(400).json({ message: 'Error updating profile', error: error.message });
    }
};

/**
 * @description Delete a profile
 * @route       DELETE /api/profiles/:profileId
 */
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
        const profile = await Profile.findOne({ _id: req.params.profileId, user: '68b8448c1c82242e11d951c6'});

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found or user not authorized.' });
        }

        // req.body should contain the new trailer's data
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

        // Create an object to set the fields of the embedded document
        const updateFields = {};
        for (const key in updatedTrailerData) {
            updateFields[`trailers.$.${key}`] = updatedTrailerData[key];
        }

        const updatedProfile = await Profile.findOneAndUpdate(
            {
                _id: profileId,
                user: req.user.id,
                'trailers._id': trailerId
            },
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

        // 1. Fetch original profile first
        const originalProfile = await Profile.findOne({ _id: profileId, user: '68b8448c1c82242e11d951c6' });
        if (!originalProfile) {
            return res.status(404).json({ message: 'Profile not found or user not authorized.' });
        }

        const originalLength = originalProfile.trailers.length;

        // 2. Perform deletion
        const updatedProfile = await Profile.findOneAndUpdate(
            { _id: profileId, user: '68b8448c1c82242e11d951c6' },
            { $pull: { trailers: { _id: trailerId } } },
            { new: true }
        );

        // 3. Check if something was removed
        if (updatedProfile.trailers.length === originalLength) {
            return res.status(404).json({ message: 'Trailer not found in this profile.' });
        }

        res.status(200).json({ message: 'Trailer deleted successfully', updatedProfile });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting trailer', error: error.message });
    }
};


module.exports = {
    createProfile,
    getMyProfiles,
    getProfileById,
    updateProfile,
    deleteProfile,
    addTrailer,
    updateTrailer,
    deleteTrailer,
};
