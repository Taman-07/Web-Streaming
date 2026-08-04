const jwt=require("jsonwebtoken");
const User=require("../models/user");

// process → Node.js ka global object
// process.env → Environment variables ka object
// JWT_SECRET → Us object ke andar stored secret key

const userAuth=async(req,res,next)=>{
    try{
        const {token}=req.cookies;
        if(!token){
            return res.status(401).send("Please Login❗");
        }
        const decodedObj=jwt.verify(token, process.env.JWT_SecretKey);
        const {_id}=decodedObj;
        const user=await User.findById(_id);
        if(!user){
            throw new Error("Please Sign In❗");
        }
        req.user=user;
        next();
    }
    catch(err){
        if (err.name === "TokenExpiredError") {
            return res.status(401).send("Your session has expired. Please login again❗");
        }
        if (err.name === "JsonWebTokenError") {
            return res.status(401).send("Invalid authentication token❗");
        }
        res.status(401).send("Error❗" + err.message);
    }
};

module.exports=userAuth;