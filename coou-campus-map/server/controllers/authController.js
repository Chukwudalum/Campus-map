// Auth Controller with JWT for admin authorization
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc     Admin login
// @route    POST /api/auth/login
// @access   Public
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
};

// @desc     Get current user profile
// @route    GET /api/auth/profile
// @access   Private
export const getProfile = (req, res) => {
  res.status(200).json(req.user);
};
