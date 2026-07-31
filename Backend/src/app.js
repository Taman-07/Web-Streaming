const express = require("express");
const connectDB = require("./config/database");
const app = express();
require('dotenv').config();


app.use("/", (req, res)=>{
    res.send("Hello from the Server");
});



connectDB()
    .then(()=>{
        console.log("Database connection done");
        app.listen(process.env.PORT, () => {
            console.log("Server is listening");
        });
    })
    .catch((err)=>{
        console.log("Database is not connected");
    });

