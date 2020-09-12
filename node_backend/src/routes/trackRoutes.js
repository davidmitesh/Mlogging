const express=require('express')
const mongoose=require('mongoose')
const IpfsHttpClient = require('ipfs-http-client')
const { globSource } = IpfsHttpClient
const ipfs = IpfsHttpClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
const fs=require('fs')
const path=require('path')
const rimraf=require('rimraf')
const requireAuth=require('../middlewares/requireAuth')
const _ =require('lodash')


var multer = require("multer");     

// var upload = multer({ dest:'uploads/'})
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname,'/uploads'))
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   })
  
//   var upload = multer({dest:'uploads/'})

const Track=mongoose.model('Track')

const router=express.Router()

router.use(requireAuth)

router.get('/',(req,res)=>{
    res.send("hey welcome")
})

router.get('/tracks',async(req,res)=>{
    const tracks=await Track.find()
    res.send(tracks)
})

router.get('/tracks/my',async(req,res)=>{
    // console.log(req.user._id)
    const tracks=await Track.find({userId:req.user._id})
    res.send(tracks)
})


router.post('/tracks/hashes',upload.array('images'),async(req,res)=>{

})
router.post('/tracks/saveLocation',upload.array('images'),async(req,res)=>{
    console.log(req.files)
    
    const {name,desc,trackName}=req.body
    console.log(trackName)
    let images=[]
    const markerLocation=JSON.parse(req.body.markerLocation)
    // const file = await ipfs.add(globSource('./uploads', { recursive: true }))
    
    // const hashes=  _.map(req.files, function(file){
    //      ipfs.add({content:file.buffer},function(result){
    //         console.log(result)
    //      })
        
    // })
    const contents=_.map(req.files,function(file){
        return {
            path:`/images`,
            content:file.buffer
        }
    })
    for await (const result of ipfs.addAll(contents)) {
        images.push(result.cid.toString())
      }


        const result=await Track.findOneAndUpdate({userId:req.user._id,name:trackName},{$push:{savedLocations:{name,desc,images,markerLocation}}},(err,result)=>{
        if (err){
            console.log("err is",err)
            res.send("hey")
        }
        console.log(result)
        res.send(result)
    })
    
    // rimraf(path.join(__dirname,'/../../uploads'),async function(){
    //     var hash=file.cid.toString()
    //     var names=_.map(req.files,function(file){
    //         return file.filename
    //     })
    //     var images={
    //         names,
    //         hash
    //     }
    //     const result=await Track.findOneAndUpdate({userId:req.user._id,name:trackName},{$push:{savedLocations:{name,desc,images,markerLocation}}},(err,result)=>{
    //         if (err){
    //             console.log("err is",err)
    //             res.send("hey")
    //         }
    //         console.log(result)
    //         res.send(result)
    //     })
    // })
    
        
    

   
      
        
    

    
    // console.log(req.body)

    // console.log(req.files)



    
})
router.post('/tracks/locations',async(req,res)=>{
    const {name,locations}=req.body
    if (!locations){
        return res
        .status(422)
        .send({error:"You must provide some locations"})
    }
    try{
        const track=Track.findOneAndUpdate({userId:req.user._id,name:name},{locations},(err,result)=>{
            console.log(result)
            res.send("hey")
        })

       
        
    }catch(err){
        res
        .status(422)
        .send({err})
    }


    

})

router.post('/tracks',async(req,res)=>{
    const {name}=req.body
    console.log(name)
        if (!name){
        return res
        .status(422)
        .send({error:"You must provide name"})

    }
        try{
        const track=new Track({name,userId:req.user._id})
        await track.save()
        res.send(track)
    }catch(err){
        console.log(err)
        res
        .status(422)
        .send({err})
    }
})

router.post('/putAdvertisement',async(req,res)=>{
    const {name}=req.body
    try{
        const track=Track.findOneAndUpdate({userId:req.user._id,name:name},{showAdvertisement:true},(err,result)=>{
            console.log(result)
            res.send("hey")
        })

       
        
    }catch(err){
        res
        .status(422)
        .send({err})
    }

})

module.exports=router