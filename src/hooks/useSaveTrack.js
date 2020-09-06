import {useContext} from 'react'
import {Context as TrackContext} from '../context/TrackContext'
import {Context as LocationContext} from '../context/LocationContext'
import { useNavigation } from '@react-navigation/native';

export default()=>{
    const navigation=useNavigation()
    const {addLocations}=useContext(TrackContext)
    const {state:{location,name,savedLocations},reset}=useContext(LocationContext)
    const saveTrack=async ()=>{
        await addLocations(name,location)
        reset()
        navigation.navigate('TrackFlow')
    }
    return [saveTrack]//the function is returned in the form of array to follow the community convention.
    //Generally, in hook, parameters are returned in the form of array elements.
}