const express = require('express');
const {
    createAccount,
    getAccounts,
    getAccount,
    deleteAccount,
    updateAccount
} = require('../controllers/accountController');

const router = express.Router();

// GET all accounts
router.get('/', getAccounts);

// GET a single account
router.get('/:id', getAccount);

// POST a new account
router.post('/', createAccount);

// DELETE an account
router.delete('/:id', deleteAccount);

// UPDATE an account
router.patch('/:id', updateAccount);

module.exports = router;