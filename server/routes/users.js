import express from 'express';

import { authenticate, finish } from '../middleware/auth.js';

import {
	createAccount,
	signin,
	signout
} from '../controllers/users.js';

const router = express.Router();

router.post('/validate-access', authenticate, finish);

router.post('/createAccount', createAccount);
router.post('/signin', signin);

export default router;
