const Flight = require("../models/Flight");
const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//flight search
router.post("/flight-searched",async (req,res)=>{
  try{
      const from= await Flight.find({from:req.body.from});

      if(from.length>0){
          const to= await Flight.find({to:req.body.to});
          if(to.length>0){

            
              res.status(200).json(to);
              
          }
          else{
              res.status(400).json("flight is not available");
          }
      }
      else{
          res.status(404).json("flight is not available");
      }
      
      

  }catch(err){
      console.log(err);
      res.status(500).json(err)
  }
});




router.put("/booked/:id", async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if(flight.availableseat>0){
      const user=await User.findOne({username:req.body.username})
      console.log(Bookedflight);
      await flight.updateOne({ $set: { availableseat: flight.availableseat-1 } });
      await user.updateOne({ $push: { Bookedflight: flight._id } });
      res.status(200).json("success");
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports=router