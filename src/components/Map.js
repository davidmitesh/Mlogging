import React,{useEffect,useState,useContext,useRef} from 'react'
import { StyleSheet, Text, View,Dimensions ,ActivityIndicator,Button} from 'react-native'
import MapView,{Polyline,Circle,Overlay,Callout,Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import {Context as LocationContext} from '../context/LocationContext'
import {Context as TrackContext} from '../context/TrackContext'
import { mapDarkStyle } from '../model/mapData';
import RoamSpot from './RoamSpot';
import {Portal,Modal} from 'react-native-paper'
import { Ionicons,MaterialCommunityIcons,Fontisto,FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Map = ({markerObject,showMarker,route}) => {
    const {state:{currentLocation,location}}=useContext(LocationContext)//destructuring object inside object
    const {state:{myTracks}}=useContext(TrackContext)
    
    // console.log(state)
    const [markerPressed,setMarkerPressed]=useState(false)
    // const _pressLocation=useRef(currentLocation)
    // console.log(_pressLocation)
    const _marker=useRef()
    const id=route.params._id
    const track=myTracks.find(queryTrack => queryTrack._id === id )
    //Always remember to define hooks at the top. The render order of hooks should be consistent in


    if (!currentLocation){
        return <ActivityIndicator size="large" style={{marginTop:200}}/>
    }
    
    // console.log(markerObject)

    function call(){
        console.log(_marker)
    }
    
    return (
        <View>
            
                
            <RoamSpot isModal={markerPressed} change={setMarkerPressed}  markerLocation={currentLocation} />
                
            <MapView style={styles.mapStyle} 
            initialRegion={{
                ...currentLocation.coords,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}

              customMapStyle={mapDarkStyle}
              
            >

            {
                track ? 
                track.savedLocations.map((location,index)=>{
                    return (
                        <MapView.Marker key={index} coordinate={location.markerLocation.coords} />
                    )
                }):
                null
            }
           
                
              
              <Circle
              center={currentLocation.coords}
              radius={40}
              strokeColor="rgba(158,158,255,1.0)"
              fillColor="rgba(158,158,255,0.3)"
              />
                <Polyline coordinates={location.map(loc=>loc.coords)}/>
                {
                    showMarker
                    ? 
                    
                         <Marker
                         ref={_marker} 
                         onPress={({nativeEvent})=>{
                            nativeEvent.action === 'marker-press'
                            ? setMarkerPressed(true)
                            : null
                        }}
                    draggable
                    identifier="latest"
                    coordinate={currentLocation.coords}             
                    >
                        {
                            markerObject.providerName === "MaterialCommunityIcons"
                            ? <MaterialCommunityIcons name={markerObject.markerName} size={markerObject.size} />
                            : markerObject.providerName === "Ionicons"
                            ? <Ionicons name={markerObject.markerName} size={markerObject.size} />
                            :   markerObject.providerName === "FontAwesome5"
                            ?  <FontAwesome5 name={markerObject.markerName} size={markerObject.size} /> 
                            : null
                        }
                    
                    </Marker>
                  
                   
                    : null
                }      
            </MapView>
        </View>
    )
}

export default Map

const styles = StyleSheet.create({
    mapStyle: {
        width: Dimensions.get('window').width,
        height: 300,
      }
})
