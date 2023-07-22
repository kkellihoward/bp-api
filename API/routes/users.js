import express from 'express';
import {
    signup,
    signin,
} from '../controllers/users.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
// router.post('/signout', signout);
// router.post('/verify-email', verifyEmail);
// router.post('/resend-verification-email', resendVerificationEmail);
// router.post('/try-reset', tryReset);
// router.post('/reset-password', resetPassword);

export default router;
