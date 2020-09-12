import createDataContext from './createDataContext'
import trackerApi from '../api/track'
import { ADD_DETAILS, ADD_ERROR, ADD_MNEMONIC, ADD_TOKEN, CLEAR_ERROR, CLEAR_TOKEN, REMOVE_MNEMONIC } from './AuthContextTypes'
import AsyncStorage from '@react-native-community/async-storage';
import maticDetails from '../api/blockchain'

const authReducer=(state,action)=>{
    switch(action.type){
        case REMOVE_MNEMONIC:
            return {...state,details:{},mnemonic:''}
        case ADD_DETAILS:
            return {...state,details:action.payload}
        case ADD_MNEMONIC:
            return {...state,mnemonic:action.payload}
        case CLEAR_TOKEN:
            return {...state,token:null,errorMessage:''}
        case CLEAR_ERROR:
            return {...state,errorMessage:''}
        case ADD_TOKEN:
            return {...state,errorMessage:'',token:action.payload}
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
const addMnemonic=dispatch=>async(mnemonic)=>{
    try{
        
        await AsyncStorage.setItem('mnemonic',mnemonic)
        dispatch({type:ADD_MNEMONIC,payload:mnemonic})
    }catch(err){

        dispatch({
            type:ADD_ERROR,
            payload:"Something went wrong with adding mnemonic!"
        })
    }
}
const tryLocalSignin=dispatch=>async()=>{
    const token=await AsyncStorage.getItem('token')
    const mnemonic=await AsyncStorage.getItem('mnemonic')
    if (token){
        dispatch({type:ADD_TOKEN,payload:token})
    }
    if (mnemonic){
        dispatch({type:ADD_MNEMONIC,payload:mnemonic})
    }
}

const signout=(dispatch)=>async ()=>{

    await AsyncStorage.removeItem('token')
    dispatch({type:CLEAR_TOKEN})
 }

 const removeMnemonic=(dispatch)=>async()=>{
     await AsyncStorage.removeItem('mnemonic')
     dispatch({type:REMOVE_MNEMONIC})
 }

 const fetchDetails=(dispatch)=>async()=>{
    let mnemonic=await AsyncStorage.getItem('mnemonic')
    console.log(mnemonic)
    if (mnemonic){
        let {web3}=await maticDetails()
    let accounts=await web3.eth.getAccounts()
    let balance=await web3.eth.getBalance(accounts[0])
    balance=web3.utils.fromWei(balance)
    dispatch({type:ADD_DETAILS,payload:{mnemonic,accounts,balance}})
 }
}

export const {Provider,Context}=createDataContext(
    authReducer,
    {
      signin,signout,signup,clearErrorMessage,tryLocalSignin,addMnemonic,fetchDetails,removeMnemonic
    },
    {errorMessage:'',token:null,mnemonic:"",details:{}}
)