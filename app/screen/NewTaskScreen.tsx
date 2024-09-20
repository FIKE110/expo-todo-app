import { View, Text ,StyleSheet, TextInput, Touchable, TouchableOpacity, Pressable, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ToastAndroid} from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import { AntDesign } from '@expo/vector-icons'
import {getAllTasks, useAddToTasks} from '../hooks/tasks'
import { HomeScreenContext } from './HomeScreen'
import {getAllLists, getList} from "../hooks/list";
import ModalSelector from "react-native-modal-selector";
import {ExpoSQLiteDatabase} from "drizzle-orm/expo-sqlite";
import { useDrizzle } from '../context/DrizzleContext'

type formDataType={
  title?:string,
  notes?:string
}

async function saveNewTask(data:formDataType,setTasks,db:ExpoSQLiteDatabase){
  try{
  if(data.title.trim().length<1){
    ToastAndroid.show("Title cannot be empty",ToastAndroid.SHORT)
    return false
  }

  const result=await useAddToTasks({title:data.title,notes:data.notes},db)
  const tasks=await getAllTasks(db)
  console.log(result)
  setTasks(tasks)
  return result
}
  catch(e){
    console.log(e)
  }
}


const NewTaskScreen = ({setModalVisible}:{setModalVisible:Function}) => {

  const [formData,setFormData]=useState<formDataType>({title:"",notes:""})
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.main}>
      <Header setModalVisible={setModalVisible}/>
      <FormArea setFormData={setFormData}/>
      <Options />
      <Footer formData={formData} setModalVisible={setModalVisible}/>
    </View>
    </TouchableWithoutFeedback>
  )
}

function Footer({setModalVisible,formData}){
  const db=useDrizzle()
  const {setTasks}=useContext(HomeScreenContext)
  return(
    <View
    style={{
      flex:1,
      justifyContent:'flex-end',
      marginBottom:14
    }}
    >
      <TouchableOpacity
      onPress={()=>{
        if(saveNewTask(formData,setTasks,db)){
        console.log(formData)
        setModalVisible(false)}}
      }
      style={{
        borderRadius:20,
        backgroundColor:'#007BFF',
        padding:17,
        width:'100%'
      }}
      >
        <Text style={{
          textAlign:'center',
          fontSize:17,color:'white',fontWeight:'bold'
        }}>Save</Text>
        </TouchableOpacity>
        </View>
  )
}

function Header({setModalVisible}){
  return(
  <View style={styles.header}>
    <Pressable 
     onPress={()=>setModalVisible(false)} style={{position:'absolute',left:0}}>
       <AntDesign name="close" size={24} color="black"/>
    </Pressable>
    <Text style={{fontSize:21,fontWeight:'bold'}}>New Task</Text>
  </View>
  )
}

function FormArea({setFormData}:{setFormData:Function}){
  
  const TextStyle=StyleSheet.create({
    text:{backgroundColor:"#F2F1F4",
    fontSize:16,
    borderRadius:8,
    paddingHorizontal:15,
  }
  })

  return(
    <View style={{paddingVertical:15,gap:20}}>
      <TextInput placeholder='Title' 
       onChangeText={value=>setFormData(prev=>({...prev,title:value}))}
      style={[TextStyle.text,{height:50}]}/>
      <TextInput
      onChangeText={value=>setFormData(prev=>({...prev,notes:value}))}
      textAlign='left'
      textAlignVertical='top'
      numberOfLines={4}
      multiline
      placeholder='Notes' style={[TextStyle.text,{height:110,paddingVertical:15}]}/>
    </View>
  )
}


function Options(){

    const [lists,setLists]=useState([])
    const {db}=useDrizzle()
    useEffect(() => {
        const getLists=getAllLists(db)
            .then(list=>{
                const newList=list.map(l=>{
                    const {id,title}=l
                    return {key:id,label:title}
                })
                setLists(newList)
            })
    },[]);

  const options=[
    {name:"Remind me",option:"None"},
    {name:"Prority",option:"None"}
  ]

    const[val,setSelectedval]=useState('')
    const optionsItemStyles=StyleSheet.create({
        text:{
            fontSize:18,
            paddingHorizontal:5
        }
    })
  
  function OptionItem({name,option}:{name:string,option:string}){


   return(
    <View style={{flexDirection:'row',
    justifyContent:'space-between',paddingVertical:10}}>
      <Text style={optionsItemStyles.text}>{name}</Text>
      <Text style={optionsItemStyles.text}>{option}</Text>
    </View>
   ) 
  }
  
  return(
    <View style={{rowGap:20}}>
        <View style={{flexDirection:'row',
            justifyContent:'space-between',paddingVertical:10}}>
            <Text style={optionsItemStyles.text}>List</Text>
            <ModalSelector
                data={lists}
                initValue="Select something"
                onChange={(option) => setSelectedval(option.label)}
                style={{ width: 200 }}
            >
                <TextInput
                    style={{ borderWidth: 1,
                        color:'black',
                        padding: 10, width: 200, borderRadius: 5 }}
                    editable={false}
                    placeholder="Select something"
                    value={val}
                />
            </ModalSelector>
        </View>
      {options.map((item,index)=>
          <OptionItem key={index} name={item.name}
      option={item.option}      
      />)}
    </View>
  )
}


const styles=StyleSheet.create({
  main:{
      flex:1,
      maxHeight:'100%',
      paddingTop:30,
      padding:20,
        backgroundColor:'white',
  },
  header:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:13
  }
})

export default NewTaskScreen