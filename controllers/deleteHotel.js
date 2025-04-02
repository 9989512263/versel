const Hotel=require("../models/hotelModel");

const deleteHotel=async(req,res)=>{
    const {hotelId}=req.body;
    try{
        if(!hotelId){
            return res.status(400).json({message:"Enter the hotelId please"})
        }
        const hotel=await Hotel.findOne({hotelId});
        if(!hotel){
            return res.status(400).json({message:"It is not a valid hotel"});
        }
        await Hotel.deleteOne({ hotelId });

        return res.status(200).json({ message: "Hotel deleted successfully!" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting hotel", error: error.message });
    }
     
}
module.exports=deleteHotel;
