const express=require('express')

//The next two lines are done to access the user model tied to mongoose.
const mongoose=require('mongoose')
const User=mongoose.model('User')
//-------------------------------------------------------------------------
const jwt=require('jsonwebtoken')//Json web tokens are like the mechanism that helps us to verify
//the person if they are really the one they say they are.
//A beautiful analogy would be the driver's license that proves that you are who you really are and is 
//very difficult to impersonate at the same time.

//----------------------------------------------------------------------------------------------
const router=express.Router();


router.post('/signup',async (req,res)=>{
    const {email,password}=req.body
    try{
        const user=new User({email,password})
        await user.save()
        const token=jwt.sign({userId:user._id},'MY_SECRET_KEY')
        res.send({token})
    }catch(err){
       return  res.status(422).send(err.message)
    }

})

router.post('/signin',async (req,res)=>{
    const {email,password}=req.body
    if (!email||!password){
        return res.status(422).send({error:'Must provide email or password!'})
    }

    const user=await User.findOne({email})
    if (!user){
        return res.status(422).send({error:"Invalid password or email"})
    }
    try{
        await user.comparePassword(password)
        const token=jwt.sign({userId:user._id},'MY_SECRET_KEY')
        res.send({token})
    }catch(err){
        return res.status(422).send({error:"Invalid password or email"})
    }

})

module.exports=router