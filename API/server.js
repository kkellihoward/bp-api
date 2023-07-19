require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const accountRoutes = require('./accounts');
const cors = require('cors');
const eventRoutes = require('./events');

// starts up express app
const app = express();
app.use(cors());

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
	next();
});

// routes
app.use('/accounts', accountRoutes);
app.use('/events', eventRoutes);


// connect to database
mongoose.connect(process.env.MONGO_URI)
	.then(() => {
		// listen for requests
		app.listen(process.env.PORT, () => {
    		console.log('connected to database and listening on port', process.env.PORT);
		});
	})
	.catch((error) => {
		console.log(error)
});
