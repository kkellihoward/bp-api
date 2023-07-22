import express from 'express';
import cors from 'cors';
const dotenv = require("dotenv");
//import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './server/routes/users.js';
const path = require('path');

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.get('/', (req, res) => {
	res.send('Yay');
});

app.use('/user', userRoutes);

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => {
		// listen for requests
		app.listen(process.env.PORT, () => {
    		console.log('connected to database and listening on port', process.env.PORT);
		});
	})
	.catch((error) => {
		console.log(error)
});