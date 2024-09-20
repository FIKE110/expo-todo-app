import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import { MaterialIcons } from '@expo/vector-icons';

type AddCardProp={
  setModalVisible:Function
}

export function AddCard ({setModalVisible}:AddCardProp) {
    return (
      <Pressable onPress={()=>setModalVisible(true)}>
        <View style={styles.main} >
        <Text style={styles.text}>Add new Task</Text>
        <MaterialIcons name="add" size={24} color="#6C63FF"/>
      </View>
      </Pressable>
      
    )
}

const styles=StyleSheet.create({
    main:{
        borderColor:'#6C63FF',
        borderWidth:0,
        width:'93%',
        marginHorizontal:20,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:5,
        justifyContent:'space-between'
    },
    text:{
        fontSize:30,
        padding:11,
        opacity:0.6
    }
})

export default AddCard