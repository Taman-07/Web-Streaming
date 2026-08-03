const express=require("express");
const authRouter=express.Router();

const validateSignupData=require("../utils/validation");
const User=require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

authRouter.post("/signup", async (req,res)=>{
    const data=req.body;
    try{
        validateSignupData(req);
        const {username,emailId,password,profilePic,bio,dateOfBirth}=req.body;
        const hashedPassword=await bcrypt.hash(password,10);
        const user=new User({
            username,
            emailId,
            password:hashedPassword,
            profilePic,
            bio,
            dateOfBirth,
        });

        const savedUser=await user.save();

        const token=await savedUser.getJWT();
        res.cookie("token",token);

        res.json({message: "User Added Successfully 😁", data: savedUser});
    }
    catch(err){
        res.status(404).send("Error in creating user❗: " + " " + err.message);
    }
});

authRouter.post("/login", async(req, res)=>{
    try{
        const {emailId, password}=req.body;
        const user=await User.findOne({emailId : emailId});

        if(!user){
            throw new Error("Invalid credentials");
        }

        const isPasswordValid=await user.validatePassword(password);

        if(isPasswordValid){
            const token= await user.getJWT();
            res.cookie("token",token);
            res.send(user);
        }
        else{
            throw new Error("Invalid Credentials");
        }
    }
    catch(err){
        res.status(404).send("Error in Login user❗: " + err.message);
    }
});

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    });
    res.send("logout");
});


module.exports=authRouter;