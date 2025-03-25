const Booking=require('../models/bookingsModel');
const rooms=require("../models/hotelModel");
const User=require("../models/userModel");
const nodemailer=require("nodemailer");



const bookRoom=async(req,res)=>{
    const {roomNumber,userId,roomId,hotelId,checkIn,checkOut,roomType}=req.body;
    if(!roomNumber||!userId||!roomId||!hotelId||!checkIn||!checkOut){
        return res.status(400).json({message:"please enter all details"});
    }
    const user=await User.findOne({userId});

    if(!user){
        return res.status(400).json({message:"He is not a valid user to book a room "});
    }
    const room = await rooms.findOne({ roomId });
    if (!room) {
        return res.status(400).json({ message: "Room not available with the provided roomId" });
    }
    if (room.status !== 'available') {
        return res.status(400).json({ message: `Room is currently ${room.status}, please select a different room` });
    }
    const bookingId = Math.floor(100000 + Math.random() * 900000); 

    const transPorter=nodemailer.createTransport({
        service:'gmail',
        auth:{
             user:'kirankumaruradi@gmail.com',
            pass:'meaq hxrt ipox cgtv'
        }
    })
    const mailOptions={
        from:"kirankumaruradi@gmail.com",
        to:user.email,
        subject:"Your Reservation is Confirmed! We Can’t Wait to Host You!",
        html: `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f9;
                        margin: 0;
                        padding: 0;
                    }
                    .email-container {
                        width: 80%;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #4CAF50;
                        text-align: center;
                    }
                    p {
                        font-size: 16px;
                        line-height: 1.5;
                    }
                    .booking-details {
                        margin: 20px 0;
                        padding: 10px;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        background-color: #f9f9f9;
                    }
                    .booking-details p {
                        margin: 5px 0;
                    }
                    .footer {
                        text-align: center;
                        padding-top: 20px;
                        font-size: 14px;
                        color: #888;
                    }
                    .btn {
                        display: inline-block;
                        background-color: #4CAF50;
                        color: white;
                        padding: 10px 20px;
                        text-decoration: none;
                        border-radius: 5px;
                        margin-top: 20px;
                    }
                    .btn:hover {
                        background-color: #45a049;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <h1>Your Booking Confirmation</h1>
                    <p>Dear ${user.name},</p>
                    <p>We are excited to confirm your reservation at Book My Stay!</p>
                    <div class="booking-details">
                        <p><strong>Booking ID:</strong> ${bookingId}</p>
                        <p><strong>Hotel ID:</strong> ${hotelId}</p>
                        <p><strong>Room Number:</strong> ${roomNumber}</p>
                        <p><strong>Room Type:</strong> ${roomType}</p>
                        <p><strong>Check-In:</strong> ${checkIn}</p>
                        <p><strong>Check-Out:</strong> ${checkOut}</p>
                    </div>
                    <p>Thank you for choosing Book My Stay. We look forward to hosting you. If you have any further questions or requests, feel free to contact us.</p>
                    <a href="https://www.bookmystay.com" class="btn">Visit Our Website</a>
                    <div class="footer">
                        <p>Book My Stay, 1234 Main Street, City, Country</p>
                        <p>If you did not make this booking, please contact our support team immediately.</p>
                    </div>
                </div>
            </body>
        </html>
        `
        
    }

    try{
        const newbooking=new Booking({              
            roomNumber,
            userId:user.userId,
            roomId:room.roomId,
            hotelId:room.hotelId,
            checkIn,
            checkOut,
            bookingId,
            roomType:room.roomType,
        })
        await newbooking.save();

        room.status = 'booked';
        await room.save();
        transPorter.sendMail(mailOptions,(error,info)=>{
            if(error){
                return res.status(400).json({message:"Error in sending email"}); 
            }
            else{
                return res.status(200).json({message:"booking success further details will be shared to your mail","bookingId":bookingId});
            }
        })
      

    }catch(error){
        return res.status(400).json({message:"Error while booking a room  ",error:error.message});
    }

}

module.exports=bookRoom;