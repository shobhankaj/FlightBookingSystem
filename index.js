const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const morgan = require("morgan");
const helmet=require("helmet");
const userRoute=require("./routes/user");
const authRoute=require("./routes/auth");
const adminRoute=require("./routes/admin");
const cors = require('cors')

dotenv.config();

connectToMongo=async()=>{ 
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected")
}
connectToMongo();
//middleware
app.use(cors())
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/user",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/admin",adminRoute);


app.listen(8500,()=>{
    console.log("Backend server is running")
})