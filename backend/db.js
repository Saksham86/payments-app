const mongoose =require( "mongoose");

mongoose.connect("mongodb+srv://Saksham86:Saksham%4010@cluster0.1g1nlwv.mongodb.net/paytm");

const UserSchema=new mongoose.Schema({
    firstName:{type:String,trim:true,required:true} ,
    lastName:{type:String,required:true,trim:true},
    username:{type:String,required:true,trim:true,unique:true,lowercase:true},
    password:{type:String,required:true,trim:false}
})

const AccountSchema=new mongoose.Schema({

    userId: {type:Schema.Types.ObjectId,ref:"User",required:true},
    balance: {type:Number,required:true}
})

const User=mongoose.model("User",UserSchema);
const Accounts=mongoose.model("Accounts",AccountSchema);

module.exports={User,Accounts};



