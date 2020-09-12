const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})

userSchema.pre('save',function(next){//this is presave hook that is going to run before saving a user 
    //to database
    //Here function is used instead of arrow function to utilize the this functionality.
    const user=this;
    if (!user.isModified('password')){
        return next()
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if (err){
            return next()
        }
        bcrypt.hash(user.password,salt,(err,hash)=>{
            if (err){
                return next()
            }
            user.password=hash
            next()

        })
    })
})

userSchema.methods.comparePassword=function(password){
    //If we used arrow function instead of keyword function, then this used inside will bind to the 
    //context of this file instead of the user object which we actually want.
    const user=this;
    return new Promise((resolve,reject)=>{
        bcrypt.compare(password,user.password,(err,isMatch)=>{
            if (err){
                return reject(err)
            }
            if (!isMatch){
                return reject(false)
            }
            resolve(true)
        })
    })

}


mongoose.model('User',userSchema)//this should be executed only once so to prevent duplication,it is not
//exported rather directly called in the index.js