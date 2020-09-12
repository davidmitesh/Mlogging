const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const User=mongoose.model('User')

module.exports=(req,res,next)=>{

    //Even though we have capitalize the first letter of authorization in the postman header but 
    //has the behavior of automatically downcasing the headers passed to it!
    const {authorization}=req.headers
    //authorization === 'Bearer  OUR_TOKEN'

    if(!authorization){
        return res.status(401).send({error:"You must be logged in!"})
    }

    const token=authorization.replace('Bearer ','') //it is actually replacing the placeholder that we used 
    //while sending the request.
    jwt.verify(token,'MY_SECRET_KEY',async(err,payload)=>{
       if (err){
           return res.status(401).send({error:'You must be logged in!'})
       }
       const {userId}=payload;

       const user=await User.findById(userId)//This gonna query the database to find the actual user
       //and send back to the mobile application.

       req.user=user;//This line passes the fetched or signed in user and passes to the appilcation so
       //that other part now can make use of that.
       

       next()//This is basicaaly end of this middleware and the route is passed to next in queue
    })
    
}