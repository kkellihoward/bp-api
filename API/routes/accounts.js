import express from 'express';
import {
    createAccount,
    getAccounts,
    login,
    deleteAccount,
    updateAccount
} from './accountController.js';

const router = express.Router();

// GET all accounts
router.get('/', getAccounts);

// GET a single account
router.get('/login', login);

// POST a new account
router.post('/signup', createAccount);

// DELETE an account
router.delete('/:id', deleteAccount);

// UPDATE an account
router.patch('/:id', updateAccount);

module.exports = router;
