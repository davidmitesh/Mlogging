import './global'
import 'react-native-gesture-handler';

import React,{useContext,useEffect,useState} from 'react';//This is to support writing of JSX
import { NavigationContainer,getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import AccountScreen from './src/screens/AccountScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import BlankScreen from './src/screens/BlankScreen';

import {Provider as AuthProvider,Context as AuthContext} from './src/context/AuthContext' 
import {Provider as LocationProvider} from './src/context/LocationContext'
import {Provider as TrackProvider} from './src/context/TrackContext'
import {Provider as BlogLocationProvider} from './src/context/BlogLocationContext'

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Provider as PaperProvider } from 'react-native-paper';
import ExploreScreen from './src/screens/ExploreScreen';
import CameraScreen from './src/screens/CameraScreen';
import MyTrackList from './src/screens/MyTrackList';

//To configure stuffs related to the setup of react navigation visit to this page:
//https://reactnative.dev/docs/navigation



const AuthenticationStack=createStackNavigator()

const AuthenticationStackScreen=()=>(
  <AuthenticationStack.Navigator>
    <AuthenticationStack.Screen 
      name="Signup"
      component={SignUpScreen}
      
    />
    
    <AuthenticationStack.Screen 
      name="Signin"
      component={SignInScreen}

    />
  </AuthenticationStack.Navigator>
)

const TrackListFlow=createStackNavigator()

const TrackListFlowScreen=()=>(
  <TrackListFlow.Navigator
   screenOptions={{
     headerStyle:{
       backgroundColor:'#fff',
       
     }
     ,
     headerTintColor:'#54030d',
     headerTitleAlign:'center',
     headerTitleStyle:{
       fontWeight:'bold',
       fontFamily:"sans-serif-condensed",
       fontSize:30
     }
   }}
  >
    <TrackListFlow.Screen
      name="TrackList"
      component={TrackListScreen}
      options={{
        headerTitle:"Tracks"
      }}    
    />
    <TrackListFlow.Screen
      name="TrackDetail"
      component={TrackDetailScreen}
      options={{
        headerTitle:"Track Detail",
      }}    
    />  
    <TrackListFlow.Screen
    name="TrackCreateFlow"
    // component={TrackCreateFlowScreen}
    component={ExploreScreen}
    options={{
      title:"Tracks"
      
    }}
    />
  </TrackListFlow.Navigator>
)
const TrackCreateFlow=createStackNavigator()



const TrackCreateFlowScreen=()=>(
  <TrackCreateFlow.Navigator
  screenOptions={{
    headerStyle:{
      backgroundColor:'#fff',
      
    }
    ,
    headerTintColor:'#54030d',
    headerTitleAlign:'center',
    headerTitleStyle:{
      fontWeight:'bold',
      fontFamily:"sans-serif-condensed",
      fontSize:30
    }
  }}
  >
    <TrackCreateFlow.Screen
      name="MyTracks"
      component={MyTrackList}
      options={{
        headerTitle:"My Tracks"
      }}  
    
    />
    <TrackCreateFlow.Screen
      name="TrackCreate"
      component={TrackCreateScreen}
      options={{
        headerTitle:"Create Track"
      }}    
    />
    <TrackCreateFlow.Screen
      name="Camera"
      component={CameraScreen}
      options={{
        headerShown:false
      }}    
    />
     
  </TrackCreateFlow.Navigator>
)
const AccountFlow=createStackNavigator()

const AccountFlowScreen=()=>(
  <AccountFlow.Navigator
  screenOptions={{
    headerStyle:{
      backgroundColor:'#fff',
      
    }
    ,
    headerTintColor:'#54030d',
    headerTitleAlign:'center',
    headerTitleStyle:{
      fontWeight:'bold',
      fontFamily:"sans-serif-condensed",
      fontSize:30
    }
  }}
  >
    <AccountFlow.Screen
      name="AccountScreen"
      component={AccountScreen}
      options={{
        title:"Your account"
      }}   
    />
    
  </AccountFlow.Navigator>
)


const AppFlowStack=createBottomTabNavigator()

const AppFlowStackScreen=()=>(
  <AppFlowStack.Navigator 
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'TrackFlow') {
        iconName = focused
          ? 'ios-home'
          : 'md-home';
      } else if (route.name === 'MyTracks') {
        return <MaterialCommunityIcons name="go-kart-track" size={24} color="black" />
      }else if (route.name === 'AccountFlow'){
        iconName="md-person"
      }

      // You can return any component that you like here!
      return <Ionicons name={iconName} size={size} color={color} />;
    },
  })}
  tabBarOptions={{
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  }}
  >
    <AppFlowStack.Screen
    name="TrackFlow"
    component={TrackListFlowScreen}
    options={{
      title:"Home"
    }}
    />
    <AppFlowStack.Screen
    name="MyTracks"
    component={TrackCreateFlowScreen}
    options={{
      title:"My Tracks"
    }}
    />
    <AppFlowStack.Screen
    name="AccountFlow"
    component={AccountFlowScreen}
    options={{
      title:"My Account"
    }}
    />
  </AppFlowStack.Navigator>
)

const FinalApplicationNavigationStack=createStackNavigator()


const FinalApplicationNavigationStackScreen=()=>{

  const {state,tryLocalSignin}=useContext(AuthContext)
  const [localLoading,setLocalLoading]=useState(true)
  useEffect( ()=>{
    async function fetchLocalToken(){
      await tryLocalSignin()
      setLocalLoading(false)
    }  
    fetchLocalToken()
    
    // const web3 = new Web3(
    //   new Web3.providers.HttpProvider('https://mainnet.infura.io/')
    // );
    
  
    // web3.eth.getBlock('latest').then(console.log)


//     const portis = new Portis('2f6e970c-83e3-4e15-aef9-a28335d33295', 'mainnet');
// const web3 = new Web3(portis.provider);

// web3.eth.getAccounts((error, accounts) => {
//   console.log(accounts);
// });
// const node = await IPFS.create()
  },[])


  return (
    <FinalApplicationNavigationStack.Navigator>
      {
        localLoading ? 
        (
          <FinalApplicationNavigationStack.Screen
          name="BlankScreen"
          component={BlankScreen} 
          options={{
            headerShown:false
          }}     
        />
        ):
        !state.token ?
        (
          <FinalApplicationNavigationStack.Screen
        name="AuthFlow"
        component={AuthenticationStackScreen} 
        options={{
          headerShown:false
        }}     
      />
        ) :
        (
          <FinalApplicationNavigationStack.Screen
        name="MainAppFlow"
        component={AppFlowStackScreen}  
        options={({route})=>({
          headerShown:false
      })}   
      />
        )
      }     
     </FinalApplicationNavigationStack.Navigator>
  )

}




export default()=>(
  <BlogLocationProvider>
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <PaperProvider>
            <NavigationContainer>
              <FinalApplicationNavigationStackScreen/>
            </NavigationContainer>
          </PaperProvider>
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  </BlogLocationProvider>

)


