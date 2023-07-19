require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const accountRoutes = require('./accounts');
const cors = require('cors');
const eventRoutes = require('./events');

// starts up express app
const app = express();

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
