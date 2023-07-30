import dotenv from "dotenv";
import UserModal from "../models/user.js";
import mongoose from 'mongoose';

dotenv.config();

export const createAccount = async (req, res) => {
    const {email, username, password} = req.body;

    const temp = await UserModal.findOne({email: email});

    if (temp)
    {
        res.status(400).json({error: "Account already exists"});
    }
    else
    {
	    // add doc to db
	    try {
	        const newUser = await UserModal.create({email, username, password});
	        res.status(200).json(newUser);
	    } catch (error) {
	        res.status(400).json({error: error.message});
	    }
    }
};
export const signin = async (req, res) => {

	try {

		const { email, password } = req.body;

		console.log('email: ', email)
		
		const user = await UserModal.findOne({ email });
		if (!user) return res.status(400).json({ message: "Email does not belong to an existing user." });
		
		// const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (password !== user.password ) return res.status(401).json({ message: "Invalid credentials." });

		return res.status(200).json({user.username});

	} catch (error) {

		console.log("Internal server error during sign in:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};

// get all accounts
export const getAccounts = async (req, res) => {
    const account = await UserModal.find({}).sort({createdAt: -1});

    res.status(200).json(account);
};

// update an account
export const updateAccount = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Account does not exist'});
    }

    const account = await UserModal.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if (!account) {
        return res.status(404).json({error: 'Account does not exist'});
    }

    res.status(200).json(account);
};
