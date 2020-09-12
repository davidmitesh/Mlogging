import React,{useContext,useEffect,useLayoutEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {Button} from 'react-native-elements'
import {Context as AuthContext} from '../context/AuthContext'
import Spacer from '../components/Spacer'
import { web3 } from '../api/blockchain';
// import RoamSpot from '../components/RoamSpot';


const AccountScreen = ({navigation}) => {
    const {signout} =useContext(AuthContext)
    const insets = useSafeAreaInsets();
    const [accounts,setAccounts]=useState([])
    const [balance,setBalance]=useState('')
    useEffect(()=>{
        async function getDetails(){
            let accounts=await web3.eth.getAccounts()
            let balance=await web3.eth.getBalance(accounts[0])
            balance=web3.utils.fromWei(balance)
            setAccounts(accounts)
            setBalance(balance)
        }
        getDetails()
    })
    useLayoutEffect(()=>{
        navigation.setOptions({
           
            title:"Account Screen"
        })
    })
    return (
        <View style={{paddingTop: insets.top,
            paddingBottom: insets.bottom,
    
            
            justifyContent: 'space-between',
            alignItems: 'center',
            flex:1}}>
            
            <View style={{margin:10,borderColor:'black',borderWidth:5,flex:1,flexDirection:'column',}}>
                <View style={{flex:1,margin:10}}>
                <Text style={{fontSize:24}}>Your Address:</Text>
                <Text style={{margin:4,fontWeight:"bold",fontSize:20}}>{accounts[0]}</Text>
                </View>
            
            <View style={{flex:1,flexDirection:'row',margin:10}}>
            <Text style={{fontSize:24}}>Balance: </Text>
            <Text style={{margin:4,fontWeight:"bold",fontSize:20}}>{balance} </Text>
            </View>
       
            </View>
        
            <Button title="Sign out" onPress={signout}/> 
            {/* <RoamSpot/>    */}
            
 
        </View>
        // <RoamSpot/>
    )
}

export default AccountScreen

const styles = StyleSheet.create({})
