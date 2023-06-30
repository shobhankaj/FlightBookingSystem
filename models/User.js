const mongoose=require("mongoose");
const UserScheme = new mongoose.Schema(
    {
    fullname:{
        type:String,
        required:true,
        min:5,
        max:20,
    },
    username:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String ,
        required:true,
        max:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    Bookedflight:{
        type:Array,
        default:[]
    },
    

},
{
    timestamps:true
}

);
module.exports=mongoose.model("user",UserScheme)