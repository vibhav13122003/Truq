const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmbeddedTrailerSchema = new Schema({
    height_m: {
        type: Number,
        required: [true, 'Trailer height is required.']
    },
    width_m: {
        type: Number,
        required: [true, 'Trailer width is required.']
    },
    length_m: {
        type: Number,
        required: [true, 'Trailer length is required.']
    },
    weight_kg: {
        type: Number,
        required: [true, 'Trailer weight is required.']
    },
    axles: {
        type: Number,
        required: [true, 'Number of trailer axles is required.'],
        min: 0
    },
   
    isLaden: {
        type: Boolean,
        default: false
    }
});


const ProfileSchema = new Schema({
    profileName: {
        type: String,
        required: [true, 'Profile Name is required.'],
        trim: true
    },
   
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
     
    },
    vehicle: {
        height_m: { type: Number, required: true },
        width_m: { type: Number, required: true },
        length_m: { type: Number, required: true },
        weight_kg: { type: Number, required: true },
        axles: { type: Number, required: true, min: 0 }
    },
    isArticulated: {
        type: Boolean,
        default: false
    },

    trailers: [EmbeddedTrailerSchema]
}, {
    
    timestamps: true
});

const Profile = mongoose.model('Profile', ProfileSchema);


module.exports = {Profile};

