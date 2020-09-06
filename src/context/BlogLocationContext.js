import createDataContext from './createDataContext'
import trackerApi from '../api/track'
import { ADD_IMAGES, CLEAR_IMAGES } from './BlogLocationContextTypes'


const blogLocationReducer=(state,action)=>{
    switch(action.type){
        case ADD_IMAGES:
            return {images:[...state.images,action.payload]}
        case CLEAR_IMAGES:
            return {images:[]}
        
        default :
            return state
    }
}

const addImages=(dispatch)=>(image)=>{
    dispatch({
        type:ADD_IMAGES,
        payload:image
    })
}

const clearImages=(dispatch)=>()=>{
    dispatch({
        type:CLEAR_IMAGES
    })
}

export const {Provider,Context}=createDataContext(
    blogLocationReducer,
    {
      addImages,
      clearImages
    },
    {images:[]}
)