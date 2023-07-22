import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './server/routes/users.js';

const app = express();
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// app.use('/user/signin', (req, res) => {
// 	const { email, password } = req.body;
// 	res.status(200).send({message: "I recieved an API call " + email + ' ' + password})
// });

app.get('/', (req, res) => {
	res.send('Yay');
});

app.use('/user', router);

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
