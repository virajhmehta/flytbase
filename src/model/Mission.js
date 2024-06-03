import mongoose from 'mongoose';

const waypointSchema = new mongoose.Schema({
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    },
    alt: {
        type: Number,
        required: true,
    },
});

const missionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    alt: {
        type: Number,
        required: true,
    },
    speed: {
        type: Number,
        required: true,
    },
    waypoints: [waypointSchema],
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site',
        required: true,
    },
    type: {
        type: String,
        enum: ['path', 'grid', 'corridor'],
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

const Mission = mongoose.model('Mission', missionSchema);

export default Mission;
