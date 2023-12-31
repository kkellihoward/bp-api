import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    	email: {
		type: String,
		unique: true,
		required: true,
	},
	username: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
        lastLogin: {
		type: Date,
		default: Date.now(),
	},
    	hosted_event_ids: [{
        	type: String,
        	required: false
    	}]
});

export default mongoose.model('Users', userSchema);
