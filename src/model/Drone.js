import mongoose from 'mongoose';

const DroneSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    site: { type: mongoose.Schema.Types.ObjectId, ref: 'Site' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },  
    drone_type: { type: String, required: true },
    make_name: { type: String, required: true },
    name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    deleted_on: { type: Date },
});

const Drone = mongoose.model('Drone', DroneSchema);
export default Drone;
