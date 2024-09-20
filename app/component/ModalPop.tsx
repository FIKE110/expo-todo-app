import { Text, StyleSheet, View, Modal, TextInput, Pressable } from 'react-native'
import React, { Component, useRef, useState } from 'react'
import TaskInput from './TaskInput'
import NewTaskScreen from '../screen/NewTaskScreen'

type ModalProp={
    isModalVisible:boolean
    setModalVisible:Function
    children?:any
}


export default function ModalPop({isModalVisible,setModalVisible,
    children
}:ModalProp){
    const firstInputRef=useRef<TextInput>(null)
    const secondInputRef=useRef<TextInput>(null)
    const thirdInputRef=useRef<TextInput>(null)
    const [formData,setFormData] = useState({title:'',description:''})

    const secondInputFocus=()=>secondInputRef.current.focus()
    const thirdInputFocus=()=>thirdInputRef.current.focus()

    const cancelNewTask=()=>setModalVisible(false)
    const createNewTask=()=>{
        console.log(formData)
        setModalVisible(false)
    }

    return (
      <Modal visible={isModalVisible}>
        {children}
        {/*<View style={styles.main}>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.heading}>New Task</Text>
            </View>
            <View style={styles.form}>
                <TaskInput name='title' setFormData={setFormData}
                desc="Enter new task title" ref={firstInputRef} focusFunction={secondInputFocus}/>
                <TaskInput name="description" setFormData={setFormData}
                 desc="Enter new task description" ref={secondInputRef} focusFunction={thirdInputFocus}/>
                <TaskInput desc="Person tasks is assign to (Optional)" ref={thirdInputRef}/>
            </View>
            <View style={styles.buttonHolder}>
                <Pressable style={[styles.button,{backgroundColor:'white'}]} onPress={()=>cancelNewTask()}>
                    <Text style={[styles.buttonText,{color:'#6C63FF'}]}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={()=>createNewTask()}>
                    <Text style={styles.buttonText}>Apply</Text>
                </Pressable>
            </View>
    </View>*/}
      </Modal>
    )
}

const styles = StyleSheet.create({
    main:{
        padding:23
    },
    heading:{
        fontSize:32
    },
    form:{
       justifyContent:'center',
       gap:15,
       paddingTop:30
    },
    button:{
        backgroundColor:'#6C63FF',
        paddingHorizontal:30,
        paddingVertical:7,
        borderRadius:7,
        borderWidth:1,
        borderColor:'#6C63FF'
    },
    buttonText:{
        fontSize:17,
        color:'white',
        fontWeight:'bold'
    },
    buttonHolder:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:10,
        paddingVertical:30
    }
})