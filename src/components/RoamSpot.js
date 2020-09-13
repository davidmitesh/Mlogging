import  React,{useState,useContext} from 'react';
import {View,ActivityIndicator,ScrollView} from 'react-native'
import { Modal, Portal, Text, Button, Provider,TextInput } from 'react-native-paper';
import { Image } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons ,Ionicons,MaterialIcons} from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Camera } from 'expo-camera';
import CameraComponent from '../components/CameraComponent';
import { useNavigation } from '@react-navigation/native';
import {Context as BlogLocationContext} from '../context/BlogLocationContext'
import {Context as TrackContext} from '../context/TrackContext'
import {Context as LocationContext} from '../context/LocationContext'

const RoamSpot = ({isModal,change,markerLocation}) => {
  const [locationName,setName]=useState('')
  const [desc,setDesc]=useState('')
  const {state:{images},addImages,clearImages}=useContext(BlogLocationContext) 
  const {addSavedLocation}=useContext(TrackContext)
  const _scrollView = React.useRef(null);
  const navigation = useNavigation();
  const {state:{name}}=useContext(LocationContext)
  const clear=()=>{
    setName('')
    setDesc('')
    clearImages()
    change(false)
  }
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({base64:true})
    addImages(pickerResult.uri)
    _scrollView.current.scrollToEnd({animation:true})
  }
  return ( 
<Portal>
<Modal  visible={isModal} onDismiss={()=>change(false)} >
  <ScrollView style={{backgroundColor:'#fff'}}>
          
          <TextInput label="enter name..." value={locationName} onChangeText={text=>setName(text)}/>
          
          <TextInput label="Tell about the location..." value={desc} onChangeText={text=>setDesc(text)}/>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={openImagePickerAsync}>
            <View style={{borderWidth:2, borderColor:'black',borderRadius:20,margin:5}}>
            <Button  >  
                Add Pictures 
            </Button>
            <MaterialIcons name="photo-library" size={24} color="black" style={{alignSelf:'center'}}/>
            </View>
            </TouchableOpacity>
            
            <View style={{borderWidth:2, borderColor:'black',borderRadius:20,margin:5}}>
            <Button  onPress={()=>{
            change(false)
            navigation.navigate('Camera',{setMarkerPressed:change})}} >  
                OPEN CAMERA 
            </Button>
            <Ionicons name="ios-camera" size={24} color="black" style={{alignSelf:'center'}}/>
            </View>
         
          
         
          </View>
        <ScrollView 
          horizontal 
          indicatorStyle='black'
           ref={_scrollView}>
          {
              images.map((image,index)=>{
                console.log(image)
                return (
            <Image
                  
                  key={index}
              source={{ uri:image }}
              style={{ width: 200, height: 200 ,borderWidth:5,borderColor:'white',borderRadius:20}}
              PlaceholderContent={<ActivityIndicator />}
            />
                 )
            })  
          }
        </ScrollView> 
        <View style={{borderWidth:2,borderRadius:10,margin:10}}>
          <Button onPress={async()=>{
            await addSavedLocation(name,locationName,desc,markerLocation,images)
            // console.log(savedLocations)
            clear()
            
            }}>
            Save
          </Button>
    </View> 
                
  </ScrollView> 
        
        </Modal>       
    </Portal>
    
    
    
        
        
        
        
    
  );
};

export default RoamSpot;