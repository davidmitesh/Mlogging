//The main job of this context is tracking users location and storing points.

import createDataContext from './createDataContext'
import { UPDATE_LOCATION, START_RECORDING, STOP_RECORDING, ADD_LOCATIONS, CHANGE_NAME, RESET_FORM, ADD_SAVEDLOCATION } from './LocationContextTypes'

const locationReducer=(state,action)=>{
    switch(action.type){
        case ADD_SAVEDLOCATION:
            return {...state,savedLocations:[...state.savedLocations,action.payload]}
        case RESET_FORM:
            return {...state,name:'',location:[],savedLocations:[]}
        case CHANGE_NAME:
            return {...state,name:action.payload}
        case ADD_LOCATIONS:
            return {...state,location:[...state.location,action.payload]}
        case STOP_RECORDING:
            return {...state,recording:false}
        case START_RECORDING:
            return {...state,recording:true}
        case UPDATE_LOCATION:
            return {...state,currentLocation:action.payload}
        default:
            return state
    }
}

const changeName=dispatch=>(name)=>{
    dispatch({type:CHANGE_NAME,payload:name})
}

const startRecording=dispatch=>()=>{
    dispatch({type:START_RECORDING})
}


const stopRecording=dispatch=>()=>{
    dispatch({type:STOP_RECORDING})
}


const addLocation=dispatch=>(location,isRecording)=>{
    dispatch({type:UPDATE_LOCATION,payload:location})
    if (isRecording){
        dispatch({type:ADD_LOCATIONS,payload:location})
    }
}

const addSavedLocation=dispatch=>(name,description,coords,images)=>{
    dispatch({type:ADD_SAVEDLOCATION,payload:{name,description,coords,images}})
    
} 

const reset=dispatch=>()=>{
    dispatch({type:RESET_FORM})
}


export const {Context,Provider} =createDataContext(
    locationReducer,
    {startRecording,stopRecording,addLocation,changeName,reset,addSavedLocation},
    {name:'',recording:false,location:[],currentLocation:null,savedLocations:[]}
)