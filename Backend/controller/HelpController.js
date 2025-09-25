const HelpSupport = require("../model/HelpSupport");

// ================= CREATE HELP =================
exports.createHelp = async (req, res) => {
    try {
        const { subject, message, email } = req.body;

        if (!subject || !message || !email) {
            return res.status(400).json({ success: false, msg: "All fields are required" });
        }

        const help = new HelpSupport({
            user: req.user.id, 
            subject,
            message,
            email,
        });

        await help.save();

        res.status(201).json({
            success: true,
            msg: "Help request submitted successfully",
            help,
        });
    } catch (err) {
        console.error("Create Help Error:", err);
        res.status(500).json({ success: false, msg: "Server error" });
    }
};

// ================= GET ALL HELP (Admin) =================
exports.getHelps = async (req, res) => {
    try {
        const helps = await HelpSupport.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, helps });
    } catch (err) {
        console.error("Get Helps Error:", err);
        res.status(500).json({ success: false, msg: "Server error" });
    }
};

// ================= GET HELP BY ID =================
exports.getHelpById = async (req, res) => {
    try {
        const help = await HelpSupport.findById(req.params.id).populate("user", "name email");
        if (!help) {
            return res.status(404).json({ success: false, msg: "Help request not found" });
        }
        res.status(200).json({ success: true, help });
    } catch (err) {
        console.error("Get Help By ID Error:", err);
        res.status(500).json({ success: false, msg: "Server error" });
    }
};

// ================= DELETE HELP =================
exports.deleteHelp = async (req, res) => {
    try {
        const help = await HelpSupport.findById(req.params.id);
        if (!help) {
            return res.status(404).json({ success: false, msg: "Help request not found" });
        }

        // allow only owner or admin
        if (help.user.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({ success: false, msg: "Not authorized" });
        }

        await help.deleteOne();
        res.status(200).json({ success: true, msg: "Help request deleted successfully" });
    } catch (err) {
        console.error("Delete Help Error:", err);
        res.status(500).json({ success: false, msg: "Server error" });
    }
};
