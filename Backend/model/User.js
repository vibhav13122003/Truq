const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date }

}, { timestamps: true });
UserSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300, partialFilterExpression: { isVerified: false } });

module.exports = mongoose.model("User", UserSchema);