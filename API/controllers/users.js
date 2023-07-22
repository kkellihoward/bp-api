import UserModal from "../models/user.js";

import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



// get all accounts
dotenv.config();

// get a single account
export const signup = async (req, res) => {

	try {

		const { user, password } = req.body;

		    // add doc to db
		        const user1 = await UserModal.create({ user, password });
		        res.status(200).json(user);

		// return res.status(200).json({ message: "Email: " + email + ", password: " + password});
		
		// const user = await UserModal.findOne({ email });
		// if (user) return res.status(400).json({ message: "Email already belongs to an existing user." });

		// // const hashedPassword = await bcrypt.hash(password, 11);
		// const newUser = await UserModal.create({ email, password });
		// if (!newUser) return res.status(500).json({ message: "User could not be added to database." });

		// const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "2h" });
		// const verificationUrl = `${process.env.BASE_URL}/user/verify-email/${verificationToken}`;

		// const transporter = await getTransporter();
		// if (!transporter) return res.status(500).json({ message: "Could not create email transporter." });
		// const mailOptions = {

		// 	from: "Chordeographer <chordeographer.official@gmail.com>",
		// 	to: email,
		// 	subject: "Verify your email.",
		// 	text: `Verify your email: ${verificationUrl}`,
		// 	html: 	`<div>
		// 				<img src="https://i.imgur.com/9CSWeNf.gif" alt="imgur gif" />
		// 				<a href='${verificationUrl}'>Verify your email.</a>
		// 			</div>`
		// };

		// const result = await transporter.sendMail(mailOptions);
		// if (!result) return res.status(500).json({ message: "Could not send verification email to user." });
		return res.status(200).json({ result, message: "Successfully signed up." });

	} catch (error) {

		console.log("Internal server error during sign up:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};

export const signin = async (req, res) => {

	try {

		const { user, password } = req.body;

		
		const user1 = await UserModal.findOne({ user });
		if (!user1) return res.status(400).json( { message: "Email does not belong to an existing user." });
		
		// const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (password !== user1.password ) return res.status(401).json(user1,{ message: "Invalid credentials." });

		// if (!user.isVerified) return res.status(403).json({ message: "User has not verified their email." });
		// await SessionModal.findByIdAndDelete(user._id);

		// let authToken = "";
		// do { authToken = generateToken(69); }
		// while (await SessionModal.findOne({ authToken }));

		// const session = await SessionModal.create({ _id: user._id, ip, authToken });
		// if (!session) return res.status(500).json({ message: "Could not create logged in session for user." });
		// await UserModal.findByIdAndUpdate(user._id, { lastLogin: Date.now() });

		// return res.status(200).json({ authToken });

		return res.status(200).json(user1,{ message: "You are now logged in!" })

	} catch (error) {

		console.log("Internal server error during sign in:", error.message);
		return res.status(500).json({ message: "Internal server error: " + error.message });
	}
};
