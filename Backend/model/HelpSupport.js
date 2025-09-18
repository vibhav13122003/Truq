const mongoose = require('mongoose');

const HelpSupportSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    email: { type: String, required: true },


    }, { timestamps: true });

HelpSupportSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('HelpSupport', HelpSupportSchema);