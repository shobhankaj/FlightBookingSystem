const router=require("express").Router();
const Flight=require("../models/Flight");
const Admin = require("../models/Admin");



//add  flight
router.post("/add-flight" , async (req,res)=>{
    const newflight = new Flight(req.body);
    try{
        const savedflight = await newflight.save();
        res.status(200).json(savedflight);
    }catch(err){
        res.status(500).json(err);
    }
})

//delete flight
router.delete("/flight-delete/:id",async(req,res)=>{
  console.log(req.params.id);
  const flight =await Flight.findById(req.params.id);
  if(flight){
    await flight.deleteOne();
             res.status(200).json("success")
  }
  else{
    res.status(403).json("flight is not exist")
}


});

  
//list of added flight

router.get("/list-flight", async (req, res) => {
    try {
      const list = await Flight.find();
      res.status(200).json(list);
      
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;