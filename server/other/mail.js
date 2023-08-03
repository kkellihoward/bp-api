import nodemailer from "nodemailer";

export async function getTransporter() {
	try {
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
   			port: 465,
    			secure: true,
			auth: {
				
				user: 'bigproject4331@gmail.com',
				pass: 'ekxtljcqxenjeajx'
			}
		});
		
		return transporter;

	} catch (error) {

		console.log("Internal server error while creating nodemailer transporter:", error.message);
		return null;
	}
}
