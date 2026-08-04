const express=require("express");
const profileRouter=express.Router();
const bcrypt=require("bcrypt");
const userAuth = require("../middelware/auth");
const { validateEditData } =require("../utils/validation");

profileRouter.get("/profile/view", userAuth, (req,res)=>{
    try{
        // production level main bhi checks lagte hain sometimes what if middleware is changed
        const user=req.user;
        if(!user){
            throw new Error("Please log in again❗");
        }
        res.send(user);
    }
    catch(err){
        res.status(404).send("Error❗: " + err.message);
    }
});


profileRouter.patch("/profile/edit", userAuth, async(req,res)=>{
    try{
        if(!validateEditData(req)){
            return res.status(404).send("Sorry, but we cannot update your profile 😣");
        }
        const user=req.user;
        Object.keys(req.body).forEach(key=>{
            user[key]=req.body[key];
        });
        await user.save();
        res.json({message : `${user.username}, your profile is updated successfully 😊`, data: user});
    }
    catch(err){
        res.status(404).send("Error❗" + err.message);
    }
});


module.exports=profileRouter;