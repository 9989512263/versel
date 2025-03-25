const express=require("express");
const { signUp } = require("./controllers/signUp");
const addingRoomData=require("./controllers/availableRooms");
const {getAllRooms}=require("./controllers/getallrooms");
const bookRoom = require("./controllers/bookRoom");
const { createHotel } = require("./controllers/hotel");
const getAllUsers = require("./controllers/getallUsers");
const { adminsignUp } = require("./controllers/adminsignup");




const router=express.Router();





//user module
router.post("/signup",signUp);
router.get("/getallusers",getAllUsers);
router.post("/addroom",addingRoomData)
router.get("/getallrooms",getAllRooms)
router.post("/bookroom",bookRoom);
router.post("/adminsignup",adminsignUp);
router.post("/createHotel",createHotel);



module.exports=router;

