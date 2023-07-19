const mongoose = require('mongoose');

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
    }
    hosted_event_ids: [{
        type: String,
        required: false
    }],
    invited_event_ids: [{
        type: String,
        required: false
    }]
}, {timestamps: true});

module.exports = mongoose.model('Account', accountSchema);
