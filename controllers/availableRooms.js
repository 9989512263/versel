// const rooms = require("../models/hotelModel");
const User = require("../models/userModel");
const Hotel = require("../models/hotelModel");

const addingRoomData = async (req, res) => {
  const { roomId, hotelId, roomNumber, roomType, price, status, email } = req.body;

  if (!roomId || !hotelId || !roomNumber || !roomType || !price || !status || !email) {
    return res.status(400).json({ message: "Please enter all details" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No user found" });
    }

    if (user.role !== "admin") {
      return res.status(400).json({ message: "Unauthorized" });
    }

    const hotel = await Hotel.findById({hotelId});
    if (!hotel) {
      return res.status(400).json({ message: "Hotel not found" });
    }

    const newRoomData = new rooms({
      roomId,
      hotelId,
      roomNumber,
      roomType,
      price,
      status,
      email,
    });

    await newRoomData.save();
    return res.status(200).json({ message: "Room successfully added" });
  } catch (error) {
    return res.status(400).json({ message: "Error in adding data", error: error.message });
  }
};

module.exports = addingRoomData;
