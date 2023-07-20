import Account from './accountModel.js';
import mongoose from 'mongoose';

// get all accounts
export const getAccounts = async (req, res) => {
    const account = await Account.find({}).sort({createdAt: -1});

    res.status(200).json(account);
}

// get a single account
export const login = async (req, res) => {
    // const { username, password } = req.body;
    // console.log("Received username:", username); // Add this log to check the received data
    // console.log("Received password:", password);

    const urlParams = new URLSearchParams(req.url.split('?')[1]);
    const parameters = {};

    for (const [key, value] of urlParams) {
        parameters[key] = value;
        console.log("value: ", String(value))
    }
    
    // return res.status(300).json({ error: parameters['username'] });
    
    const user = await Account.findOne({ username: parameters['username'] });

    if (user) {
        if (parameters['password'] === user.password) {
            console.log(user.password + "and" + password);
            return res.status(200).json({ message: 'You have been successfully logged in!' });
        } else if (parameters['password'] !== user.password) {
            return res.status(401).json({ error: 'Incorrect password' });
        }
    } else {
        // return res.status(400).json({ error: String(JSON.parse(req.body)) });
        return res.status(400).json({ error: 'Account does not exist'});
    }
};

// create a new account
export const createAccount = async (req, res) => {
    const {username, password} = req.body;

    const urlParams = new URLSearchParams(req.url.split('?')[1]);
    const parameters = {};

    for (const [key, value] of urlParams) {
        parameters[key] = value;
        console.log("value: ", String(value))
    }

    // add doc to db
    try {
        const account = await Account.create({username: parameters['username'], password: parameters['password'], email: parameters['email'], phone: parameters['phone']});
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
