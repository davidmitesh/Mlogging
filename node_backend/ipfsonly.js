const IpfsHTTPClient = require('ipfs-http-client')
const fs=require('fs')
const path=require('path')
const ipfs = IpfsHTTPClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
async function add(){
        fs.readFile('./hotel.jpg',async(err,result)=>{
        const res= await ipfs.add({content:result})
        console.log(res)
    })
}

add()
//  function name(){
//     fs.readFile('./uploads/hey.jpg',async(err,result)=>{
//         const res= await ipfs.add({content:result})
//         console.log(res)
//     })
    
// }

// const _=require('lodash')

// function name(){
//     return new Promise(function(resolve,reject){
//         var array=["mitesh","krish"]
//         var images=[]
//         _.forEach(array,function(value){
//             images.push(value)
//             }
//         )
//         resolve(images)
//     })
// }
// name().then((images)=>{
//     console.log(images)
// })
// // name()

//  async function add (){
// //     // const result=await ipfs.add({path:path.resolve(__dirname+'/uploads/hey.jpg')})
// //     // console.log(result)
// //    const content=fs.readFileSync('hey.jpg')
// //     console.log(content)
// //     console.log("hey")
// // }
// // add()

// // const IpfsHttpClient = require('ipfs-http-client')
// const { globSource } = ipfsClient


// // // const ipfs = IpfsHttpClient()

// // async function add(){
// //     const file = await ipfs.add(globSource('./docs', { recursive: true }))
// //     console.log(file)
// // }

// // add()

// // console.log(path.resolve(__dirname+'/uploads/hey.jpg'))


// const IpfsHttpClient = require('ipfs-http-client')
// const { globSource,CID } = IpfsHttpClient
// const ipfs = IpfsHttpClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
// const fs=require('fs')
// const path=require('path')
// const rimraf=require('rimraf')

// async function add(){
//     console.log(globSource('./uploads', { recursive: true }))
//     const file = await ipfs.add(globSource('./uploads', { recursive: true }))
//     rimraf.sync(path.join(__dirname,'/uploads'))
//     var cid=file.cid
//     console.log(cid.toString())
//     // console.log(CID(file.cid))
    
// }

// add()

// console.log(path)