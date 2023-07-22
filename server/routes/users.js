import express from 'express';

import { authenticate, finish } from '../middleware/auth.js';

import {
	signup,
	signin,
	signout,
	verifyEmail,
	resendVerificationEmail,
	tryReset,
	resetPassword,
} from '../controllers/users.js';

const router = express.Router();

router.post('/validate-access', authenticate, finish);

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.post('/verify-email', verifyEmail);
router.post('/resend-verification-email', resendVerificationEmail);
router.post('/try-reset', tryReset);
router.post('/reset-password', resetPassword);

export default router;