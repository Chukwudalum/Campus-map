// Authentication-related routes
import express from 'express';
import {
  loginAdmin,
  getProfile,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin); // Admin login
router.get('/profile', protect, getProfile); // Get currently authenticated admin profile

export default router;
