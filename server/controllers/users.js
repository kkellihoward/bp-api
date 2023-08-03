import dotenv from "dotenv";
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

import { getTransporter } from "../other/mail.js";

dotenv.config();

export const createAccount = async (req, res) => {
    const {email, username, password} = req.body;

    const temp = await UserModal.findOne({email: email});

    if (temp)
    {
        res.status(400).json({message: "Account already exists"});
    }
    else
    {
	    // add doc to db
	    try {
	        const newUser = await UserModal.create({email, username, password});

	        const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "2h" });
		const verificationUrl = `${process.env.BASE_URL}/user/verify-email/${verificationToken}`;
		console.log(verificationToken);
		const transporter = await getTransporter();
		if (!transporter) return res.status(500).json({ message: "Could not create email transporter." });
		const mailOptions = {

			from: "Event Planner <bigproject4331@gmail.com>",
			to: email,
			subject: "Verify your email.",
			text: `Verify your email: ${verificationUrl}`,
			html: 	`<div>
					<a href='${verificationUrl}'>Verify your email.</a>
				 </div>`
		};

		const result = await transporter.sendMail(mailOptions);
		    
		if (!result) return res.status(500).json({ message: "Could not send verification email to user." });
		return res.status(200).json({ result, message: "Successfully signed up. Verify your email before logging in." });
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
		if (!user.isVerified) return res.status(403).json({ message: "User has not verified their email." });

		return res.status(200).json(user);

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

export const verifyEmail = async (req, res) => {

	try {

		const { verificationToken } = req.body;

		const payload = jwt.verify(verificationToken, process.env.JWT_SECRET);
		if (!payload.email) return res.status(401).json({ message: "Invalid verification token." });

		const user = await UserModal.findOne({ email: payload.email });
		if (!user) return res.status(400).json({ message: "Email not registered." });

		user.isVerified = true;
		await user.save();

		return res.status(200).json({ message: "Successfully verified email." });

	} catch (error) {

		console.log("Internal server error while verifying email:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};

export const resendVerificationEmail = async (req, res) => {

	try {

		const { email } = req.body;

		const user = await UserModal.findOne({ email });
		if (!user) return res.status(400).json({ message: "Email not registered." });
		
		const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "2h" });
		const verificationUrl = `${process.env.BASE_URL}/user/verify-email/${verificationToken}`;

		const transporter = await getTransporter();
		if (!transporter) return res.status(500).json({ message: "Could not create email transporter." });
		const mailOptions = {

			from: "Event Planner <bigproject4331@gmail.com>",
			to: email,
			subject: "Verify your email.",
			text: `Verify your email: ${verificationUrl}`,
			html: 	`<div>
						<a href='${verificationUrl}'>Verify your email.</a>
					</div>`
		};

		const result = await transporter.sendMail(mailOptions);
		if (!result) return res.status(500).json({ message: "Could not send verification email to user." });
		return res.status(200).json({ result, message: `Email verification link sent to ${email}.` });

	} catch (error) {

		console.log("Internal server error while resending verification email:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};
