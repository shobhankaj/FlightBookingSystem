const mongoose=require("mongoose");
const FlightScheme = new mongoose.Schema(
    {
    flightname:{
        type:String,
        required:true,
        min:5,
        max:20,
    },
    flightno:{
        type:String,
        required:true,
        min:5,
        max:20,
    },
    from:{
        type:String ,
        required:true,
        max:50,

    },
    to:{
        type:String,
        required:true,
        min:6
    },
    day:{
        type:Array,
        default:[],
    },
    availableseat:{
        type:Number,
        default:60,
    }
    
    

},
{
    timestamps:true
}

);
module.exports=mongoose.model("flight",FlightScheme)