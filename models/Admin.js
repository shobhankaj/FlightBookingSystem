const mongoose=require("mongoose");
const AdminScheme = new mongoose.Schema(
    {
    fullname:{
        type:String,
        required:true,
        min:5,
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
    Addedflight:{
        type:Array,
        default:[]
    },
    

},
{
    timestamps:true
}

);
module.exports=mongoose.model("admin",AdminScheme)