import React, { useState, useEffect,useRef ,useContext} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import {Context as BlogLocationContext} from '../context/BlogLocationContext'
import {Button} from 'react-native-paper'
export default function  CameraScreen({navigation,route}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const _cameraRef=useRef(null)
  const {addImages}=useContext(BlogLocationContext)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
      
          <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={_cameraRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
              console.log(_cameraRef.current)
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
          <Button onPress={()=>{
              route.params.setMarkerPressed(true)
              navigation.navigate("TrackCreate")
            }
              }>Go back!</Button>
            <Button onPress={async()=>{
                if (_cameraRef.current){
                    let photo=await _cameraRef.current.takePictureAsync()
                    console.log(photo)
                    addImages(photo.uri)
                }
            }}>
                Capture
            </Button>
        </View>
      </Camera>
    </View>
        
   
  );
}