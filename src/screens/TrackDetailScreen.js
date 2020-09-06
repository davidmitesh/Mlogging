import React,{useContext} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Context as TrackContext} from '../context/TrackContext'
import MapView,{Polyline,Circle} from 'react-native-maps';

const TrackDetailScreen = ({navigation,route}) => {
    const id=route.params._id
    const {state}=useContext(TrackContext)
    const track=state.find(queryTrack => queryTrack._id === id )
    const initialCoords=track.locations[0].coords
    return (
        <View>
            <Text>{track.name}</Text>
            <MapView
                initialRegion={{
                    longitudeDelta:0.01,
                    latitudeDelta:0.01,
                    ...initialCoords
                }}
                style={styles.map}
            >
                <Polyline coordinates={track.locations.map(loc=>loc.coords)} />
            </MapView>
        </View>
    )
}

export default TrackDetailScreen

const styles = StyleSheet.create({
    map:{
        height:300
    }
})
