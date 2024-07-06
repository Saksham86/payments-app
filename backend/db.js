const mongoose =require( "mongoose");

mongoose.connect("mongodb+srv://Saksham86:Saksham%4010@cluster0.1g1nlwv.mongodb.net/paytm");

const UserSchema={
    firstName:{type:String,trim:true,required:true} ,
    lastName:{type:String,required:true,trim:true},
    username:{type:String,required:true,trim:true,unique:true,lowercase:true},
    password:{type:String,required:true,trim:false}
}

const User=mongoose.model("User",UserSchema);

module.exports={User};



