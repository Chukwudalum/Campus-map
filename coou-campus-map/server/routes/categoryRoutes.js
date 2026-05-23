// Routes for managing categories
import express from 'express';
import {
  getCategories,
  createCategory,
} from '../controllers/categoryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getCategories) // Get all categories
  .post(protect, createCategory); // Admin: Add new category

export default router;
