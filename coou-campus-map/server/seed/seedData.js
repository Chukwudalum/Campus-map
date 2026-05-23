// Sample data seeding script for locations and categories
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Location from '../models/Location.js';
import Category from '../models/Category.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    // Seed categories
    const categories = [
      { name: 'Faculty' },
      { name: 'Department' },
      { name: 'Office' },
      { name: 'Administration' },
      { name: 'Lecture Hall' },
      { name: 'Hostel' },
      { name: 'Cafeteria' },
      { name: 'Library' },
      { name: 'Medical Center' },
      { name: 'ICT Center' },
      { name: 'Security Post' },
      { name: 'Bus Stop' },
      { name: 'Road' },
      { name: 'Other' },
    ];

    await Category.insertMany(categories);
    console.log('Categories seeded');

    // Sample locations
    const locations = [
      { name: 'Arts Faculty', latitude: 5.9742, longitude: 6.7642, category: 'faculty' },
      { name: 'ICT Center', latitude: 5.9713, longitude: 6.7664, category: 'ict' },
      // Add more locations as needed
    ];

    await Location.insertMany(locations);
    console.log('Locations seeded');

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();

