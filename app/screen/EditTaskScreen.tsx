import { View, Text ,StyleSheet, TextInput, Touchable, TouchableOpacity, Pressable, ToastAndroid} from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { TaskType } from '../model/task'
import { deleteTask, updateTask } from '../hooks/tasks';
import { useSQLiteContext } from 'expo-sqlite';

const EditTaskScreen = ({setModalVisible,info,id,fetchTasks}:{setModalVisible:Function,
  info:TaskType,id?:number,fetchTasks:Function
}) => {
  const [title,setTitle]=useState(info.title)
  const [notes,setNotes]=useState(info.notes)

  return (
    <View style={styles.main}>
      <Header setModalVisble={setModalVisible}/>
      <FormArea title={title} notes={notes} setTitle={setTitle
      }
      setNotes={setNotes}
      />
      <Options />
      <Footer {...{title,notes,id,setModalVisible,fetchTasks}}/>
    </View>
  )
}


function Footer(props:{title:string,notes:string,
  fetchTasks:Function,
  id:number,setModalVisible:Function}){
  const db=useSQLiteContext()
  const {id,notes,title}=props
  return(
    <View
    style={{
      flexDirection:'row',
      justifyContent:'space-between',
      marginVertical:30,
      gap:30
    }}
    >
      <TouchableOpacity
      style={{
        borderRadius:20,
        backgroundColor:'#007BFF',
        padding:17,
        flex:2
      }}

      onPress={()=>{
        if(updateTask(id,notes,title,db)){
          ToastAndroid.show("Tasks updated",ToastAndroid.SHORT)
          props.setModalVisible(false)
          props.fetchTasks()
        }}
      }
      >
        <Text style={{
          textAlign:'center',
          fontSize:17,color:'white',fontWeight:'bold'
        }}>Edit/Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
      style={{
        borderRadius:20,
        backgroundColor:"#f0f0f0",
        padding:17,
        flex:1
      }}

      onPress={()=>{
        deleteTask(id,db)
        ToastAndroid.show(`Task with id ${id} deleted`,ToastAndroid.SHORT)
        props.setModalVisible(false)
        props.fetchTasks()
      }}
      >
        <Text style={{
          textAlign:'center',
          fontSize:17,color:'black',fontWeight:'bold'
        }}>Delete</Text>
        </TouchableOpacity>
        </View>
  )
}

function Header({setModalVisble}){
  return(
  <View style={styles.header}>
    <Pressable 
    onPress={()=>setModalVisble(false)}
    style={{position:'absolute',left:0}}>
       <AntDesign name="close" size={24} color="black"/>
    </Pressable>
    <Text style={{fontSize:21,fontWeight:'bold'}}>Edit Task</Text>
  </View>
  )
}

function FormArea({title,setTitle,notes,setNotes}:{title:string,
  setTitle:Function,
  setNotes:Function,
  notes:string}){
  const TextStyle=StyleSheet.create({
    text:{backgroundColor:"#F2F1F4",
    fontSize:16,
    borderRadius:8,
    paddingHorizontal:15,
  }
  })

  return(
    <View style={{paddingVertical:15,gap:20}}>
      <TextInput placeholder='Title' style={[TextStyle.text,{height:50}]}
      defaultValue={title}
      onChangeText={text=>setTitle(text)}
      />
      <TextInput
      textAlign='left'
      textAlignVertical='top'
      numberOfLines={4}
      multiline
      onChangeText={text=>setNotes(text)}
      value={notes}
      placeholder='Notes' style={[TextStyle.text,{height:110,paddingVertical:15}]}/>
    </View>
  )
}


function Options(){
  const options=[
    {name:"List",option:"Today"},
    {name:"Remind me",option:"None"},
    {name:"Prority",option:"None"}
  ]
  
  function OptionItem({name,option}:{name:string,option:string}){
    const optionsItemStyles=StyleSheet.create({
     text:{
      fontSize:18,
      paddingHorizontal:5
     }
    })

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
      {options.map((item,index)=><OptionItem key={index} name={item.name}
      option={item.option}      
      />)}
    </View>
  )
}


const styles=StyleSheet.create({
  main:{
      flex:1,
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

export default EditTaskScreen