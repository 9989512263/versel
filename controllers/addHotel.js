const Hotel = require('../models/hotelModel');  
const User = require('../models/userModel');  

const addHotel = async (req, res) => {  
    const { name, location, description, stars, amenities, contact, admin } = req.body;  
    const hotelId = Math.floor(100000 + Math.random() * 900000);  

    try {  
        if(!name|| !location||!description||!stars||!amenities||!contact||!admin){
            return res.status(400).json({ message: "please enter all details " });  
        }
        const existingHotel = await Hotel.findOne({name});  
        if (existingHotel) {  
            return res.status(400).json({ message: "Hotel with this name already exists!" });  
        }  

        const adminUser = await User.findById(admin);  
        if (!adminUser) {  
            return res.status(400).json({ message: "Invalid admin! Admin does not exist." });  
        }  

        const newHotel = new Hotel({  
            name,  
            location,  
            description,  
            stars,  
            amenities,  
            contact,  
            admin,  
            hotelId  
        });  

        await newHotel.save();  
        return res.status(201).json({ message: "Hotel added successfully!", hotelId });  

    } catch (error) {  
        return res.status(500).json({ message: "Error adding hotel. Please try again!", error: error.message });  
    }  
};  

module.exports = addHotel;  
