const mongoose=require('mongoose')




const pointSchema=new mongoose.Schema({
    timestamp:Number,
    coords:{
        latitude:Number,
        longitude:Number,
        altitude:Number,
        accuracy:Number,
        heading:Number,
        speed:Number
    }
})

const imageSchema=new mongoose.Schema({

})

const savedLocation=new mongoose.Schema({
    name:{
        type:String,
        default:''
       
    },
    desc:{
        type:String,
        default:''
        
    },
    images:[String],
    markerLocation:pointSchema
})

const trackSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'//This basically tells this userId is pointing towards an instance of user modal
        //defined using mongoose.model
    },
    name:{
        type:String,
        default:''
    },
    locations:[pointSchema],
    savedLocations:[savedLocation],
    showAdvertisement:{
        type:Boolean,
        default:false
    }
})


mongoose.model('Track',trackSchema)//This basically creates a collection of name specified