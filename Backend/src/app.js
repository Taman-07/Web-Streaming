require("dotenv").config(); 
const express = require("express");
const connectDB = require("./config/database");
const cors=require("cors");
const app = express();
const cookieParser=require("cookie-parser");

const authRouter=require("./routes/auth");

app.use(
    cors({
  origin: "http://localhost:5173",
  credentials: true,
})
);
app.use(express.json());


app.use("/", authRouter);

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

