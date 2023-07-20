import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import accountRoutes from './API/routes/accounts.js';
import cors from 'cors';
import eventRoutes from './API/events.js';
import bodyParser from 'body-parser';

console.log("in server");


// starts up express app
const app = express();
app.use(cors());
// app.options('*', cors());

// middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
// app.use((req, res, next) => {
//     console.log('Received request:', req.method, req.url, req.params)
// });

app.get('/', (req, res) => {
    console.log('Received request:', req.method, req.url, req.query)
    res.end('it works!');
});

// app.use((req, res, next) => 
// {
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	res.setHeader(
// 	'Access-Control-Allow-Headers',
// 	'Origin, X-Requested-With, Content-Type, Accept, Authorization'
// 	);
// 	res.setHeader(
// 	'Access-Control-Allow-Methods',
// 	'GET, POST, PATCH, DELETE, OPTIONS'
// 	);
// 	next();
// });

// routes
app.use('/accounts', accountRoutes);
app.use('/events', eventRoutes);

dotenv.config();


// connect to database
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, dbName: 'BigProject'})
	.then(() => {
		// listen for requests
		app.listen(process.env.PORT, () => {
    		console.log('connected to database and listening on port', process.env.PORT);
		});
	})
	.catch((error) => {
		console.log(error)
});
