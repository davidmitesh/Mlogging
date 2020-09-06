import React,{useLayoutEffect,useContext,useEffect} from 'react'
import { StyleSheet,View} from 'react-native'
import {Context as AuthContext} from '../context/AuthContext'
import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'

const SignInScreen = ({navigation}) => {
    const {state,signin,clearErrorMessage}=useContext(AuthContext)
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
    })
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus',clearErrorMessage);
    
        return unsubscribe;
      }, [navigation]);
    //onSubmit={signin}==> This syntax is entirely possible. Look at the signup screen for more 
    //detailed information.
    return (
        <View style={styles.container}>
           <AuthForm 
                headerText="Sign In"
                errorMessage={state.errorMessage}
                buttonTitle="Sign In"
                onSubmit={signin}
           />
           <NavLink
            routeName="Signup"
            text="Don't have account ? Sign up!"
           />

        </View>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    container:{      
        flex:2,
        justifyContent:'center',
        marginBottom:50
    }
    
})
// const styles = StyleSheet.create({
//     container: {
//       flex: 1, 
//       backgroundColor: '#009387'
//     },
//     header: {
//         flex: 1,
//         justifyContent: 'flex-end',
//         paddingHorizontal: 20,
//         paddingBottom: 50
//     },
//     footer: {
//         flex: 3,
//         backgroundColor: '#fff',
//         borderTopLeftRadius: 30,
//         borderTopRightRadius: 30,
//         paddingHorizontal: 20,
//         paddingVertical: 30
//     },
//     text_header: {
//         color: '#fff',
//         fontWeight: 'bold',
//         fontSize: 30
//     },
//     text_footer: {
//         color: '#05375a',
//         fontSize: 18
//     },
//     action: {
//         flexDirection: 'row',
//         marginTop: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#f2f2f2',
//         paddingBottom: 5
//     },
//     actionError: {
//         flexDirection: 'row',
//         marginTop: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#FF0000',
//         paddingBottom: 5
//     },
//     textInput: {
//         flex: 1,
//         marginTop: Platform.OS === 'ios' ? 0 : -12,
//         paddingLeft: 10,
//         color: '#05375a',
//     },
//     errorMsg: {
//         color: '#FF0000',
//         fontSize: 14,
//     },
//     button: {
//         alignItems: 'center',
//         marginTop: 50
//     },
//     signIn: {
//         width: '100%',
//         height: 50,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 10
//     },
//     textSign: {
//         fontSize: 18,
//         fontWeight: 'bold'
//     }
//   });