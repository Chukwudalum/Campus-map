// Location controller — handling CRUD for campus locations
import Location from '../models/Location.js';
import slugify from 'slugify';

// @desc     Get all locations
// @route    GET /api/locations
// @access   Public
export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find({});
    res.status(200).json({ locations });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching locations.' });
  }
};

// @desc     Get a specific location
// @route    GET /api/locations/:id
// @access   Public
export const getLocationById = async (req, res) => {
  const { id } = req.params;
  try {
    const location = await Location.findById(id);
    if (!location) return res.status(404).json({ message: 'Location not found' });
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching location.' });
  }
};

// @desc     Create a new location
// @route    POST /api/locations
// @access   Private (Admin)
export const createLocation = async (req, res) => {
  const { name, latitude, longitude, category } = req.body;

  try {
    const slug = slugify(name, { lower: true });
    const newLocation = await Location.create({ name, latitude, longitude, category, slug });
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(400).json({ message: 'Error creating location.' });
  }
};

// @desc     Update a location
// @route    PUT /api/locations/:id
// @access   Private (Admin)
export const updateLocation = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedLocation = await Location.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedLocation) return res.status(404).json({ message: 'Location not found' });
    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(400).json({ message: 'Error updating location.' });
  }
};

// @desc     Delete a location
// @route    DELETE /api/locations/:id
// @access   Private (Admin)
export const deleteLocation = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Location.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ message: 'Location not found' });
    res.status(204).json({ message: 'Location deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting location.' });
  }
};
