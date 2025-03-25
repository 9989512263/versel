const mongoose=require("mongoose");

const dbConfig=async()=>{

    try{
        const connect=await mongoose.connect("mongodb://localhost:27017/BookMyStay");
        console.log("connected sucessfully");
    }catch(erorr){
        console.log("error in connecting ");
    }

}

module.exports=dbConfig
