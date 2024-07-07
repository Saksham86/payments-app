const express=require("express");
const zod=require ("zod");
const jwt=require("jsonwebtoken");
const {User,Accounts}= require('../db');
const {JWT_SECRET}=require('../config');
const router=express.Router();
const authMiddleware=require("../middleware");



const signupBody=zod.object({

    username:zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()

})  

router.post('/signup', async (req,res)=>{
    
    
    try{
        signupBody.parse(req.body);

    }catch(e){

        res.status(411).json({
            message:"Email Already Taken / Invalid input"
        })

    }
    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    try{
        const user= await User.create({
            username:req.body.username,
            password:req.body.password,
            firstName:req.body.firstName,
            lastName:req.body.lastName
        })
        const userId=user._id;

        const account=await Accounts.create({
            userId:userId,
            balance:(Math.random() * 1000) + 1,

        })
        
        const token=jwt.sign(userId,JWT_SECRET);
        res.json({
            message:"User created successfully",
            token:token
    
        })


    }catch(e){
        res.status(411).json({
            message:"Already taken / invalid"
        })
    }

    res.json({});

    
})

router.post('/signin', async (req,res)=>{

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

// router.get('/bulk',authMiddleware,async (req,res)=>{

//     const name=req.params.filter;
//     name=name.split("-");
//     const firstName=name[0];
//     const lastName=name[1] || null;

//     const list=await User.find({
//         $or:[{firstName:firstName,lastName:lastName}]});

//     res.json({list});

// })

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})



const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        _id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })
})

module.exports={router};
