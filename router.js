const express=require("express");
const { signUp } = require("./controllers/userSignup");
const getAllUsers = require("./controllers/getallUsers");
const { adminsignUp } = require("./controllers/adminsignup");
const Signin = require("./controllers/Signin");
const addHotel = require("./controllers/addHotel");
const updateHotel = require("./controllers/updateHotel");
const getallHotels = require("./controllers/getallHotels");
const deleteHotel = require("./controllers/deleteHotel");
const addRoomToHotel = require("./controllers/addRoom");




const router=express.Router();




//user module
router.post("/signup",signUp);
router.get("/getallusers",getAllUsers);
router.post("/adminsignup",adminsignUp);
router.post("/signin",Signin);


//hotel module
router.post("/addhotel",addHotel);
router.post("/updateHotel",updateHotel);
router.get("/getallhotels",getallHotels);
router.delete("/deletehotel",deleteHotel);


//room module
router.post("/addroom",addRoomToHotel);

module.exports=router;

