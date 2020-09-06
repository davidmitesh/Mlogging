import React,{useState} from 'react'
import { StyleSheet, Text, ScrollView ,TouchableOpacity} from 'react-native'
import { Ionicons,MaterialCommunityIcons,Fontisto,FontAwesome5 } from '@expo/vector-icons';


const ChipsRun = ({setMarkerObject}) => {
    const [categories,setCategories]=useState([
        {
          name:'Generic Marker',
          iconName:"map-marker",
          icon:<MaterialCommunityIcons name="map-marker" style={styles.chipsIcon} size={18} />,
          provider:"MaterialCommunityIcons"
        },
        { 
          name: 'Fastfood Center', 
          iconName:"food-fork-drink",
          icon: <MaterialCommunityIcons style={styles.chipsIcon} name="food-fork-drink" size={18} />,
          provider:"MaterialCommunityIcons"
        },
        {
          name: 'Restaurant',
          iconName:"ios-restaurant",
          icon: <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />,
          provider:"Ionicons"
        },
        {
          name: 'River',
          iconName:"water",
          icon: <FontAwesome5 name="water" size={18} style={styles.chipsIcon}/>,
          provider:"FontAwesome5"
        },
        
        {
          name: 'Hotel',
          iconName:"hotel",
          icon: <Fontisto name="hotel" style={styles.chipsIcon} size={15} />,
          provider:"Fontisto"
        },
    ])
    
    return (
        <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
        contentInset={{ // iOS only
          top:0,
          left:0,
          bottom:0,
          right:20
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === 'android' ? 20 : 0
        }}
      >
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.chipsItem} onPress={()=>{setMarkerObject({
            size:30,
            providerName:category.provider,
            markerName:category.iconName
          })}}>
            {category.icon}
            <Text>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

    )
}

export default ChipsRun

const styles = StyleSheet.create({
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
      }
})
