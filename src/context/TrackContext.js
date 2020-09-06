import createDataContext from './createDataContext'
import trackerApi from '../api/track'
import { FETCH_TRACKS,FETCH_MY_TRACKS } from './TrackContextTypes'
import _ from 'lodash';

const trackReducer=(state,action)=>{
    switch(action.type){
        case FETCH_TRACKS:
            return {...state,allTracks:action.payload}
        case FETCH_MY_TRACKS:
            return {...state,myTracks:action.payload}
        default:
            return state
    }
}

const fetchTracks=dispatch=>async()=>{
    const response=await trackerApi.get('/tracks')
    dispatch({type:FETCH_TRACKS,payload:response.data})
}

const fetchMyTracks=dispatch=>async()=>{
    console.log('hey')
    const response=await trackerApi.get('/tracks/my')
    dispatch({type:FETCH_MY_TRACKS,payload:response.data})
}

// const createTrack=dispatch=>async (name,locations,savedLocations)=>{
//     console.log(name,locations.length)

//     const {images}=savedLocations[0]
//     const uri=images[0]
//     const uriParts = uri.split(".");
//     const fileType = uriParts[uriParts.length - 1];

  
//     const formData = new FormData();
//     formData.append("photo", {
//       uri,
//       name: `photo.${fileType}`,
//       type: `image/${fileType}`
//     });
//     formData.append("name",name);
//     formData.append("locations",JSON.stringify(savedLocations))
//     // formData.append("locations",'1');
//     // formData.append("locations",2);
//     // formData.append("locations",locations)

//     // const options = {
//     //     method: "POST",
//     //     body: formData,
//     //     headers: {
//     //       Accept: "application/json",
//     //       "Content-Type": "multipart/form-data"
//     //     }
//     //   };
    
//     //   await fetch("https://72d564673797.ngrok.io", options);
//     // await trackerApi.post('/tracks',{name,locations,s})
//     // await trackerApi.post('/tracks',{
//     //     body:formData,
       
//     // })
//     await trackerApi.post('/tracks',formData,{
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "multipart/form-data"
//           }
//     })
// }

const createTrack=dispatch=>async(name)=>{
    console.log(name)
    return await trackerApi.post('/tracks',{name})
}

const addLocations=dispatch=>async(name,locations)=>{
    console.log(locations.length)
    await trackerApi.post('/tracks/locations',{name,locations})
}

const addSavedLocation=dispatch=>async(trackName,locationName,desc,markerLocation,images)=>{
    
    const formData=new FormData()
    formData.append("trackName",trackName)
    formData.append("name",locationName)
    formData.append("desc",desc)
    formData.append("markerLocation",JSON.stringify(markerLocation))
    _.forEach(images,function(value,index){
        console.log(value)
        console.log(index)
        const uri=value
        const uriParts = uri.split(".");
        const fileType = uriParts[uriParts.length - 1];
        formData.append("images", {
            uri,
            name: `${index}.${fileType}`,
            type: `image/${fileType}`
        });
    })
    await trackerApi.post('/tracks/saveLocation',formData,{
        headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
            }
    })
}

export const {Provider,Context} =createDataContext(
    trackReducer,
    {fetchTracks,createTrack,addLocations,addSavedLocation,fetchMyTracks},
    {allTracks:[],myTracks:[]}
)