import express from 'express';
import {
    createAccount,
    getAccounts,
    login,
    deleteAccount,
    updateAccount
} from '../accountController.js';
import bodyParser from 'body-parser';
import Account from '../accountModel.js';

const jsonParser = bodyParser.json(); 

const accountRoutes = express.Router();

// GET all accounts
accountRoutes.get('/getaccounts', getAccounts);

// GET a single account
accountRoutes.post('/login', jsonParser, (req, res) => {
    console.log(req.body);
    
    const { username, password } = req.body;
    console.log("Received username:", username); // Add this log to check the received data
    console.log("Received password:", password);
    
    const user = await Account.findOne({ username });

    if (user) {
        if (password === user.password) {
            console.log(user.password + "and" + password);
            return res.status(200).json({ message: 'You have been successfully logged in! ' + String(user.username) + ' ' + String(user.password) + ' ' + String(username) + ' ' + String(password) + ' ' + req.body });
        } else if (password !== user.password) {
            return res.status(401).json({ error: 'Incorrect password' });
        }
    } else {
        // return res.status(400).json({ error: String(JSON.parse(req.body)) });
        return res.status(400).json({ error: 'Account does not exist' + ' ' + String(username) + ' ' + String(password) });
    }
});

// POST a new account
accountRoutes.post('/signup', createAccount);

// DELETE an account
accountRoutes.delete('/:id', deleteAccount);

// UPDATE an account
accountRoutes.patch('/:id', updateAccount);

export default accountRoutes;
