import React,{useContext,useCallback, useState} from 'react'
import { StyleSheet, Text, View,Button,FlatList,TouchableOpacity ,ScrollView} from 'react-native'
import {Context as TrackContext} from '../context/TrackContext'
import {Context as LocationContext} from '../context/LocationContext'
import {ListItem} from 'react-native-elements'
import {useFocusEffect} from '@react-navigation/native';
import TrackCreate from '../components/CreateTrack'
import _ from 'lodash'
const MyTrackList = ({navigation}) => {
    const {state:{myTracks},fetchMyTracks}=useContext(TrackContext)
    const {changeName}=useContext(LocationContext)
    const [modalPress,setModalPress]=useState(false)
    // const isFocused=useIsFocused()
    useFocusEffect(
        useCallback(()=>{
            fetchMyTracks()//This calls fetchTracks() only once when screen is focused to it.
        },[])
    )
    
    // console.log(allTracks)
    
    return (
        <View>
            <TrackCreate isModal={modalPress} change={setModalPress}/>
            <FlatList
                data={
                    _.filter(myTracks,function(track){
                        return track.userId
                    })
                }
                keyExtractor={item =>item._id}
                renderItem={({item})=>{
                    // return <TouchableOpacity onPress={()=>navigation.navigate('TrackDetail',{_id:item._id})}>
                    //     <ListItem chevron title={item.name} />
                    // </TouchableOpacity>
                    return <TouchableOpacity onPress={()=>{
                        changeName(item.name)
                        navigation.navigate('TrackCreate',{_id:item._id})
                        }}>
                        <ListItem chevron title={item.name} />
                    </TouchableOpacity>
                }}
            
            />
            <Button title="create" onPress={()=>setModalPress(true)} />
            
            
        </View>
    )
}

export default MyTrackList

const styles = StyleSheet.create({
    searchBox: {
        position:'absolute', 
        marginTop: Platform.OS === 'ios' ? 40 : 20, 
        flexDirection:"row",
        backgroundColor: '#fff',
        width: '90%',
        alignSelf:'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
      }
})
