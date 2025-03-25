const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true, 
    unique: true, 
  },
  roomType: {
    type: String,
    required: true,
    enum: ['single', 'double', 'suite', 'penthouse'], 
  },
  price: {
    type: Number,
    required: true, 
    min: 0,         
  },
  status: {
    type: String,
    required: true,  
    enum: ['available', 'booked', 'maintenance'], 
    default: 'available'
  },
  created_at: {
    type: Date,
    default: Date.now, 
  },
});

const hotelSchema = new mongoose.Schema({
  hotelId: {
    type: String,
    required: true, 
    unique: true,  
  },
  name: {
    type: String,
    required: true, 
  },
  location: {
    type: String,
    required: true, 
  },
  description: {
    type: String,
  },
  adminId: {
    type: String,
    required: true, 
    unique: true,
  },
  rooms: [roomSchema],  // Rooms as sub-documents
  created_at: {
    type: Date,
    default: Date.now, 
  }
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
