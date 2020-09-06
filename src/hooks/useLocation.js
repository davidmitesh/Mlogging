import {useState,useEffect} from 'react'
import {
    Accuracy,
    requestPermissionsAsync ,
    watchPositionAsync
} from 'expo-location'

export default(shouldTrack,callback)=>{
    const [errorMsg, setErrorMsg] = useState(null)
    useEffect(() => {
      let subscriber;
    if (shouldTrack){
        (async () => {
             let { status } = await requestPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
          }
        //   let location = await getCurrentPositionAsync({});
        //   setLocation(location)
         subscriber=await watchPositionAsync({
            accuracy:Accuracy.BestForNavigation,
            
            distanceInterval:10
        },callback)
      })() }else{
        if (subscriber){
            subscriber.remove()
        }
        subscriber=null
      }
        
          
        return ()=>{
          if (subscriber){
            subscriber.remove()
          }
        }
      
        

        
        
      },[shouldTrack,callback]);

      return [errorMsg]
}