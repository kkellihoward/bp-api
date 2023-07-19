import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hosted_event_ids: [{
        type: String,
        required: false
    }],
    invited_event_ids: [{
        type: String,
        required: false
    }]
}, {timestamps: true});

export default mongoose.model('Account', accountSchema);
