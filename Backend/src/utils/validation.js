const validator=require('validator');

const validateSignupData = (req) => {
    const {username, emailId, password} = req.body;

    if(!username){
        throw new Error("User name is not Valid");
    }

    else if(username.length<5 && username.length>20){
        throw new Error("First name should be 5 to 20 characters");
    }

    else if(!validator.isEmail(emailId)){
        throw new Error("Please use a valid email address");
    }

    else if(!validator.isStrongPassword(password)){
        throw new Error("Please use a strong password");
    }
};

module.exports=validateSignupData;