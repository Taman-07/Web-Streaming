const mongoose = require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");
const brcypt=require("bcrypt");
const userSchema=mongoose.Schema({
    username:{
        type: String,
        required: true,
        lowercase: true,
        minLength: 5,
        maxLength: 20,
    },
    emailId: {
        type:String,
        required: true,
        lowercase: true,
        trim:true,
        unique: true,
        minLength: 5,
        maxLength: 40,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please use a valid email address");
            }
        }
    },
    password:{
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please use Strong Password");
            }
        }
    },
    profilePic:{
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7VjzasgtGD6gx2VTGZo1NJ7zNwIKSj4p-OvPupKb9dg&s=10",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Enter a valid Photo URL");
            }
        }
    },
    bio:{
        type: String,
        default: "This is the default bio",
    },
    dateOfBirth: {
        type: Date,
        validate(value){
            if(value>new Date()){
                throw new Error("Date cannot be written for the future");
            }
        }
    },
},
{
    timestamps: true,
});

// ek jwt token banu usko cookie mai dall kai bhejun
userSchema.methods.getJWT=async function(){
    const user=this;
    const token=jwt.sign({_id:user.id},process.env.JWT_SecretKey,{expiresIn :"1d"});
    return token;
}
userSchema.methods.validatePassword=async function(password){
    const user=this;
    const isPasswordValid=await brcypt.compare(password,user.password);
    return isPasswordValid;
}
const User=mongoose.model("User", userSchema);
module.exports=User;
