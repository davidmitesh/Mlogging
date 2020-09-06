import React,{useContext} from 'react'
// import { StyleSheet, Text, View } from 'react-native'
import {Input,Button} from 'react-native-elements'
import Spacer from './Spacer'
import {Context as LocationContext} from '../context/LocationContext'
import useSaveTrack from '../hooks/useSaveTrack'


const TrackForm = () => {
   
    const {startRecording,
        stopRecording,
        changeName,
        state:{name,recording,location}}=useContext(LocationContext)
        // console.log(location.length)

        const [saveTrack]=useSaveTrack()
    return (
        <>  
            {recording? 
            <Button title="Stop" onPress={stopRecording}/> :
            <Button title="Start recording" onPress={startRecording}/>
        }
        {
            !recording && location.length//if recording is true and location array has some points
            ?<> 
            {/* <Input onChangeText={changeName} value={name} inputStyle={{marginTop:30}} placeholder="Enter Track name"/> */}
             <Button buttonStyle={{marginTop:10}} title="Save Recording" onPress={saveTrack}/></>
            :null
        }
        </>
    )
}

export default TrackForm

// const styles = StyleSheet.create({})
