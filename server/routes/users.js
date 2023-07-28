import express from 'express';

import {
	createAccount,
	signin,
	getAccounts,
	updateAccount
} from '../controllers/users.js';

const router = express.Router();

router.post('/createAccount', createAccount);
router.post('/signin', signin);

router.get('/getAccounts', getAccounts);
router.patch('/updateAccount/:id', updateAccount);

export default router;
