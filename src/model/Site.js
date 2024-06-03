import mongoose from 'mongoose';

const SiteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    site_name: { type: String, required: true },
    position: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    }
});

const Site = mongoose.model('Site', SiteSchema);
export default Site;
