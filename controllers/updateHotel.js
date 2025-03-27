const Hotel = require('../models/hotelModel');

const updateHotel = async (req, res) => {
    const { hotelId } = req.params;
    const { name, location, description, stars, amenities, contact, admin } = req.body;
    
    const hotel = await Hotel.findById(hotelId);
    try {
        if(!name|| !location||!description||!stars||!amenities||!contact||!admin){
            return res.status(400).json({ message: "please enter all details " });  
        }
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found!" });
        }

        hotel.name = name;
        hotel.location = location;
        hotel.description = description;
        hotel.stars = stars;
        hotel.amenities = amenities;
        hotel.contact = contact;
        hotel.admin = admin;

        await hotel.save();
        return res.status(200).json({ message: "Hotel updated successfully!", data: hotel });
    } catch (error) {
        res.status(500).json({ message: "Error updating hotel", error: error.message });
    }
};

module.exports =updateHotel ;
