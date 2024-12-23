import mongoose from 'mongoose';

const trophySchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    odds: { type: Number, required: true }
});

const Trophy = mongoose.model('Trophy', trophySchema);

export default Trophy;
