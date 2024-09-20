import { AntDesign } from '@expo/vector-icons';

import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import { globalStyle } from '../styles/global';
import { NavigationAction } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const settings=[
  {name:"Profile"},
  {name:"Theme"},
  {name:"Notification"},
  {name:"Privacy policy"},
  {name:"Terms and service"},
  {name:"Log Out"}
]

const SettingsScreen = ({navigation}) => {
  return (
    <View style={globalStyle.main}>
     <Header navigation={navigation}/>
    <View>
      {settings.map((item,id)=><SettingItems name={item.name} key={id}/>)}
    </View>
    </View>
  )
}


function Header({navigation}:{navigation:StackNavigationProp<null>}){
    return(
    <View style={globalStyle.header}>
      <Pressable 
      onPress={()=>navigation.goBack()}
      style={{position:'absolute',left:0}}>
        <AntDesign name="left" size={24} color="black" />
      </Pressable>
      <Text style={{fontSize:21,fontWeight:'bold'}}>Settings</Text>
    </View>
    )
  }


  function SettingItems({name}:{name:string}){
    return(
      <View style={{flexDirection:'row',
      paddingVertical:20,
      paddingHorizontal:2,
      justifyContent:'space-between'}}>
        <Text style={styles.itemsText}>{name}</Text>
        <AntDesign name="right" size={24} color="black" />
      </View>
    )
  }


  const styles=StyleSheet.create({
    itemsText:{
      fontSize:19,
      fontWeight:"semibold"
    }
  })


export default SettingsScreen