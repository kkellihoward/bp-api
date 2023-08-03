import express from 'express';

import {
	createAccount,
	signin,
	getAccounts,
	updateAccount,
	verifyEmail,
	resendVerificationEmail,
} from '../controllers/users.js';

const router = express.Router();

router.post('/createAccount', createAccount);
router.post('/signin', signin);
router.get('/getAccounts', getAccounts);
router.patch('/updateAccount/:id', updateAccount);
router.get('/verify-email', verifyEmail);
router.get('/resend-verification-email', resendVerificationEmail);

export default router;
