import mongoose from 'mongoose';
const memberSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    year: String,
    branch: String,
    totalEventsRegistered: { type: Number, default: 0 },
});
const MemberModel = mongoose.models.members || mongoose.model('members', memberSchema);

export default MemberModel;