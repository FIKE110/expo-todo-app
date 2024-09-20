import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { Component, RefObject, forwardRef } from 'react'

type TextProp={
    desc:string,
    name?:string,
    formData?:any,
    focusFunction?:Function,
    setFormData?:Function
}

const TaskInput=forwardRef<TextInput,TextProp>(function TaskInput ({desc,name,focusFunction,setFormData,formData}
  :TextProp,ref){
    return (
      <View>
        <TextInput placeholder={desc}
        ref={ref}
        returnKeyType='next'
        onSubmitEditing={()=>focusFunction()}
        onChangeText={value=>{
          setFormData((prev)=>({...prev,[name]:value}))
          
        }}
        style={styles.input}/>
      </View>
    )
})

const styles=StyleSheet.create({
    input:{
      backgroundColor:"#f0f0f0",
        fontSize:18,
        padding:16,
        paddingLeft:24,
        borderRadius:8
    }
})

export default TaskInput