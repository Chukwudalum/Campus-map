// Category controller — handling categories for locations
import Category from '../models/Category.js';

// @desc     Get all categories
// @route    GET /api/categories
// @access   Public
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories.' });
  }
};

// @desc     Create a new category
// @route    POST /api/categories
// @access   Private (Admin)
export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error creating category.' });
  }
};
