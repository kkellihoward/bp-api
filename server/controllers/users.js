import dotenv from "dotenv";
import UserModal from "../models/user.js";
import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import SessionModal from "../models/session.js";
import { generateToken } from "../other/token.js";
import { getTransporter } from "../other/mail.js";

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
		const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "2h" });
		const verificationUrl = `${process.env.BASE_URL}/user/verify-email/${verificationToken}`;

		const transporter = await getTransporter();
		if (!transporter) return res.status(500).json({ message: "Could not create email transporter." });
		const mailOptions = {

			from: "Event Manager <cop4331cproject2@gmail.com>",
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

			from: "Event Manager <cop4331cproject2@gmail.com>",
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

export const tryReset = async (req, res) => {

	try {

		const { email } = req.body;

		const user = await UserModal.findOne({ email });
		if (!user) return res.status(400).json({ message: "Email not registered." });
		
		const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "30m" });
		const resetUrl = `${process.env.BASE_URL}/user/reset-password/${verificationToken}`;

		const transporter = await getTransporter();
		if (!transporter) return res.status(500).json({ message: "Could not create email transporter." });
		const mailOptions = {

			from: "Event Manager <cop4331cproject2@gmail.com>",
			to: email,
			subject: "Reset your password.",
			text: `Verify your email: ${resetUrl}`,
			html: `<div><a href='${resetUrl}'>Reset your password.</a></div>`
		};

		const result = await transporter.sendMail(mailOptions);
		if (!result) return res.status(500).json({ message: "Could not send email for password recovery." });
		return res.status(200).json({ result, message: `Password reset link sent to ${email}.` });

	} catch (error) {

		console.log("Internal server error while trying to reset password:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};

export const resetPassword = async (req, res) => {

	try {

		const { verificationToken, password } = req.body;
		
		const payload = jwt.verify(verificationToken, process.env.JWT_SECRET);
		if (!payload.email) return res.status(401).json({ message: "Invalid verification token." });

		const user = await UserModal.findOne({ email: payload.email });
		if (!user) return res.status(400).json({ message: "Email not registered." });
		
		user.password = password;
		await user.save();

		return res.status(200).json({ message: "Successfully reset password." });

	} catch (error) {

		console.log("Internal server error during authentication:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};
