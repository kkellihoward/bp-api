import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
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
