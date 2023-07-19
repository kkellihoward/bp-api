import Account from './accountModel.js';
import mongoose from 'mongoose';

// get all accounts
const getAccounts = async (req, res) => {
    const account = await Account.find({}).sort({createdAt: -1});

    res.status(200).json(account);
}

// get a single account
const getAccount = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Account does not exist'});
    }

    const account = await Account.findById(id);

    if (!account) {
        return res.status(404).json({error: 'Account does not exist'});
    }

    res.status(200).json(account);
}

// create a new account
const createAccount = async (req, res) => {
    const {username, password} = req.body;

    // add doc to db
    try {
        const account = await Account.create({username, password});
        res.status(200).json(account);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

// delete an account
const deleteAccount = async (req, res) =>{
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Account does not exist'});
    }

    const account = await Account.findOneAndDelete({_id: id});

    if (!account) {
        return res.status(404).json({error: 'Account does not exist'});
    }

    res.status(200).json(account);
}

// update an account
const updateAccount = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Account does not exist'});
    }

    const account = await Account.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if (!account) {
        return res.status(404).json({error: 'Account does not exist'});
    }

    res.status(200).json(account);
}

module.exports = {
    getAccounts,
    getAccount,
    createAccount,
    deleteAccount,
    updateAccount
};
