import React,{useContext,useCallback,useState} from 'react'
import { StyleSheet, View ,ScrollView} from 'react-native'
import {Text} from 'react-native-elements'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Map from '../components/Map';
import {Context as LocationContext} from '../context/LocationContext'

// import '../_mockLocation'
import useLocation from '../hooks/useLocation'
import { useIsFocused,useFocusEffect } from '@react-navigation/native';
import TrackForm from '../components/TrackForm';
import ChipsRun from '../components/ChipsRun';
import {Switch} from 'react-native-paper'





const TrackCreateScreen = ({navigation,route}) => {
  
  const {state:{recording},addLocation}=useContext(LocationContext)
  const [markerObject,setMarkerObject]=useState({
      providerName:"MaterialCommunityIcons",
      markerName:"map-marker", 
      size:30
  })

  
// console.log(route)
  
  
  const isFocused=useIsFocused();
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
//   const [err]=useLocation(isFocused,addLocation)//this is equivalent to ((location=>addLocation(location)))
const callback=useCallback((location)=>{
    addLocation(location,recording)
},[recording])
const [err]=useLocation(isFocused||recording,callback)//if user has pressed recording then even
//navigation to different screen, the recording of screen continues!

  const insets = useSafeAreaInsets();
    return (
        < ScrollView style={{
            paddingBottom: insets.bottom}}>
                { err? <Text>{err}</Text>:null}
            <Map markerObject={markerObject} showMarker={isSwitchOn} route={route} />
            <View style={{flexDirection:'row'}}>
                <Text>
                    Add Location?
                </Text>
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch}/>
            </View>
            
            <TrackForm/>
            {
                isSwitchOn
                ? <ChipsRun setMarkerObject={setMarkerObject}/>
                : null
            }
            
           
            
            
        </ ScrollView>
    )
}

export default TrackCreateScreen

const styles = StyleSheet.create({})
