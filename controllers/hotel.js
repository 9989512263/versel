const Hotel = require('../models/hotelModel');  

exports.createHotel = async (req, res) => {
  try {
    const { name, location, description, adminId,hotelId } = req.body;


    if (!name || !location || !adminId) {
      return res.status(400).json({ message: 'Please provide all required details: name, location, adminId' });
    }

    // Check if the adminId already manages a hotel
    const existingHotel = await Hotel.findOne({ adminId });
    if (existingHotel) {
      return res.status(400).json({ message: 'This admin already manages a hotel' });
    }

    const newHotel = new Hotel({
      name,
      location,
      description,
      adminId,
      hotelId,
    });

    await newHotel.save();
    res.status(201).json({ message: 'Hotel created successfully', newHotel });
  } catch (error) {
    res.status(500).json({ message: 'Error creating hotel', error: error.message });
  }
};
