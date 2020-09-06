import createDataContext from './createDataContext'
import trackerApi from '../api/track'
import { ADD_ERROR, ADD_TOKEN, CLEAR_ERROR, CLEAR_TOKEN } from './AuthContextTypes'
import AsyncStorage from '@react-native-community/async-storage';

const authReducer=(state,action)=>{
    switch(action.type){
        case CLEAR_TOKEN:
            return {token:null,errorMessage:''}
        case CLEAR_ERROR:
            return {...state,errorMessage:''}
        case ADD_TOKEN:
            return {errorMessage:'',token:action.payload}
        case ADD_ERROR:
            return {...state,errorMessage:action.payload}
        default :
            return state
    }
}

const clearErrorMessage=dispatch=>()=>{
    dispatch({type:CLEAR_ERROR})
}

const signup=(dispatch)=>async (email,password)=>{
        //make api request to sign in   with that email and password

        //if we sign up ,modify our state, and say that we are authenticated


        //if signing fails,we need to reflect the message

        //navigate somewhere


        try{
            const response=await trackerApi.post('/signup',{email,password})
            await AsyncStorage.setItem('token',response.data.token)
            dispatch({type:ADD_TOKEN,payload:response.data.token})
        }catch(err){
            dispatch({type:ADD_ERROR,payload:"Something went wrong with signup!"})
            console.log(err.response.data)
        }
    }


const signin=(dispatch)=>async (email,password)=>{
        try{
            const response=await trackerApi.post('/signin',{email,password})
            await AsyncStorage.setItem('token',response.data.token)
            dispatch({type:ADD_TOKEN,payload:response.data.token})
        }catch(err){

            dispatch({
                type:ADD_ERROR,
                payload:"Something went wrong with signin"
            })
        }

    }

const tryLocalSignin=dispatch=>async()=>{
    const token=await AsyncStorage.getItem('token')
    if (token){
        dispatch({type:ADD_TOKEN,payload:token})
    }
}

const signout=(dispatch)=>async ()=>{

    await AsyncStorage.removeItem('token')
    dispatch({type:CLEAR_TOKEN})
 }


export const {Provider,Context}=createDataContext(
    authReducer,
    {
      signin,signout,signup,clearErrorMessage,tryLocalSignin
    },
    {errorMessage:'',token:null}
)