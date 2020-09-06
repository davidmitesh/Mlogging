import React, { useEffect,useContext } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import MapView, { Marker ,Polyline} from "react-native-maps";
import {Context as TrackContext} from '../context/TrackContext'

import { Ionicons,MaterialCommunityIcons,Fontisto,FontAwesome5 } from '@expo/vector-icons';

import {  mapDarkStyle, mapStandardStyle } from '../model/mapData';
import RoamSpot from '../components/RoamSpot';
import ChipsRun from '../components/ChipsRun';
import _ from 'lodash'
// import StarRating from '../components/StarRating';

// import { useTheme } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const ExploreScreen = ({navigation,route}) => {
//   const theme = useTheme();




const id=route.params._id
const {state:{allTracks}}=useContext(TrackContext)
const track=allTracks.find(queryTrack => queryTrack._id === id)
if (track.locations.length===0 ){
  return (
    <View>
      {alert("Seems like you have not recorded any locations!")}

      <Text>Please record tracks from MyTracks section then visit here!</Text>
    </View>
  )
}


const initialCoords=track.locations[0].coords
const markers= _.map(track.savedLocations,function(location){
  return {
    coordinate: location.markerLocation.coords,
    title:location.name,
    description:location.desc,
    image:`https://ipfs.io/ipfs/${location.images[0]}`
  }
})

  const initialMapState = {
    markers,
    region: {
     ...initialCoords,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = (markerID * CARD_WIDTH) + (markerID * 20); 
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  }


  const [MapState, setState] = React.useState(initialMapState);
  let mapAnimation=new Animated.Value(0)
  let mapIndex=0
  const _map = React.useRef(null);//This is used to reference the same map instance throughout the app
  //so that multiple map instances are saved from being created.
  const _scrollView = React.useRef(null);

  useEffect(()=>{//and we want to render this everytime our DOM changes so we havenot provided
    //an empty array at the end as [].
   
    mapAnimation.addListener(({value})=>{
        let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
        if (index >= MapState.markers.length) {
          index = MapState.markers.length - 1;
        }
        if (index <= 0) {
          index = 0;
        }
       
        clearTimeout(regionTimeout);//This calls the regionTimeout as well clears it!very nice syntax

        const regionTimeout = setTimeout(() => {
            //here when scrolling the items the map is automatically animated.
          if( mapIndex !== index ) {
            mapIndex = index;
            const { coordinate } = MapState.markers[index];
            _map.current.animateToRegion(
              {
                ...coordinate,
                latitudeDelta: MapState.region.latitudeDelta,
                longitudeDelta: MapState.region.longitudeDelta,
              },
              350
            );
          }
        }, 10);
    })

  })

  const interpolations = MapState.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp"
    });

    return { scale };
  });

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={MapState.region}
        style={styles.container}
       
        // customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
      >
       <Polyline coordinates={track.locations.map(loc=>loc.coords)}/>

        {MapState.markers.map((marker, index) => {
             const scaleStyle = {
                transform: [
                  {
                    scale: interpolations[index].scale,
                  },
                ],
              };

          return (
            <MapView.Marker key={index} coordinate={marker.coordinate} onPress={(e)=>onMarkerPress(e)}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('../../assets/map_marker.png')}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </MapView.Marker>
          );
        })}
        <Marker draggable coordinate={{latitude:22.6193467,longitude:88.4364486}}>
            <Ionicons name="ios-bus" size={40} color="black" />
        </Marker>
      </MapView>
      {/* <View style={styles.searchBox}>
        <TextInput 
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{flex:1,padding:0}}
        />
        <Ionicons name="ios-search" size={20} />
      </View> */}

      

      <ChipsRun/>

      <Animated.ScrollView 
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        
        //This two lines are used to snap the card at the center without cutting it!
        snapToAlignment="center"
        style={styles.scrollView}

        contentInset={{//to provide inset for the component
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0, 
          right: SPACING_FOR_CARD_INSET
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                }
              },
            },
          ],
          {useNativeDriver: true}
        )}
      >
        {MapState.markers.map((marker, index) =>(//creating card items in the bottom
          <View style={styles.card} key={index}>
            <Image 
              source={{
                uri: marker.image
              }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <RoamSpot/>
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
              {/* <StarRating ratings={marker.rating} reviews={marker.reviews} /> */}
              <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
              <View style={styles.button}>

                <TouchableOpacity
                  onPress={() => {}}
                  style={[styles.signIn, {
                    borderColor: '#FF6347',
                    borderWidth: 1
                  }]}
                >
                  <Text style={[styles.textSign, {//This syntax is used to add other styling options
                  //along with that mentioned in the stylesheet down!
                    color: '#FF6347'
                  }]}>Order Now</Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    position:'absolute', 
    marginTop: Platform.OS === 'ios' ? 40 : 20, 
    flexDirection:"row",
    backgroundColor: '#fff',
    width: '90%',
    alignSelf:'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position:'absolute', 
    top:Platform.OS === 'ios' ? 15 : 10, 
    paddingHorizontal:10
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection:"row",
    backgroundColor:'#fff', 
    borderRadius:20,
    padding:8,
    paddingHorizontal:20, 
    marginHorizontal:10,
    height:35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width:50,
    height:50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
      width: '100%',
      padding:5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3
  },
  textSign: {
      fontSize: 14,
      fontWeight: 'bold'
  }
});