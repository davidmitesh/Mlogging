import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

const instance= axios.create({
    // baseURL:'https://afternoon-scrubland-81557.herokuapp.com'
    baseURL:"http://192.168.1.102:8000"
})
instance.interceptors.request.use(//run this before any time any request is made
    async (config)=>{
        const token=await AsyncStorage.getItem('token')
        if (token){
            config.headers.Authorization=`Bearer ${token}`
        }
        return config
    },//first function is called when anytime the funtion is called
    (err)=>{
        return Promise.reject(err)
    }//second is called in case of error, whenever request fails.
)

export default instance