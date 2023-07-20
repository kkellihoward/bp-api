import Account from './accountModel.js';
import mongoose from 'mongoose';

// get all accounts
export const getAccounts = async (req, res) => {
    const account = await Account.find({}).sort({createdAt: -1});

    res.status(200).json(account);
}

// get a single account
export const login = async (req, res) => {
    const { username, password } = req.body;
    console.log("Received username:", username); // Add this log to check the received data
      console.log("Received password:", password);
    const user = await Account.findOne({ username });

    if (user) {
        if (password === user.password) {
            console.log(user.password + "and" + password);
            return res.status(200).json({ message: 'You have been successfully lo in!' });
        } else if (password !== user.password) {
            return res.status(401).json({ error: 'Incorrect password' });
        }
    } else {
        return res.status(400).json({ error: 'Account does not exist' });
    }
};

// create a new account
export const createAccount = async (req, res) => {
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
export const deleteAccount = async (req, res) =>{
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
export const updateAccount = async (req, res) => {
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
