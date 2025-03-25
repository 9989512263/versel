const rooms = require("../models/hotelModel");


const getAllRooms = async (req,res) => {
    try {
        const rooms = await rooms.find();  // Fetch all rooms
        return res.status(200).json({ rooms });  
    }catch(error){
        return res.status(500).json({ message: "Error fetching rooms", error: error.message });

    }
};

module.exports = { getAllRooms };
