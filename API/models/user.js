import mongoose from 'mongoose';

const userSchema = mongoose.Schema({

    email: {
		type: String,
		unique: true,
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
	}
});

export default mongoose.model('Users', userSchema);