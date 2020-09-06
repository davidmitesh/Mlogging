import React,{useLayoutEffect,useContext,useEffect} from 'react'
import { StyleSheet,View} from 'react-native'

import {Context as AuthContext} from '../context/AuthContext'
import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'


const SignUpScreen = ({navigation}) => {
    const {state,signup,clearErrorMessage}=useContext(AuthContext)
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
    })
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus',clearErrorMessage);
    
        return unsubscribe;
      }, [navigation]);
    //onSubmit={(email,password)=>signup(email,password)} ==>> this can be equivalently called as :
    //onSumit={signup} which will automatically passed all the arguments to the functions.
    return (
        <View style={styles.container}>
           <AuthForm 
                headerText="Sign Up"
                errorMessage={state.errorMessage}
                buttonTitle="Sign Up"
                onSubmit={(email,password)=>signup(email,password)}
           />
           <NavLink
            routeName="Signin"
            text="Already have an account? Sign in!"
           />

        </View>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container:{      
        flex:1,
        justifyContent:'center',
        marginBottom:50
    }
    
})
