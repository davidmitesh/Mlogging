import React,{useContext,useLayoutEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {Button} from 'react-native-elements'
import {Context as AuthContext} from '../context/AuthContext'
import Spacer from '../components/Spacer'
// import RoamSpot from '../components/RoamSpot';


const AccountScreen = ({navigation}) => {
    const {signout} =useContext(AuthContext)
    const insets = useSafeAreaInsets();
    useLayoutEffect(()=>{
        navigation.setOptions({
           
            title:"Account Screen"
        })
    })
    return (
        <View style={{paddingTop: insets.top,
            paddingBottom: insets.bottom,
    
            
            justifyContent: 'space-between',
            alignItems: 'center'}}>
            <Text>Acccount Screen</Text>
            
            <Button title="Sign out" onPress={signout}/> 
            {/* <RoamSpot/>    */}
            
 
        </View>
        // <RoamSpot/>
    )
}

export default AccountScreen

const styles = StyleSheet.create({})
