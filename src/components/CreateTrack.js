import React,{useState,useContext} from 'react'
import { StyleSheet, View} from 'react-native'
import {Portal,Modal,TextInput, Button}  from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import {Context as TrackContext} from '../context/TrackContext'
import {Context as LocationContext} from '../context/LocationContext'

const CreateTrack = ({isModal,change}) => {
    const [name,setName]=useState('')
    const navigation = useNavigation();
    const {createTrack,state:{myTracks}}=useContext(TrackContext)
    const {changeName}=useContext(LocationContext)
    return (
        <Portal>
            <Modal visible={isModal} onDismiss={()=>change(false)}>
                <View style={{backgroundColor:'#fff'}}> 
                    <TextInput label="enter name..." value={name} onChangeText={text=>setName(text)}/>
                    <Button onPress={async()=>{
                        const track=await createTrack(name)
                        changeName(name)
                        navigation.navigate('TrackCreate',{_id:track._id})
                        change(false)
                        }}>
                        Create
                    </Button>
                </View>
            </Modal>
        </Portal>
    )
}

export default CreateTrack

const styles = StyleSheet.create({})

