import React,{useContext,useEffect,useLayoutEffect, useState,useCallback} from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {Button} from 'react-native-elements'
import {Context as AuthContext} from '../context/AuthContext'
import Spacer from '../components/Spacer'
import maticDetails from '../api/blockchain';
import AsyncStorage from '@react-native-community/async-storage';
import MnemonicModal from '../components/MnemonicModal';
// import RoamSpot from '../components/RoamSpot';
import { useIsFocused ,useFocusEffect} from '@react-navigation/native';


const AccountScreen = ({navigation}) => {
    const {signout,fetchDetails,removeMnemonic,state:{details}} =useContext(AuthContext)
    const insets = useSafeAreaInsets();
    const [showModal,setModal]=useState(false)
    useFocusEffect(
        useCallback(()=>{
            fetchDetails()//This calls fetchTracks() only once when screen is focused to it.
        },[])
    )
    console.log(details)
    return (
        <View style={{paddingTop: insets.top,
            paddingBottom: insets.bottom,
    
            
            justifyContent: 'space-between',
            alignItems: 'center',
            flex:1}}>

                {
                    
                    Object.entries(details).length !== 0?
                    <View style={{margin:10,borderColor:'black',borderWidth:5,flex:1,flexDirection:'column'}}>
                    <View style={{flex:1,margin:10}}>
                    <Text style={{fontSize:24}}>Your Address:</Text>
                    <Text style={{margin:4,fontWeight:"bold",fontSize:20}}>{details.accounts[0]}</Text>
                    </View>
                
                <View style={{flex:1,flexDirection:'row',margin:10}}>
                <Text style={{fontSize:24}}>Balance: </Text>
                <Text style={{margin:4,fontWeight:"bold",fontSize:20}}>{details.balance} </Text>
                </View>
           
                </View>:
                <TouchableOpacity onPress={()=>setModal(true)}>
                    <Text>Add Mnemonic</Text>
                </TouchableOpacity>

                }
            
           
            <MnemonicModal isModal={showModal} change={setModal}/>
            <Button title="Sign out" onPress={signout}/> 
            <Button title="Remove account" onPress={removeMnemonic}/>
            {/* <RoamSpot/>    */}
            
 
        </View>
        // <RoamSpot/>
    )
}

export default AccountScreen

const styles = StyleSheet.create({})
