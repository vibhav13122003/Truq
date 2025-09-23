const Hazard = require('../model/Hazard');


exports.createHazard = async (req, res) => {
    try {
        const { hazardClass, description, vehicleType, location, photos } = req.body;

        const hazard = new Hazard({
            user: req.user.id, 
            hazardClass,
            description,
            vehicleType,
            location,
            photos
        });

        await hazard.save();
        res.status(201).json({ success: true, hazard });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Get All Hazards
exports.getHazards = async (req, res) => {
    try {
        const hazards = await Hazard.find().populate('user', 'name email');
        res.status(200).json({ success: true, hazards });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Get Single Hazard by ID
exports.getHazardById = async (req, res) => {
    try {
        const hazard = await Hazard.findById(req.params.id).populate('user', 'name email');
        if (!hazard) {
            return res.status(404).json({ success: false, message: 'Hazard not found' });
        }
        res.status(200).json({ success: true, hazard });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Update Hazard
exports.updateHazard = async (req, res) => {
    try {
        const hazard = await Hazard.findById(req.params.id);
        if (!hazard) {
            return res.status(404).json({ success: false, message: 'Hazard not found' });
        }

        // allow only owner or admin to update
        if (hazard.user.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        Object.assign(hazard, req.body); // update fields dynamically
        await hazard.save();

        res.status(200).json({ success: true, hazard });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};
// Get hazards submitted by a specific user (admin only or with userId param)
exports.getHazardsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const hazards = await Hazard.find({ user: userId }).populate("user", "name email");

        if (!hazards || hazards.length === 0) {
            return res.status(404).json({ success: false, message: "No hazards found for this user" });
        }

        res.status(200).json({ success: true, hazards });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};


// Delete Hazard
exports.deleteHazard = async (req, res) => {
    try {
        const hazard = await Hazard.findById(req.params.id);
        if (!hazard) {
            return res.status(404).json({ success: false, message: 'Hazard not found' });
        }

        // allow only owner or admin to delete
        if (hazard.user.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        await hazard.remove();
        res.status(200).json({ success: true, message: 'Hazard removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Approve Hazard (Admin only)
exports.approveHazard = async (req, res) => {
    try {
        const hazard = await Hazard.findById(req.params.id);
        if (!hazard) {
            return res.status(404).json({ success: false, message: 'Hazard not found' });
        }

        hazard.isApproved = true;
        await hazard.save();

        res.status(200).json({ success: true, message: 'Hazard approved', hazard });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};
