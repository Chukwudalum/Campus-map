// Routes for managing campus locations
import express from 'express';
import {
  getLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation
} from '../controllers/locationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getLocations) // Get all locations
  .post(protect, createLocation); // Add new location

router.route('/:id')
  .get(getLocationById) // Get single location by ID
  .put(protect, updateLocation) // Update location
  .delete(protect, deleteLocation); // Delete location

export default router;
