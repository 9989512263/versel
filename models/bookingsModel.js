const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { 
    // type: mongoose.Schema.Types.ObjectId, 
    // ref: "User",  
    type:String,
    required: true
  },
  checkIn: { 
    type: Date, 
    required: true
  },
  checkOut: { 
    type: Date, 
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  roomNumber:{
    type: Number, 
    required:true
  },
  bookingId:{
    type:String,
    required:false
  },
  hotelId:{
    type: String,
    required: true
  },
  roomId:{
    type:String,
    required:true
  },
  roomType: {
    type: String,
    required: true,  
    enum: ['single', 'double', 'suite', 'penthouse'],  
},
status:{
    type:String,
    required:false,
    enum:['confirmed','pending','cancelled'],default:"confirmed"
}
});




module.exports = mongoose.model("Booking", bookingSchema);
