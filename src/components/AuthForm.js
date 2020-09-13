import React,{useState} from 'react'
import { StyleSheet,View} from 'react-native'
import {Text,Button,Input} from 'react-native-elements'
import Spacer from './Spacer'

const AuthForm = ({headerText,errorMessage,onSubmit,buttonTitle}) => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    //below we have put down fragment tag which requires no styling
    return (
        <View >
             <Spacer>
            <Text h3>{headerText}</Text>
            </Spacer>            
            <Input
             label="Email"
             value={email}
             onChangeText={setEmail}
             autoCapitalize="none"
             autoCorrect={false}
             />
            <Input
             label="Password"
             value={password}
             onChangeText={setPassword}
             autoCapitalize="none"
             autoCorrect={false}
             secureTextEntry
             />
             {errorMessage?<Text style={styles.errorMessage}>{errorMessage}</Text>:null}
            <Button title={buttonTitle} onPress={()=>onSubmit(email,password)}/>
        </View>
    )
}

export default AuthForm

const styles = StyleSheet.create({
    errorMessage:{
        fontSize:15,
        color:'red',
        marginLeft:15,
        marginBottom:15
    },

})
