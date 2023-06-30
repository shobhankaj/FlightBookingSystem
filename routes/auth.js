const router = require("express").Router();
const User = require("../models/User")
const Admin = require("../models/Admin")
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv=require("dotenv");
dotenv.config();
router.post("/register",async (req,res)=>{
    const username= await User.findOne({username:req.body.username});
    console.log(username);
    if(username){
        res.json("usernameErr");
    }else{
        const email= await User.findOne({email:req.body.email})
        if(email){
            res.json("emailErr");
        }else{
            try{
                //generate new password
                const salt=await bcrypt.genSalt(10);
                const hashedpassword= await bcrypt.hash(req.body.password,salt);
                // create new user
                const newUser=new User({
                    fullname:req.body.fullname,
                    username:req.body.username,
                    email:req.body.email,
                    password:hashedpassword
                });
                // save user and respose
                const user=await newUser.save();
                res.status(200).json("success");
            }catch(err){
                res.status(500).json(err)
            }
        }
    }
    
});
//register Admin
router.post("/register/Admin",async (req,res)=>{
    
    try{
        //generate new password
        const salt=await bcrypt.genSalt(10);
        const hashedpassword= await bcrypt.hash(req.body.password,salt);
        // create new user
        const newUser=new Admin({
            fullname:req.body.fullname,
            email:req.body.email,
            password:hashedpassword
        });
        // save user and respose
        const user=await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err)
    }
    
});

//Login

router.post("/login",async (req,res)=>{
    try{
        const user= await User.findOne({username:req.body.username});

        if(user){
            const validPassword= await bcrypt.compare(req.body.password,user.password);
            if(validPassword){
                jwt.sign({user},process.env.JWT_KEY,{expiresIn:"2m"},(err,token)=>{
                    if(err){
                        res.json("token error")
                    }
                    else{
                        res.status(200).json(["success",token]);
                        // res.send({auth:token});
                    }
                })
                
                
            }
            else{
                res.status(400).json("Password is wrong");
            }
        }
        else{
            res.status(404).json("user not found");
        }
        
        

    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
});

//Login As Admin

router.post("/login/Admin",async (req,res)=>{
    try{
        const user= await Admin.findOne({email:req.body.email});

        if(user){
            const validPassword= await bcrypt.compare(req.body.password,user.password);
            if(validPassword){
                res.status(200).json("success");
                
            }
            else{
                res.status(400).json("Password is wrong");
            }
        }
        else{
            res.status(404).json("user not found");
        }
        
        

    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
});
module.exports=router