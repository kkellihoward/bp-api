import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { accountRoutes } from './API/routes/accounts.js';
import cors from 'cors';
import { eventRoutes } from './API/events.js';

console.log("in server");


// starts up express app
const app = express();
app.use(cors());

// middleware
app.use(express.json());


app.use((req, res, next) => 
{
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
	'Access-Control-Allow-Headers',
	'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader(
	'Access-Control-Allow-Methods',
	'GET, POST, PATCH, DELETE, OPTIONS'
	);
	next();
});


// routes
app.use('/accounts', accountRoutes);
app.use('/events', eventRoutes);

dotenv.config();


// connect to database
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => {
		// listen for requests
		app.listen(process.env.PORT, () => {
    		console.log('connected to database and listening on port', process.env.PORT);
		});
	})
	.catch((error) => {
		console.log(error)
});
