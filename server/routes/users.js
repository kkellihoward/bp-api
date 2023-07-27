import express from 'express';

import {
	createAccount,
	signin,
} from '../controllers/users.js';

const router = express.Router();

router.post('/createAccount', createAccount);
router.post('/signin', signin);

export default router;
