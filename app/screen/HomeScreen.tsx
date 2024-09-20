import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View } from 'react-native'
import React, {createContext, useContext, useEffect, useState} from 'react'
import AddCard from '../component/AddCard'
import AddNewTaskModal from '../component/ModalPop'
import LoadingSkeleton from '../component/LoadingSkeleton'
import Axios from 'axios'
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ExpoCheckbox from 'expo-checkbox/build/ExpoCheckbox'
import { CheckBox } from '@rneui/themed'
import NewTaskScreen from './NewTaskScreen'
import EditTaskScreen from './EditTaskScreen'
import ModalPop from '../component/ModalPop'
import { Tasks } from '../service/tasks'
import { TaskType } from '../model/task'
import { useSQLiteContext } from 'expo-sqlite'
import {getAllTasks, updateChecked} from '../hooks/tasks'
import { getAllLists, getList } from '../hooks/list'
import { List } from '../model/list'
import { useDrizzle } from '../context/DrizzleContext'

type DataStateProps={
  state:'loading' | 'data' | 'error'
  data:number[]
  err:Error
}


export const HomeScreenContext=createContext(null)

export function HomeScreen ({navigation}){
    const [isModalVisible,setModalVisible] = useState(false)
    const [tasks,setTasks]=useState([])

    return (
      <HomeScreenContext.Provider value={{setTasks,tasks}}>
      <View style={styles.main}>
        <Header navigation={navigation}/>
        <Categories />
        <TaskByDate />
        <Footer setModalVisible={setModalVisible}/>
        <ModalPop isModalVisible={isModalVisible} setModalVisible={setModalVisible}>
          <NewTaskScreen setModalVisible={setModalVisible}/>
        </ModalPop>
       </View>
       </HomeScreenContext.Provider>
    )
}

function Header({navigation}){
  const [currentDate,setCurrentDate]=useState<string>()
  useEffect(()=>{
    const intervalId=setInterval(()=>{
      const date=new Date()
      setCurrentDate(`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
    )},1000)
  return ()=>clearInterval(intervalId)
  })

  return(
    <View style={styles.header}>
      <Pressable style={{alignItems:'flex-end'}}
      onPress={()=>navigation.navigate('Settings')}
      >
      <Feather name="settings" size={24} color="black" />
      </Pressable>
      <View>
        <Text style={{fontSize:29,fontWeight:'bold'}}>Today - {currentDate}</Text>
      </View>
    </View>
  )
}


function Footer({setModalVisible}){
  return(
    <View style={{alignItems:'flex-end',position:'absolute',bottom:28,right:20}}>
      <Pressable onPress={()=>setModalVisible(true)}>
      <View 
      style={{backgroundColor:'#007BFF',width:52,height:52,borderRadius:10,
      justifyContent:'center',
      alignItems:'center'
      }}>
        <Ionicons name="add-outline" size={30}
        color="white" />
        </View>
      </Pressable>
    </View>
  )
}

function Categories(){

  const [list,setList]=useState<List[]>()
  const {db}=useDrizzle()

  useEffect(()=>{
    const getLists=async()=>getList(3,db).then(
      value=>{
          console.log(value)
        setList(value)
      }
    )
  getLists()
}
  ,[])
  function CategoryList({id,title}:List){
    return(
      <View style={{
        position:'relative',
        flexDirection:'row',gap:20,paddingVertical:10,alignItems:'center'}}>
        <TouchableOpacity style={{backgroundColor:'#F1F1F8',padding:3,borderRadius:10}}>
        <Ionicons name="menu-outline" size={30} color="black" />
          </TouchableOpacity>
          <View>
            <Text style={styles.listtext}>{title}</Text>
          </View>
      </View>
    )
  }
3
  return(
    <View style={{paddingBottom:20}}>
      <Text style={[styles.listheading,{paddingBottom:10}]}>My Lists</Text>
      <View>
        {
          list && list.map((item,id)=><CategoryList {...item} key={id}/>)
        }
      </View>
    </View>
  )
}

function TaskByDate(){ 
  const {tasks,setTasks} =useContext(HomeScreenContext)
  const {db}=useDrizzle()

    const fetchAllTasks=async ()=>{
      try{
      const tasksFromDb=await getAllTasks(db)
      console.log(tasksFromDb)
      setTasks(tasksFromDb)
      }
      catch(e){
       console.log(e)
      }
    }

    useEffect(()=>{
      fetchAllTasks()
    },[])

  function TaskItem({info,id}:{info:TaskType,id:number}){
    const db=useSQLiteContext()
    const {title,notes,prority}=info
    const [isModalVisible,setModalVisible]=useState(false)
    const [checked,setChecked] = useState(info.checked)
    return(
      <Pressable style={{flexDirection:'row',alignItems:'center'}}
      onLongPress={()=>setModalVisible(true)}
      onPress={()=>{
        const run=async ()=>{
          if(await updateChecked(id,!checked,db)){
            setChecked(!checked)
          }
        }
        run()
        }}
      >
        <CheckBox checked={checked} onPress={()=>{
          const run=async ()=>{
            if(await updateChecked(id,!checked,db)){
              setChecked(!checked)
            }
          }
          run()
          }}/>
        <Text style={styles.listtext}>{title}</Text>
        <AddNewTaskModal setModalVisible={setModalVisible} isModalVisible={isModalVisible}>
          <EditTaskScreen info={info} id={id} setModalVisible={setModalVisible}  fetchTasks={fetchAllTasks}/>
        </AddNewTaskModal>
      </Pressable>
    )
  }
  
  return(
    <View>
      <Text style={styles.listheading}>Today</Text>
      <ScrollView>
     {tasks.length < 1 ?
     <View style={{padding:20}}>
      <Text style={{
        fontSize:40,
        opacity:0.5,
        textTransform:'capitalize'
      }}>No task found</Text>
      </View>
     :
      tasks.map((item,id)=><TaskItem info={item} id={item.id} key={id}/>)}
      </ScrollView>
    </View>
  )
}


const styles=StyleSheet.create({
    main:{
      flex:1,
      paddingTop:50,
      padding:20,
        backgroundColor:'white',
    },
    task:{
        alignItems:'center',
        justifyContent:'center',
        gap:1,
        flex:1,
        backgroundColor:'red'
    },
    header:{
      justifyContent:'space-between',
      paddingBottom:18
    },
    listheading:{
      fontSize:25,
      fontWeight:'500'
    },
    listtext:{
      fontSize:18
    }
})

export default HomeScreen