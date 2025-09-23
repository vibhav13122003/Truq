const mongoose = require('mongoose');
const { Schema } = mongoose;

const HazardSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    hazardClass: {
        type: String,
        required: [true, 'Hazard class is required.'],
    },
    description: {
        type: String,
        required: [true, 'Description is required.'],
        trim: true
    },
    vehicleType: {
        type: String,
        required: [true, 'Vehicle type is required.'],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Location is required.'],
        trim: true
    },
    photos: [
        {
            type: String,
            required: true
        },
       
    ],
    status: {
        type: String,
        enum: ['Pending', 'Verified', 'Rejected'],
        default: 'Pending'
    },
    isApproved: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

module.exports = mongoose.model('Hazard', HazardSchema);
