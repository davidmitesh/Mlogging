import React,{useContext,useCallback, useState} from 'react'
import { StyleSheet,Button,FlatList,TouchableOpacity ,ScrollView,View} from 'react-native'
import {Context as TrackContext} from '../context/TrackContext'
import {Context as LocationContext} from '../context/LocationContext'
import {ListItem} from 'react-native-elements'
import { useIsFocused ,useFocusEffect} from '@react-navigation/native';
import {TextInput} from 'react-native-paper'
import { Ionicons,MaterialCommunityIcons,Fontisto } from '@expo/vector-icons';
import TrackCreate from '../components/CreateTrack'
import _ from 'lodash'
const TrackListScreen = ({navigation}) => {
    const {state:{allTracks,myTracks},fetchTracks}=useContext(TrackContext)
    const {changeName}=useContext(LocationContext)
    const [modalPress,setModalPress]=useState(false)
    // const isFocused=useIsFocused()
    useFocusEffect(
        useCallback(()=>{
            fetchTracks()//This calls fetchTracks() only once when screen is focused to it.
        },[])
    )
    
    // console.log(allTracks)
    
    return (
        //In this way we can solve the problem of nesting of virtualized lists under scrollView warning so that
        //performance is maintained while rendering large lists.
        
            <FlatList
                
                data={
                    _.filter(allTracks,function(track){
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
                        navigation.navigate('TrackCreateFlow',{_id:item._id})
                        }}>
                        <ListItem chevron title={item.name} />
                    </TouchableOpacity>
                }}

                
            
            />
            
    )
}

export default TrackListScreen

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
