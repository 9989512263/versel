const Hotel = require('../models/hotelModel');

const getallHotels=async(req,res)=>{
    try{
        const hotels=await Hotel.find();
        return res.status(200).json({message:"hotels with their details ",hotels});
    }catch(error){
        return res.status(400).json({message:"Error in getting the details of hotels ",error:error.message})
    }
}
module.exports=getallHotels;