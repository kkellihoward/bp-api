import express from 'express';
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

router.post('/signin', login);
router.post('/signup', createAccount);
router.post('/signout', signout);
router.post('/verify-email', verifyEmail);
router.post('/resend-verification-email', resendVerificationEmail);
router.post('/try-reset', tryReset);
router.post('/reset-password', resetPassword);

export default router;
