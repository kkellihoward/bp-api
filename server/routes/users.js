import express from 'express';

import {
	createAccount,
	signin,
	getAccount,
	updateAccount
} from '../controllers/users.js';

const router = express.Router();

router.post('/createAccount', createAccount);
router.post('/signin', signin);

router.get('/getAccount', getAccount);
router.get('/updateAccount', updateAccount);

export default router;
