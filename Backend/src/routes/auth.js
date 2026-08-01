const express=require("express");
const authRouter=express.Router();

const validateSignupData=require("../utils/validation");
const User=require("../models/user");

authRouter.post("/signup", async (req,res)=>{
    const data=req.body;
    try{
        validateSignupData(req);
        const {username,emailId,password,profilePic,bio,dateOfBirth}=req.body;

        const user=new User({
            username,
            emailId,
            password,
            profilePic,
            bio,
            dateOfBirth,
        });

        const savedUser=await user.save();

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
            throw new Error("Invalid credentials")
        }

        const isPasswordValid=await user.validatePassword(password);

        if(isPasswordValid){
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

authRouter.post("/logout", async(req, res)=>{
    res.send("Logout successfully❗");
});


module.exports=authRouter;