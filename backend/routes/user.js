const express=require("express");
const zod=require ("zod");
const jwt=require("jsonwebtoken");
const {User}= require('../db');
const {JWT_SECRET}=require('../config');
const router=express.Router();


const signupBody=zod.object({

    username:zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()

})  

app.post('/signup', async (req,res)=>{
    
    
    try{
        signupBody.parse(req.body);

    }catch(e){

        res.status(411).json({
            message:"Email Already Taken / Invalid input"
        })

    }
    try{
        const user= await User.create({
            username:req.body.username,
            password:req.body.password,
            firstName:req.body.firstName,
            lastName:req.body.lastName
        })
    }catch(e){
        res.status(411).json({
            message:"Already taken / invalid"
        })
    }

    const userId=user._id;

    const token=jwt.sign(userId,JWT_SECRET);

    res.json({
        message:"User created successfully",
        token:token

    })
})

app.post('/signin', async (req,res)=>{

    const username=req.body.username
    if(User.findOne({
        username:username,
        password:req.body.password
    })){

        const token=jwt.sign(username._id,JWT_SECRET);


        res.status(200).json({
            token:token
        })
    }else{
        res.status(411).json({
            message:"Error while logging in"
        })
    }

    res.json({});
})

module.exports={router};
