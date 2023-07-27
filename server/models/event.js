import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    host_id: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: false
    }
}, {timestamps: true});

export default mongoose.model('Event', eventSchema);
