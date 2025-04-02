const mongoose = require("mongoose");
const validator=require("validator")

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  amenities: {
    type: [String],
    required: true,
    validate: {
      validator: function (value) {
        return value.length > 0;
      },
      message: "At least one amenity is required.",
    },
  },
  contact: { 
    type: String, 
    required: true, 
    validate: {
        validator: (value) => validator.isMobilePhone(value, 'any'),
        message: (props) => `${props.value} is not a valid phone number!`
    }
},
  adminId: {
    type: String, 
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  hotelId: {
    type: String,
    unique: true, 
    required: true,
  },
});

module.exports = mongoose.model("Hotel", hotelSchema);
