const mongoose =require( "mongoose");

mongoose.connect("mongodb+srv://Saksham86:Saksham%4010@cluster0.1g1nlwv.mongodb.net/paytm");

const UserSchema={
    firstName: String,lastName:String,username:String,password:String
}

const User=mongoose.model("User",UserSchema);

module.exports={User};



