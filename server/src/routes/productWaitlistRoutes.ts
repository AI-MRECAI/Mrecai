import express from 'express';
import { body } from 'express-validator';
import { createProductWaitlist } from '../controllers/productWaitlistController';
import { formLimiter } from '../middleware/rateLimiter';

const router = express.Router();

router.post(
  '/',
  formLimiter,
  [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address')
  ],
  createProductWaitlist
);

export default router;
