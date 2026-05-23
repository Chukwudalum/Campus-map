import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  category: { type: String, enum: [
      'faculty', 'department', 'office', 'admin',
      'lecture_hall', 'hostel', 'cafeteria', 'library',
      'medical', 'ict', 'security', 'bus_stop', 'road', 'other'
    ], required: true },
}, { timestamps: true });

const Location = mongoose.model('Location', locationSchema);
export default Location;
