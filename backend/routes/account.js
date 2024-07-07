const express = require('express');
const { authMiddleware } = require('../middleware');
const { Accounts } = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router();





router.get('/balance',authMiddleware, async (req,res)=>{

    const account=await Accounts.findOne({userId:req.userId});
    res.json({
        balance:account.balance
    })


})

router.post('/transfer',authMiddleware,async(req,res)=>{

    const session= await mongoose.startSession();

    session.startTransaction();


    const recieverId=req.body.to;
    const sendAmount=req.body.amount;

    const senderAccount=await Accounts.findOne({userId:req.userId}).session(session);
    const recieveAccount= await Accounts.findOne({userId:recieverId}).session(session);

    if(senderAccount.balance < sendAmount){
        res.status(400).json({
            message:"Not Enough Balance"
        })
    }   

    if(!recieveAccount){
        res.status(400).json({
            message:"Invalid Account"
        })
    }

    await Accounts.updateOne({userId:req.userId},{
        $inc:{
            balance:-sendAmount
        }
    }).session(session);


    await Accounts.updateOne({userId:recieverId},{
        $inc:{
            balance: sendAmount
        }
    }).session(session);

    

    session.commitTransaction();
    res.json({
        message:"transaction Successful"
    })
})



module.exports=router;
