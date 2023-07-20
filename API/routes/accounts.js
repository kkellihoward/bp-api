import express from 'express';
import {
    createAccount,
    getAccounts,
    login,
    deleteAccount,
    updateAccount
} from '../accountController.js';
import bodyParser from 'body-parser';

const jsonParser = bodyParser.json(); 

const accountRoutes = express.Router();

// GET all accounts
accountRoutes.get('/getaccounts', getAccounts);

// GET a single account
accountRoutes.post('/login', jsonParser, login);

// POST a new account
accountRoutes.post('/signup', createAccount);

// DELETE an account
accountRoutes.delete('/:id', deleteAccount);

// UPDATE an account
accountRoutes.patch('/:id', updateAccount);

export default accountRoutes;
